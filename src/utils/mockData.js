export const mockAdviceData = {
  '加班赶DDL': {
    greeting: '方案会自己长大的 💼',
    music: 'Max Richter - "Dream 3"',
    micro_actions: ['关屏幕闭眼', '喝一小口水', '闹钟推后15分'],
    comfort: '熬夜不是你的错，是夜晚太想你了 🌙✨',
    bedtime_tip: '慢慢数5次呼吸，数错就从头来'
  },
  '追剧停不下来': {
    greeting: '剧永远追不完的 📺',
    music: 'Ólafur Arnalds - "Near Light"',
    micro_actions: ['暂停键按一下', '站起来伸懒腰', '看一眼窗外'],
    comfort: '明天还有新集，今晚先放过自己 🌙',
    bedtime_tip: '把手机放远一点，够不着就不想了'
  },
  '有点emo': {
    greeting: '情绪需要出口的 🫂',
    music: 'Ludovico Einaudi - "Nuvole Bianche"',
    micro_actions: ['深呼吸三次', '写一句心里话', '抱抱自己'],
    comfort: '难过是暂时的，你比想象中更强大 💪🌙',
    bedtime_tip: '478呼吸法：吸气4秒，屏息7秒，呼气8秒'
  },
  '打游戏': {
    greeting: '游戏可以明天再打 🎮',
    music: 'Brian Eno - "An Ending (Ascent)"',
    micro_actions: ['存档退出', '喝口温水', '活动手腕'],
    comfort: '游戏角色会等你，但身体不会 🌙',
    bedtime_tip: '把手机放桌上充电，人躺床上'
  },
  '写论文': {
    greeting: '论文不会跑掉的 📝',
    music: 'Nils Frahm - "Says"',
    micro_actions: ['保存文档', '站起来走走', '看看窗外'],
    comfort: 'deadline是明天的事，今晚先照顾好自己 🌙',
    bedtime_tip: '把待办事项写在纸上，清空大脑'
  },
  '失眠': {
    greeting: '睡不着也没关系 🌙',
    music: 'Max Richter - "On the Nature of Daylight"',
    micro_actions: ['不要看时间', '换个姿势', '想象云朵'],
    comfort: '躺着也是休息，别给自己压力 ☁️',
    bedtime_tip: '想象自己在云上漂浮，慢慢下沉'
  },
  '刷手机': {
    greeting: '手机可以明天再刷 📱',
    music: 'Hammock - "Together Alone"',
    micro_actions: ['放下手机', '闭上眼睛', '听风声'],
    comfort: '错过的信息明天还在，错过的好觉不会 🌙',
    bedtime_tip: '设置屏幕使用时间，到点自动灰屏'
  },
  '想太多': {
    greeting: '脑子也需要休息的 🧠',
    music: 'Sigur Rós - "Untitled #3"',
    micro_actions: ['把想法写下来', '喝口水', '闭眼数数'],
    comfort: '想不通的事，睡一觉可能就想通了 🌙',
    bedtime_tip: '把担心的事写在纸上，明天再处理'
  },
  '焦虑': {
    greeting: '焦虑是身体在保护你 🫂',
    music: 'Marconi Union - "Weightless"',
    micro_actions: ['握拳再松开', '抖抖肩膀', '深呼吸'],
    comfort: '你已经很棒了，真的 🌟',
    bedtime_tip: '渐进式放松：从脚趾开始，逐个部位放松'
  },
  '无聊': {
    greeting: '无聊也是一种自由 🌙',
    music: 'Stars of the Lid - "Requiem for Dying Mothers"',
    micro_actions: ['听听雨声', '翻翻相册', '发会呆'],
    comfort: '无聊的夜晚，适合和自己待一会儿 🌃',
    bedtime_tip: '闭眼想象一个安全温暖的地方'
  }
}

export const getRandomMockAdvice = () => {
  const keys = Object.keys(mockAdviceData)
  return mockAdviceData[keys[Math.floor(Math.random() * keys.length)]]
}

export const findClosestReason = (input) => {
  const normalizedInput = input.toLowerCase().trim()
  for (const [key, value] of Object.entries(mockAdviceData)) {
    if (key.includes(normalizedInput) || normalizedInput.includes(key)) {
      return value
    }
  }
  const keywords = {
    '工作': '加班赶DDL', '加班': '加班赶DDL', 'DDL': '加班赶DDL',
    '剧': '追剧停不下来', '追': '追剧停不下来',
    '难过': '有点emo', '伤心': '有点emo', '情绪': '有点emo',
    '游戏': '打游戏', '论文': '写论文', '作业': '写论文',
    '睡不着': '失眠', '失眠': '失眠',
    '手机': '刷手机', '刷': '刷手机',
    '想': '想太多', '焦虑': '焦虑', '紧张': '焦虑',
    '无聊': '无聊'
  }
  for (const [keyword, reason] of Object.entries(keywords)) {
    if (normalizedInput.includes(keyword)) {
      return mockAdviceData[reason]
    }
  }
  return getRandomMockAdvice()
}
