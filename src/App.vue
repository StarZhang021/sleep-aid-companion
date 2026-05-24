<template>
  <div class="min-h-screen relative overflow-hidden" :style="{ background: theme.background }">
    <StarryBackground ref="starryBg" />
    <div class="relative z-10 min-h-screen flex flex-col">
      <header class="pt-6 pb-2 px-4">
        <div class="max-w-lg mx-auto flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-accent/15 flex items-center justify-center">
              <span class="text-xl">🌙</span>
            </div>
            <div>
              <h1 class="text-xl md:text-2xl font-bold glow-text text-white" :style="{ fontFamily: theme.fontFamily }">熬夜自救指南</h1>
              <p class="text-xs text-gray-500">晚安，你赢了时间</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button @click="currentView = 'healing'" class="w-10 h-10 rounded-2xl glass-card flex items-center justify-center hover:bg-white/10">
              <span class="text-lg">💜</span>
            </button>
            <button @click="showSettings = !showSettings" class="w-10 h-10 rounded-2xl glass-card flex items-center justify-center hover:bg-white/10">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main class="flex-1 px-4 pb-8">
        <div class="max-w-lg mx-auto">
          <HealingHub v-if="currentView === 'healing'" @back="currentView = null" @navigate="currentView = $event" />
          <BreathExercise v-else-if="currentView === 'breath'" @back="currentView = 'healing'" />
          <MeditationTimer v-else-if="currentView === 'meditation'" @back="currentView = 'healing'" />
          <MindfulQuotes v-else-if="currentView === 'quotes'" @back="currentView = 'healing'" />
          <div v-else class="space-y-6">
            <section class="fade-in-up">
              <CountdownTimer :target-time="targetTime" @update:target-time="targetTime = $event" @time-up="handleTimeUp" />
            </section>
            <section v-if="!advice" class="fade-in-up delay-100">
              <ReasonSelector @select="handleReasonSelect" />
            </section>
            <section v-if="isLoading" class="fade-in-up">
              <div class="glass-card p-8 text-center">
                <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 mb-4">
                  <div class="w-8 h-8 border-4 border-accent/30 border-t-accent rounded-full animate-spin" />
                </div>
                <p class="text-gray-400 font-medium">正在为你生成专属方案...</p>
              </div>
            </section>
            <section v-if="advice && !isLoading" ref="adviceSection">
              <AdviceCards :advice="advice" />
              <div class="mt-6 fade-in-up delay-600">
                <ShareButton :target-ref="$refs.adviceSection" />
              </div>
              <div class="mt-4 text-center fade-in-up delay-700">
                <button @click="resetAdvice" class="text-sm text-gray-400 hover:text-accent">← 重新选择原因</button>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer class="py-4 px-4 text-center">
        <p class="text-xs text-gray-500">Made with ♥ for night owls</p>
      </footer>
    </div>

    <div v-if="showTimeUp" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60" @click="showTimeUp = false" />
      <div class="relative glass-card p-8 max-w-sm w-full text-center">
        <div class="text-6xl mb-4">🌙</div>
        <h2 class="text-2xl font-bold text-white mb-2">晚安，你赢了时间</h2>
        <p class="text-gray-400 mb-6">现在去睡，明天会感谢今天的自己</p>
        <button @click="showTimeUp = false" class="w-full py-3 rounded-xl bg-accent/20 hover:bg-accent/40 text-accent font-medium">我知道了</button>
      </div>
    </div>

    <div v-if="showSettings" class="fixed inset-0 z-50 flex items-end justify-center pb-8">
      <div class="absolute inset-0 bg-black/50" @click="showSettings = false" />
      <div class="relative glass-card w-full max-w-lg mx-4 p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-white">设置</h3>
          <button @click="showSettings = false" class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="space-y-6">
          <div>
            <label class="text-sm text-gray-400 block mb-3">选择风格主题</label>
            <ThemeSelector />
          </div>
          <div>
            <label class="text-sm text-gray-400 block mb-2">目标入睡时间</label>
            <input v-model="targetTime" type="time"
              class="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white text-center text-lg outline-none" />
          </div>
          <button @click="saveSettings" class="w-full py-3 rounded-xl bg-accent/20 hover:bg-accent/40 text-accent font-medium">保存设置</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import StarryBackground from './components/StarryBackground.vue'
import CountdownTimer from './components/CountdownTimer.vue'
import ReasonSelector from './components/ReasonSelector.vue'
import AdviceCards from './components/AdviceCards.vue'
import ShareButton from './components/ShareButton.vue'
import ThemeSelector from './components/ThemeSelector.vue'
import HealingHub from './components/HealingHub.vue'
import BreathExercise from './components/BreathExercise.vue'
import MeditationTimer from './components/MeditationTimer.vue'
import MindfulQuotes from './components/MindfulQuotes.vue'
import { useSleepAdvice } from './composables/useSleepAdvice'
import { useTheme } from './composables/useTheme'

const { advice, isLoading, fetchAdvice } = useSleepAdvice()
const { theme } = useTheme()
const starryBg = ref(null)
const adviceSection = ref(null)
const showSettings = ref(false)
const showTimeUp = ref(false)
const targetTime = ref('23:30')
const currentView = ref(null)

onMounted(() => {
  const saved = localStorage.getItem('sleepAidTargetTime')
  if (saved) targetTime.value = saved
})

const handleReasonSelect = async (reason) => {
  await fetchAdvice(reason)
  setTimeout(() => {
    if (adviceSection.value) adviceSection.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 100)
}

const handleTimeUp = () => {
  showTimeUp.value = true
  if (starryBg.value) starryBg.value.triggerFirework(window.innerWidth / 2, window.innerHeight / 2)
}

const resetAdvice = () => { advice.value = null; window.scrollTo({ top: 0, behavior: 'smooth' }) }
const saveSettings = () => { localStorage.setItem('sleepAidTargetTime', targetTime.value); showSettings.value = false }
</script>
