const { createApp, ref, computed, nextTick, onMounted } = Vue;

export function initApp(questions, characters) {
  const app = createApp({
    setup() {
      const currentStage = ref('home');
      const currentQuestionIndex = ref(0);
      const scores = ref({});
      const hasPaid = ref(localStorage.getItem('isMagicPaid') === 'true');
      const posterUrl = ref(null);
      const result = ref({});

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

      const payToUnlock = () => {
        alert("请前往【面包多】购买解锁码，并点击“输入解锁码”进行解锁");
        window.open('https://mianbaoduo.com/o/xxx'); // 填入你的链接
      };

      const unlockWithCode = () => {
        const code = prompt("请输入解锁码：");
        if (code === "122902") { 
          hasPaid.value = true;
          localStorage.setItem('isMagicPaid', 'true');
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
        generatePoster, posterUrl, formatContent, restart
      };
    }
  });

  app.mount('#app');
}
