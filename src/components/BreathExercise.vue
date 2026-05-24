<template>
  <div>
    <button @click="$emit('back')" class="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
      </svg>
      返回
    </button>
    <div class="text-center mb-8">
      <h2 class="text-2xl font-bold text-white mb-2">🌬️ 478 呼吸法</h2>
      <p class="text-sm text-gray-400">吸气4秒 → 屏息7秒 → 呼气8秒</p>
    </div>
    <div class="flex justify-center mb-8">
      <div class="relative w-56 h-56">
        <div class="absolute inset-0 rounded-full transition-all duration-1000 flex items-center justify-center"
          :style="{ background: `radial-gradient(circle, rgba(${theme.accentRgb},0.3), rgba(${theme.accentRgb},0.1))`, transform: breathScale, boxShadow: `0 0 ${glowSize}px rgba(${theme.accentRgb},0.4)` }">
          <div class="text-center">
            <div class="text-5xl font-bold font-mono" :style="{ color: theme.accent }">{{ countdown }}</div>
            <div class="text-sm mt-1 text-gray-400">{{ phaseText }}</div>
          </div>
        </div>
        <svg class="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2" />
          <circle cx="50" cy="50" r="48" fill="none" :stroke="theme.accent" stroke-width="2" stroke-linecap="round"
            :stroke-dasharray="circumference" :stroke-dashoffset="progressOffset" class="transition-all duration-1000" />
        </svg>
      </div>
    </div>
    <div class="flex justify-center gap-4">
      <button v-if="!isRunning" @click="start" class="px-8 py-3 rounded-xl bg-accent/20 hover:bg-accent/40 text-accent font-medium">开始练习</button>
      <button v-else @click="stop" class="px-8 py-3 rounded-xl bg-red-500/20 hover:bg-red-500/40 text-red-400 font-medium">停止</button>
    </div>
    <div class="text-center mt-6">
      <p class="text-sm text-gray-400">已完成 <span class="text-accent">{{ cycles }}</span> 个循环</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { useTheme } from '../composables/useTheme'
const { theme } = useTheme()
defineEmits(['back'])
const isRunning = ref(false)
const currentPhase = ref(0)
const countdown = ref(0)
const cycles = ref(0)
const totalProgress = ref(0)
let phaseTimer = null
const circumference = 2 * Math.PI * 48
const phases = [{ name: '吸气', duration: 4, scale: 1.2 }, { name: '屏息', duration: 7, scale: 1.2 }, { name: '呼气', duration: 8, scale: 0.8 }]
const phaseText = computed(() => isRunning.value ? phases[currentPhase.value].name : '准备开始')
const breathScale = computed(() => isRunning.value ? `scale(${phases[currentPhase.value].scale})` : 'scale(1)')
const glowSize = computed(() => isRunning.value ? (currentPhase.value === 1 ? 40 : 25) : 20)
const progressOffset = computed(() => circumference * (1 - totalProgress.value / 19))
const start = () => { isRunning.value = true; cycles.value = 0; totalProgress.value = 0; startPhase(0) }
const stop = () => { isRunning.value = false; currentPhase.value = 0; countdown.value = 0; totalProgress.value = 0; clearInterval(phaseTimer) }
const startPhase = (phase) => {
  currentPhase.value = phase
  countdown.value = phases[phase].duration
  clearInterval(phaseTimer)
  phaseTimer = setInterval(() => {
    countdown.value--; totalProgress.value++
    if (countdown.value <= 0) {
      clearInterval(phaseTimer)
      const next = (phase + 1) % 3
      if (next === 0) cycles.value++
      startPhase(next)
    }
  }, 1000)
}
onUnmounted(() => clearInterval(phaseTimer))
</script>
