<template>
  <div>
    <div class="glass-card mb-4 fade-in-up delay-100 text-center p-6">
      <p class="text-2xl md:text-3xl font-semibold text-white" :style="{ fontFamily: theme.fontFamily }">{{ advice.greeting }}</p>
    </div>
    <div class="glass-card mb-4 fade-in-up delay-200 p-5">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center">
          <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        </div>
        <div class="flex-1 min-w-0">
          <h3 class="text-xs font-semibold text-accent/70 uppercase tracking-wider mb-1">🎵 音乐处方</h3>
          <p class="font-medium text-white truncate">{{ advice.music }}</p>
        </div>
      </div>
    </div>
    <div class="glass-card mb-4 fade-in-up delay-300 p-5">
      <h3 class="text-xs font-semibold text-accent/70 uppercase tracking-wider mb-3">✨ 三件小事</h3>
      <div class="space-y-3">
        <div v-for="(action, index) in advice.micro_actions" :key="index" class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
            <span class="text-sm font-bold text-accent">{{ index + 1 }}</span>
          </div>
          <p class="text-gray-300">{{ action }}</p>
        </div>
      </div>
    </div>
    <div class="glass-card mb-4 fade-in-up delay-400 text-center p-6">
      <div class="text-3xl mb-3">💜</div>
      <p class="text-lg md:text-xl font-medium leading-relaxed text-white" :style="{ fontFamily: theme.fontFamily }">{{ advice.comfort }}</p>
    </div>
    <div class="glass-card mb-4 fade-in-up delay-500 p-5">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center">
          <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </div>
        <div>
          <h3 class="text-xs font-semibold text-purple-400/80 uppercase tracking-wider mb-1">🌙 入睡小技巧</h3>
          <p class="text-gray-300 leading-relaxed">{{ advice.bedtime_tip }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTheme } from '../composables/useTheme'
const { theme } = useTheme()
defineProps({ advice: { type: Object, required: true } })
</script>
