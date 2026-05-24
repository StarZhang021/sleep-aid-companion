import { ref, computed, onUnmounted } from 'vue'

export function useCountdown(targetTime = '23:30') {
  const currentTime = ref(new Date())
  const target = ref(targetTime)
  let timer = null

  const minutesUntilTarget = computed(() => {
    const now = currentTime.value
    const [hours, minutes] = target.value.split(':').map(Number)
    const targetDate = new Date(now)
    targetDate.setHours(hours, minutes, 0, 0)
    if (targetDate <= now) {
      targetDate.setDate(targetDate.getDate() + 1)
    }
    return Math.floor((targetDate - now) / 60000)
  })

  const formattedTime = computed(() => {
    const mins = minutesUntilTarget.value
    if (mins <= 0) return '00'
    if (mins >= 60) {
      const h = Math.floor(mins / 60)
      const m = mins % 60
      return h + ':' + String(m).padStart(2, '0')
    }
    return String(mins).padStart(2, '0')
  })

  const progress = computed(() => Math.min(minutesUntilTarget.value / 60, 1))

  const start = () => {
    timer = setInterval(() => { currentTime.value = new Date() }, 1000)
  }

  const stop = () => {
    if (timer) { clearInterval(timer); timer = null }
  }

  start()
  onUnmounted(() => stop())

  return { currentTime, minutesUntilTarget, formattedTime, progress, start, stop }
}
