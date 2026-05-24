import { ref } from 'vue'

const themes = {
  starry: {
    name: '星空', emoji: '🌌',
    background: 'linear-gradient(180deg, #0a0f2a 0%, #0d1b3e 50%, #0f1d45 100%)',
    accent: '#FFD966', accentRgb: '255,217,102',
    glassBg: 'rgba(255,255,255,0.06)', glassBorder: 'rgba(255,255,255,0.15)',
    textPrimary: '#ffffff', textSecondary: '#9ca3af',
    fontFamily: "'Poppins', sans-serif", canvasEffect: 'stars'
  },
  vangogh: {
    name: '梵高星空', emoji: '🎨',
    background: 'linear-gradient(180deg, #1a1a3e 0%, #2d1b69 30%, #0f3460 70%, #16213e 100%)',
    accent: '#e94560', accentRgb: '233,69,96',
    glassBg: 'rgba(233,69,96,0.08)', glassBorder: 'rgba(233,69,96,0.2)',
    textPrimary: '#f0e6d3', textSecondary: '#b8a88a',
    fontFamily: "'Poppins', sans-serif", canvasEffect: 'vangogh'
  },
  monet: {
    name: '莫奈花园', emoji: '🌸',
    background: 'linear-gradient(180deg, #2c3e50 0%, #3498db 30%, #1abc9c 70%, #16a085 100%)',
    accent: '#e74c3c', accentRgb: '231,76,60',
    glassBg: 'rgba(255,255,255,0.12)', glassBorder: 'rgba(255,255,255,0.25)',
    textPrimary: '#ffeaa7', textSecondary: '#dfe6e9',
    fontFamily: "'Poppins', sans-serif", canvasEffect: 'monet'
  },
  cyberpunk: {
    name: '赛博朋克', emoji: '🤖',
    background: 'linear-gradient(180deg, #0a0a0a 0%, #1a0a2e 50%, #2d1b69 100%)',
    accent: '#00ff9f', accentRgb: '0,255,159',
    glassBg: 'rgba(0,255,159,0.06)', glassBorder: 'rgba(0,255,159,0.2)',
    textPrimary: '#00ff9f', textSecondary: '#b8b8b8',
    fontFamily: "'Poppins', sans-serif", canvasEffect: 'cyberpunk'
  },
  japanese: {
    name: '和风物语', emoji: '🏮',
    background: 'linear-gradient(180deg, #2d1b1b 0%, #4a2c2a 30%, #8b4513 70%, #d2691e 100%)',
    accent: '#ff6b6b', accentRgb: '255,107,107',
    glassBg: 'rgba(255,107,107,0.08)', glassBorder: 'rgba(255,107,107,0.2)',
    textPrimary: '#ffe4c4', textSecondary: '#deb887',
    fontFamily: "'Poppins', sans-serif", canvasEffect: 'japanese'
  },
  aurora: {
    name: '极光之夜', emoji: '✨',
    background: 'linear-gradient(180deg, #0c0c1d 0%, #1a1a3e 30%, #0d3b66 70%, #1b4332 100%)',
    accent: '#00ff88', accentRgb: '0,255,136',
    glassBg: 'rgba(0,255,136,0.06)', glassBorder: 'rgba(0,255,136,0.2)',
    textPrimary: '#e0f7fa', textSecondary: '#80cbc4',
    fontFamily: "'Poppins', sans-serif", canvasEffect: 'aurora'
  }
}

const currentTheme = ref('starry')
const theme = ref(themes.starry)

const savedTheme = localStorage.getItem('sleepAidTheme')
if (savedTheme && themes[savedTheme]) {
  currentTheme.value = savedTheme
  theme.value = themes[savedTheme]
}

const setTheme = (themeName) => {
  if (themes[themeName]) {
    currentTheme.value = themeName
    theme.value = themes[themeName]
    localStorage.setItem('sleepAidTheme', themeName)
  }
}

export function useTheme() {
  return { themes, currentTheme, theme, setTheme }
}
