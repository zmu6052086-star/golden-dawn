const { createApp, ref, computed, nextTick, onMounted } = Vue;

export function initApp(questions, characters) {
  const app = createApp({
    setup() {
      // 1. 初始化检查：URL是否有 ?paid=true 或者 本地是否已解锁
      const urlParams = new URLSearchParams(window.location.search);
      const isUrlPaid = urlParams.get('paid') === 'true';
      
      const currentStage = ref('home');
      const currentQuestionIndex = ref(0);
      const scores = ref({});
      const result = ref({});
      const posterUrl = ref(null);
      const showPayModal = ref(false); // 控制支付弹窗显示

      // 判定是否解锁逻辑
      const hasPaid = ref(localStorage.getItem('isMagicPaid') === 'true' || isUrlPaid);

      // 如果检测到 URL 参数 paid=true，立即存入本地防止刷新后变回未支付
      if (isUrlPaid) {
        localStorage.setItem('isMagicPaid', 'true');
      }

      const currentQuestion = computed(() => questions[currentQuestionIndex.value] || {});

      const startTest = () => {
        currentStage.value = 'quiz';
        nextTick(() => lucide.createIcons());
      };

      const selectOption = (option) => {
        for (const role in option.score) {
          scores.value[role] = (scores.value[role] || 0) + option.score[role];
        }
        if (currentQuestionIndex.value < questions.length - 1) {
          currentQuestionIndex.value++;
        } else {
          calculateResult();
        }
      };

      const calculateResult = () => {
        currentStage.value = 'analyzing';
        setTimeout(() => {
          const winner = Object.keys(scores.value).reduce((a, b) => 
            (scores.value[a] || 0) > (scores.value[b] || 0) ? a : b
          );
          result.value = characters[winner];
          currentStage.value = 'result';
          nextTick(() => lucide.createIcons());
        }, 1500);
      };

      // 支付逻辑：显示包含收款码的弹窗
      const payToUnlock = () => {
        showPayModal.value = true;
      };

      // 伪自动解锁：点击后跳转带参数的当前页面
      const confirmPayment = () => {
        const newUrl = window.location.origin + window.location.pathname + '?paid=true';
        window.location.href = newUrl;
      };

      const unlockWithCode = () => {
        const code = prompt("请输入解锁码（或备注中的暗号）：");
        if (code === "122902") { 
          hasPaid.value = true;
          localStorage.setItem('isMagicPaid', 'true');
          showPayModal.value = false;
          alert("解锁成功！已开启深度档案");
          nextTick(() => lucide.createIcons());
        } else {
          alert("解锁码校验失败");
        }
      };

      const generatePoster = async () => {
        const footer = document.getElementById('poster-footer');
        footer.classList.remove('hidden');
        
        const qrcodeEl = document.getElementById('qrcode');
        qrcodeEl.innerHTML = '';
        new QRCode(qrcodeEl, { 
            text: window.location.href, 
            width: 64, 
            height: 64,
            colorDark: "#000000",
            colorLight: "#ffffff"
        });

        setTimeout(async () => {
            const canvas = await html2canvas(document.getElementById('poster-area'), {
                backgroundColor: '#050505',
                useCORS: true,
                scale: 2
            });
            posterUrl.value = canvas.toDataURL('image/png');
            footer.classList.add('hidden');
        }, 400);
      };

      const formatContent = (t) => t ? t.replace(/\n/g, '<br>') : '';
      const restart = () => window.location.reload();

      onMounted(() => lucide.createIcons());

      return {
        currentStage, currentQuestionIndex, questions, currentQuestion,
        startTest, selectOption, result, hasPaid, payToUnlock, unlockWithCode,
        generatePoster, posterUrl, formatContent, restart, showPayModal, confirmPayment
      };
    }
  });

  // 关键：解决截图里的 {{ }} 乱码问题，确保 Vue 正常解析
  app.config.compilerOptions.delimiters = ['{{', '}}'];
  app.mount('#app');
}
