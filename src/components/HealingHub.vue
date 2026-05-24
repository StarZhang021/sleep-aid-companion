<template>
  <div>
    <button @click="$emit('back')" class="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
      </svg>
      返回
    </button>
    <div class="text-center mb-8">
      <h2 class="text-2xl font-bold text-white mb-2">💜 治愈小站</h2>
      <p class="text-sm text-gray-400">选择一个适合你此刻的方式</p>
    </div>
    <div class="space-y-4">
      <button @click="$emit('navigate', 'breath')" class="glass-card w-full p-5 text-left hover:bg-white/10 transition-all">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-2xl bg-accent/15 flex items-center justify-center"><span class="text-2xl">🌬️</span></div>
          <div class="flex-1">
            <h3 class="font-semibold text-white mb-1">478 呼吸法</h3>
            <p class="text-sm text-gray-400">吸气4秒 → 屏息7秒 → 呼气8秒</p>
          </div>
        </div>
      </button>
      <button @click="$emit('navigate', 'meditation')" class="glass-card w-full p-5 text-left hover:bg-white/10 transition-all">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-2xl bg-purple-500/15 flex items-center justify-center"><span class="text-2xl">🧘</span></div>
          <div class="flex-1">
            <h3 class="font-semibold text-white mb-1">冥想时刻</h3>
            <p class="text-sm text-gray-400">3/5/10 分钟冥想引导</p>
          </div>
        </div>
      </button>
      <button @click="$emit('navigate', 'quotes')" class="glass-card w-full p-5 text-left hover:bg-white/10 transition-all">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-2xl bg-pink-500/15 flex items-center justify-center"><span class="text-2xl">🌙</span></div>
          <div class="flex-1">
            <h3 class="font-semibold text-white mb-1">睡前心语</h3>
            <p class="text-sm text-gray-400">温柔的正念语录</p>
          </div>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
defineEmits(['back', 'navigate'])
</script>
