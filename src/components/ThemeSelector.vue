<template>
  <div class="grid grid-cols-3 gap-3">
    <button
      v-for="(t, key) in themes" :key="key"
      @click="setTheme(key)"
      class="relative p-3 rounded-xl transition-all hover:scale-105"
      :class="currentTheme === key ? 'ring-2 ring-accent' : 'glass-card'"
    >
      <div class="w-full h-10 rounded-lg mb-2" :style="{ background: t.background }" />
      <div class="text-center">
        <span class="text-lg">{{ t.emoji }}</span>
        <p class="text-xs mt-1" :class="currentTheme === key ? 'text-accent' : 'text-gray-400'">{{ t.name }}</p>
      </div>
      <div v-if="currentTheme === key" class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
        <svg class="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
      </div>
    </button>
  </div>
</template>

<script setup>
import { useTheme } from '../composables/useTheme'
const { themes, currentTheme, setTheme } = useTheme()
</script>
