import { ref } from 'vue'
import { findClosestReason } from '../utils/mockData'

export function useSleepAdvice() {
  const advice = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  const fetchAdvice = async (reason) => {
    isLoading.value = true
    error.value = null
    advice.value = null

    await new Promise(r => setTimeout(r, 800 + Math.random() * 400))
    advice.value = findClosestReason(reason)
    isLoading.value = false
  }

  return { advice, isLoading, error, fetchAdvice }
}
