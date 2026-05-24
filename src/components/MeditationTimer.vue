<template>
  <div>
    <button @click="$emit('back')" class="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
      </svg>
      返回
    </button>
    <div class="text-center mb-8">
      <h2 class="text-2xl font-bold text-white mb-2">🧘 冥想时刻</h2>
      <p class="text-sm text-gray-400">闭上眼睛，专注呼吸</p>
    </div>
    <div v-if="!isRunning && !isCompleted" class="flex justify-center gap-3 mb-8">
      <button v-for="min in [3,5,10]" :key="min" @click="selectedMinutes = min"
        class="px-4 py-2 rounded-xl text-sm font-medium transition-all"
        :class="selectedMinutes === min ? 'bg-accent/30 text-accent' : 'glass-card text-gray-400'">
        {{ min }} 分钟
      </button>
    </div>
    <div class="flex justify-center mb-8">
      <div class="relative w-64 h-64">
        <div class="absolute inset-0 rounded-full flex items-center justify-center"
          :style="{ background: `radial-gradient(circle, rgba(${theme.accentRgb},0.2), rgba(${theme.accentRgb},0.05))`, boxShadow: isRunning ? `0 0 60px rgba(${theme.accentRgb},0.3)` : 'none' }">
          <div class="text-center">
            <div class="text-6xl font-bold font-mono" :style="{ color: theme.accent }">{{ formattedTime }}</div>
            <div class="text-sm mt-2 text-gray-400">{{ isCompleted ? '完成' : (isRunning ? '专注呼吸' : '准备开始') }}</div>
          </div>
        </div>
        <svg class="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="3" />
          <circle cx="50" cy="50" r="46" fill="none" :stroke="theme.accent" stroke-width="3" stroke-linecap="round"
            :stroke-dasharray="circumference" :stroke-dashoffset="progressOffset" class="transition-all duration-1000" />
        </svg>
      </div>
    </div>
    <div v-if="isCompleted" class="text-center mb-8">
      <div class="inline-block p-6 rounded-2xl bg-accent/10 border border-accent/20">
        <div class="text-4xl mb-3">🌟</div>
        <p class="text-lg font-medium text-white">冥想完成</p>
        <p class="text-sm mt-1 text-gray-400">感谢你给自己这段安静的时光</p>
      </div>
    </div>
    <div class="flex justify-center gap-4">
      <button v-if="!isRunning && !isCompleted" @click="start" class="px-8 py-3 rounded-xl bg-accent/20 hover:bg-accent/40 text-accent font-medium">开始冥想</button>
      <button v-if="isRunning" @click="stop" class="px-8 py-3 rounded-xl bg-red-500/20 hover:bg-red-500/40 text-red-400 font-medium">停止</button>
      <button v-if="isCompleted" @click="reset" class="px-8 py-3 rounded-xl bg-accent/20 hover:bg-accent/40 text-accent font-medium">再来一次</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { useTheme } from '../composables/useTheme'
const { theme } = useTheme()
defineEmits(['back'])
const isRunning = ref(false)
const isCompleted = ref(false)
const selectedMinutes = ref(5)
const remainingSeconds = ref(0)
let timer = null
const circumference = 2 * Math.PI * 46
const totalSeconds = computed(() => selectedMinutes.value * 60)
const formattedTime = computed(() => {
  const m = Math.floor(remainingSeconds.value / 60)
  const s = remainingSeconds.value % 60
  return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0')
})
const progressOffset = computed(() => {
  if (!isRunning.value && !isCompleted.value) return circumference
  return circumference * (1 - (totalSeconds.value - remainingSeconds.value) / totalSeconds.value)
})
const start = () => {
  isRunning.value = true; isCompleted.value = false; remainingSeconds.value = totalSeconds.value
  timer = setInterval(() => { remainingSeconds.value--; if (remainingSeconds.value <= 0) complete() }, 1000)
}
const stop = () => { isRunning.value = false; clearInterval(timer) }
const complete = () => { clearInterval(timer); isRunning.value = false; isCompleted.value = true }
const reset = () => { isCompleted.value = false; remainingSeconds.value = 0 }
onUnmounted(() => clearInterval(timer))
</script>
