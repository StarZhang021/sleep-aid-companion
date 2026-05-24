<template>
  <button @click="generateShareImage" :disabled="isGenerating"
    class="glass-card w-full py-4 px-6 flex items-center justify-center gap-3 cursor-pointer hover:bg-white/10 transition-all disabled:opacity-50">
    <svg v-if="!isGenerating" class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
    <span class="text-white font-medium">{{ isGenerating ? '生成中...' : '生成分享图片' }}</span>
  </button>
</template>

<script setup>
import { ref } from 'vue'
import html2canvas from 'html2canvas'
const props = defineProps({ targetRef: { type: Object, default: null } })
const isGenerating = ref(false)
const generateShareImage = async () => {
  if (!props.targetRef) return
  isGenerating.value = true
  try {
    const canvas = await html2canvas(props.targetRef, { backgroundColor: '#0a0f2a', scale: 2, useCORS: true, logging: false })
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'rgba(255,255,255,0.5)'
    ctx.font = '14px Poppins, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('#熬夜自救指南', canvas.width / 2, canvas.height - 30)
    const link = document.createElement('a')
    link.download = '熬夜自救指南.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  } catch (e) {
    console.error(e)
    alert('生成图片失败，请重试')
  } finally {
    isGenerating.value = false
  }
}
</script>
