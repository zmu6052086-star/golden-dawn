const { createApp, ref, computed, nextTick, onMounted } = Vue;

export function initApp(questions, characters) {
  createApp({
    setup() {
      const currentStage = ref('home');
      const currentQuestionIndex = ref(0);
      const scores = ref({});
      const hasPaid = ref(localStorage.getItem('isMagicPaid') === 'true');
      const posterUrl = ref(null);
      const result = ref({});

      const currentQuestion = computed(() => questions[currentQuestionIndex.value]);

      const startTest = () => {
        currentStage.value = 'quiz';
        nextTick(() => lucide.createIcons());
      };

      const selectOption = (option) => {
        const role = option.score;
        scores.value[role] = (scores.value[role] || 0) + 1;
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
            scores.value[a] > scores.value[b] ? a : b
          );
          result.value = characters[winner];
          currentStage.value = 'result';
          nextTick(() => lucide.createIcons());
        }, 1500);
      };

      const payToUnlock = () => {
        // 这里可以放跳转面包多的链接，或者直接弹出收款码
        alert("请前往【面包多】购买解锁码，并点击下方的“输入解锁码”");
        window.open('https://mianbaoduo.com/o/xxx'); // 替换为你的商品地址
      };

      const unlockWithCode = () => {
        const code = prompt("请输入解锁码：");
        if (code === "122902") { // 这里可以设成你的专属密码
          hasPaid.value = true;
          localStorage.setItem('isMagicPaid', 'true');
          alert("解锁成功！");
          nextTick(() => lucide.createIcons());
        } else {
          alert("码不对，请检查");
        }
      };

      const generatePoster = async () => {
        const footer = document.getElementById('poster-footer');
        footer.classList.remove('hidden');
        const qrcodeEl = document.getElementById('qrcode');
        qrcodeEl.innerHTML = '';
        new QRCode(qrcodeEl, { text: window.location.href, width: 64, height: 64 });
        const canvas = await html2canvas(document.getElementById('poster-area'));
        posterUrl.value = canvas.toDataURL('image/png');
        footer.classList.add('hidden');
      };

      const formatContent = (t) => t.replace(/\n/g, '<br>');
      const restart = () => window.location.reload();

      onMounted(() => lucide.createIcons());

      return {
        currentStage, currentQuestionIndex, questions, currentQuestion,
        startTest, selectOption, result, hasPaid, payToUnlock, unlockWithCode,
        generatePoster, posterUrl, formatContent, restart
      };
    }
  }).mount('#app');
}
