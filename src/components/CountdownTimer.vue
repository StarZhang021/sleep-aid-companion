<template>
  <div class="flex flex-col items-center">
    <div class="relative w-48 h-48 md:w-56 md:h-56">
      <svg class="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="6" />
        <circle cx="50" cy="50" r="45" fill="none" :stroke="progressColor" stroke-width="6" stroke-linecap="round"
          :stroke-dasharray="circumference" :stroke-dashoffset="strokeDashoffset" class="transition-all duration-1000" />
      </svg>
      <div class="absolute inset-0 flex flex-col items-center justify-center">
        <div class="font-mono text-5xl md:text-6xl font-bold glow-text" :class="isUrgent ? 'text-orange-400' : 'text-accent'">
          {{ formattedTime }}
        </div>
        <div class="text-xs text-gray-500 mt-1 font-mono">MINUTES LEFT</div>
        <div class="text-sm mt-2" :class="isUrgent ? 'text-orange-400 animate-pulse' : 'text-gray-400'">
          {{ isUrgent ? '⚡ 该睡啦！' : '🌙 距离最佳入睡' }}
        </div>
      </div>
    </div>
    <button @click="showSettings = !showSettings" class="mt-4 text-gray-400 hover:text-accent transition-colors flex items-center gap-2">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <span class="text-sm">设置入睡时间</span>
    </button>
    <div v-if="showSettings" class="mt-4 glass-card p-4 w-full max-w-xs">
      <div class="flex flex-col gap-3">
        <label class="text-sm text-gray-400">目标入睡时间</label>
        <input v-model="targetTimeInput" type="time"
          class="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white text-center text-lg outline-none"
          @change="updateTargetTime" />
        <button @click="showSettings = false" class="w-full py-2 rounded-lg bg-accent/20 hover:bg-accent/40 text-accent text-sm">确认</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
const props = defineProps({ targetTime: { type: String, default: '23:30' } })
const emit = defineEmits(['update:targetTime', 'timeUp'])
const showSettings = ref(false)
const targetTimeInput = ref(props.targetTime)
const currentTime = ref(new Date())
let timer = null
const circumference = 2 * Math.PI * 45
const minutesUntilTarget = computed(() => {
  const now = currentTime.value
  const [h, m] = props.targetTime.split(':').map(Number)
  const t = new Date(now)
  t.setHours(h, m, 0, 0)
  if (t <= now) t.setDate(t.getDate() + 1)
  return Math.floor((t - now) / 60000)
})
const isUrgent = computed(() => minutesUntilTarget.value < 10)
const formattedTime = computed(() => {
  const mins = minutesUntilTarget.value
  if (mins <= 0) return '00'
  if (mins >= 60) return Math.floor(mins / 60) + ':' + String(mins % 60).padStart(2, '0')
  return String(mins).padStart(2, '0')
})
const progress = computed(() => Math.min(minutesUntilTarget.value / 60, 1))
const progressColor = computed(() => isUrgent.value ? '#FF6B6B' : '#FFD966')
const strokeDashoffset = computed(() => circumference * (1 - progress.value))
const updateTargetTime = () => {
  emit('update:targetTime', targetTimeInput.value)
  localStorage.setItem('sleepAidTargetTime', targetTimeInput.value)
}
onMounted(() => {
  const saved = localStorage.getItem('sleepAidTargetTime')
  if (saved) { targetTimeInput.value = saved; emit('update:targetTime', saved) }
  timer = setInterval(() => {
    currentTime.value = new Date()
    if (minutesUntilTarget.value <= 0) emit('timeUp')
  }, 1000)
})
onUnmounted(() => { if (timer) clearInterval(timer) })
</script>
