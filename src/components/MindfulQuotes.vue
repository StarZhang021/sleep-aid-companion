<template>
  <div>
    <button @click="$emit('back')" class="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
      </svg>
      返回
    </button>
    <div class="text-center mb-8">
      <h2 class="text-2xl font-bold text-white mb-2">🌙 睡前心语</h2>
      <p class="text-sm text-gray-400">轻轻读一遍，然后放下所有</p>
    </div>
    <div class="glass-card p-8 mb-8 text-center">
      <p class="text-xl md:text-2xl leading-relaxed font-medium text-white" :style="{ fontFamily: theme.fontFamily }">
        {{ currentQuote.text }}
      </p>
      <p class="mt-4 text-sm text-gray-400">—— {{ currentQuote.author }}</p>
    </div>
    <div class="flex flex-wrap justify-center gap-2 mb-6">
      <button v-for="cat in categories" :key="cat.id" @click="currentCategory = cat.id"
        class="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
        :class="currentCategory === cat.id ? 'bg-accent/30 text-accent' : 'glass-card text-gray-400'">
        {{ cat.emoji }} {{ cat.name }}
      </button>
    </div>
    <div class="flex justify-center gap-4">
      <button @click="prevQuote" class="w-12 h-12 rounded-xl glass-card flex items-center justify-center text-gray-400 hover:text-white">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button @click="randomQuote" class="px-6 py-3 rounded-xl bg-accent/20 hover:bg-accent/40 text-accent font-medium">随机一句</button>
      <button @click="nextQuote" class="w-12 h-12 rounded-xl glass-card flex items-center justify-center text-gray-400 hover:text-white">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTheme } from '../composables/useTheme'
const { theme } = useTheme()
defineEmits(['back'])
const currentIndex = ref(0)
const currentCategory = ref('all')
const categories = [
  { id: 'all', name: '全部', emoji: '✨' },
  { id: 'peace', name: '平静', emoji: '🕊️' },
  { id: 'self', name: '自我', emoji: '💜' },
  { id: 'tomorrow', name: '明天', emoji: '🌅' },
  { id: 'sleep', name: '好眠', emoji: '😴' }
]
const quotes = [
  { id: 1, text: '今天已经足够好了，你也已经足够好了。', category: 'peace', author: '佚名' },
  { id: 2, text: '深呼吸，让所有的紧张随风而去。', category: 'peace', author: '佚名' },
  { id: 3, text: '你不需要完美，你只需要真实。', category: 'peace', author: '佚名' },
  { id: 4, text: '放下今天，明天是新的开始。', category: 'peace', author: '佚名' },
  { id: 5, text: '此刻，允许自己什么都不做。', category: 'peace', author: '佚名' },
  { id: 6, text: '你值得被温柔以待，尤其是被自己。', category: 'self', author: '佚名' },
  { id: 7, text: '照顾好自己，是你能做的最勇敢的事。', category: 'self', author: '佚名' },
  { id: 8, text: '你已经走了很远的路，为自己骄傲吧。', category: 'self', author: '佚名' },
  { id: 9, text: '不完美也没关系，你本来就很美。', category: 'self', author: '佚名' },
  { id: 10, text: '给自己一个拥抱，你值得拥有。', category: 'self', author: '佚名' },
  { id: 11, text: '明天会更好，但现在请先好好休息。', category: 'tomorrow', author: '佚名' },
  { id: 12, text: '睡一觉，世界会变得不一样。', category: 'tomorrow', author: '佚名' },
  { id: 13, text: '明天的你，会感谢今天早点睡的自己。', category: 'tomorrow', author: '佚名' },
  { id: 14, text: '让今天的故事，在梦里画上句号。', category: 'tomorrow', author: '佚名' },
  { id: 15, text: '新的一天，从好好睡觉开始。', category: 'tomorrow', author: '佚名' },
  { id: 16, text: '闭上眼睛，让梦境温柔地拥抱你。', category: 'sleep', author: '佚名' },
  { id: 17, text: '星星在守护你，安心入睡吧。', category: 'sleep', author: '佚名' },
  { id: 18, text: '月亮为你守夜，晚安。', category: 'sleep', author: '佚名' },
  { id: 19, text: '让疲惫随风而去，在梦里重获力量。', category: 'sleep', author: '佚名' },
  { id: 20, text: '今晚，让好梦来找你。', category: 'sleep', author: '佚名' }
]
const filteredQuotes = computed(() => currentCategory.value === 'all' ? quotes : quotes.filter(q => q.category === currentCategory.value))
const currentQuote = computed(() => filteredQuotes.value[currentIndex.value] || quotes[0])
const nextQuote = () => { currentIndex.value = (currentIndex.value + 1) % filteredQuotes.value.length }
const prevQuote = () => { currentIndex.value = (currentIndex.value - 1 + filteredQuotes.value.length) % filteredQuotes.value.length }
const randomQuote = () => {
  let idx; do { idx = Math.floor(Math.random() * filteredQuotes.value.length) } while (idx === currentIndex.value && filteredQuotes.value.length > 1)
  currentIndex.value = idx
}
onMounted(() => randomQuote())
</script>
