export const questions = [
  {
    title: "关于秘密的立场",
    scenario: "你发现了一个足以颠覆现行秩序的古老咒语。你会如何处理？",
    options: [
      { label: "A", text: "无论代价如何，立刻亲身实验它的威力。", score: "crowley" },
      { label: "B", text: "将其编入组织的仪式规范，确保正统传承。", score: "mathers" },
      { label: "C", text: "解释其中的心理学意义，分享给大众。", score: "regardie" },
      { label: "D", text: "将其融入艺术创作中，展现神性之美。", score: "moina" }
    ]
  },
  {
    title: "面对困境的选择",
    scenario: "当你的研究陷入瓶颈，且资金匮乏时，你会？",
    options: [
      { label: "A", text: "卖掉家产，独自前往远方求道。", score: "bennett" },
      { label: "B", text: "寻找投资人，通过表演和魅力获取支持。", score: "farr" },
      { label: "C", text: "用诗歌或文学作品宣泄这一痛苦。", score: "yeats" },
      { label: "D", text: "编织一个宏大的叙事，吸引信众共渡难关。", score: "blavatsky" }
    ]
  }
  // ... 建议按照这种格式补全 10 题 ...
];

export const characters = {
  crowley: {
    name: "阿莱斯特·克劳利",
    title: "“汝之所愿，即为律法”",
    image: "https://images.unsplash.com/photo-1514944288352-fffac99f0bdf",
    shortDesc: "意志的极限拓荒者。你永远选择打破禁忌，寻找真我。",
    fullReport: [
      { title: "性格暗面", icon: "moon", content: "为了证明意志，不惜挑战所有既定规则。容易傲慢并忽视他人感受。" },
      { title: "职场定位", icon: "briefcase", content: "首席增长官。适合在蓝海市场疯狂扩张。" }
    ]
  },
  mathers: {
    name: "萨缪尔·马瑟斯",
    title: "“体系的底层立法者”",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853",
    shortDesc: "秩序的守护者。你将混沌转化为可操作的逻辑。",
    fullReport: [
      { title: "性格暗面", icon: "shield-alert", content: "晚年可能陷入权力的偏执与猜忌。" }
    ]
  }
  // ... 此处按之前发你的文案补全其他 6 位 ...
};
