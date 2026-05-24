<template>
  <div>
    <div class="text-center mb-6">
      <h2 class="text-xl md:text-2xl font-semibold text-white mb-2">今晚为什么熬夜？</h2>
      <p class="text-sm text-gray-500">选择一个原因，获取专属治愈方案</p>
    </div>
    <div class="grid grid-cols-2 gap-3 mb-4">
      <button
        v-for="reason in presetReasons" :key="reason.id"
        @click="selectReason(reason)"
        class="glass-card py-5 px-4 text-center cursor-pointer hover:bg-white/10 transition-all"
        :class="{ 'ring-2 ring-accent': selectedReason?.id === reason.id }"
      >
        <span class="text-3xl mb-2 block">{{ reason.emoji }}</span>
        <span class="text-sm text-gray-300">{{ reason.label }}</span>
      </button>
    </div>
    <div class="flex items-center gap-3 my-4">
      <div class="flex-1 h-px bg-white/10" />
      <span class="text-xs text-gray-500">或者</span>
      <div class="flex-1 h-px bg-white/10" />
    </div>
    <div class="relative">
      <input
        v-model="customReason" @keyup.enter="submitCustomReason"
        type="text" placeholder="输入你的熬夜原因..."
        class="w-full glass-card py-4 px-5 pr-14 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-accent"
      />
      <button
        @click="submitCustomReason" :disabled="!customReason.trim()"
        class="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-accent/20 hover:bg-accent/40 flex items-center justify-center disabled:opacity-30"
      >
        <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>
    </div>
    <div v-if="selectedReason" class="mt-4 text-center">
      <span class="text-sm text-accent">{{ selectedReason.emoji }} {{ selectedReason.label }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['select'])
const presetReasons = [
  { id: 'work', emoji: '💼', label: '加班赶DDL' },
  { id: 'drama', emoji: '📺', label: '追剧停不下来' },
  { id: 'emo', emoji: '😢', label: '有点emo' },
  { id: 'game', emoji: '🎮', label: '打游戏' },
  { id: 'thesis', emoji: '📝', label: '写论文' },
  { id: 'phone', emoji: '📱', label: '刷手机' },
]
const selectedReason = ref(null)
const customReason = ref('')
const selectReason = (reason) => {
  selectedReason.value = reason
  customReason.value = ''
  emit('select', reason.label)
}
const submitCustomReason = () => {
  if (customReason.value.trim()) {
    selectedReason.value = { id: 'custom', emoji: '✏️', label: customReason.value.trim() }
    emit('select', customReason.value.trim())
  }
}
</script>
