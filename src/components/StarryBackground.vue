<template>
  <canvas ref="canvasRef" class="fixed inset-0 w-full h-full pointer-events-none" style="z-index:0" />
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { StarrySky } from '../utils/starrySky'
import { useTheme } from '../composables/useTheme'

const canvasRef = ref(null)
let starrySky = null
const { theme } = useTheme()

onMounted(() => {
  if (canvasRef.value) {
    starrySky = new StarrySky(canvasRef.value, theme.value.canvasEffect)
  }
})

watch(() => theme.value.canvasEffect, (newEffect) => {
  if (starrySky) starrySky.setEffect(newEffect)
})

onUnmounted(() => { if (starrySky) starrySky.destroy() })

const triggerFirework = (x, y) => { if (starrySky) starrySky.createFirework(x, y) }
defineExpose({ triggerFirework })
</script>
