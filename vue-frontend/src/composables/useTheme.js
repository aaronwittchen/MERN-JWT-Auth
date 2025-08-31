import { ref, onMounted, watch } from 'vue'

// Theme persistence key
const THEME_KEY = 'vue-theme-mode'

// Create reactive theme state
const isDark = ref(false)

// Initialize theme from localStorage or system preference
const initializeTheme = () => {
  const savedTheme = localStorage.getItem(THEME_KEY)
  
  if (savedTheme === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  } else if (savedTheme === 'light') {
    isDark.value = false
    document.documentElement.classList.remove('dark')
  } else {
    // No saved preference, use system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    isDark.value = prefersDark
    if (prefersDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
}

// Toggle theme function
const toggleTheme = () => {
  isDark.value = !isDark.value
  
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem(THEME_KEY, 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem(THEME_KEY, 'light')
  }
}

// Set specific theme
const setTheme = (theme) => {
  if (theme === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark')
    localStorage.setItem(THEME_KEY, 'dark')
  } else {
    isDark.value = false
    document.documentElement.classList.remove('dark')
    localStorage.setItem(THEME_KEY, 'light')
  }
}

// Watch for system theme changes
const watchSystemTheme = () => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  
  const handleChange = (e) => {
    // Only update if user hasn't set a preference
    if (!localStorage.getItem(THEME_KEY)) {
      isDark.value = e.matches
      if (e.matches) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }
  
  mediaQuery.addEventListener('change', handleChange)
  
  // Return cleanup function
  return () => mediaQuery.removeEventListener('change', handleChange)
}

// Watch for theme changes and apply to document
watch(isDark, (newValue) => {
  if (newValue) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})

// Initialize theme on mount
onMounted(() => {
  initializeTheme()
  const cleanup = watchSystemTheme()
  
  // Cleanup on unmount (if needed)
  return cleanup
})

// Export the composable
export function useTheme() {
  return {
    isDark,
    toggleTheme,
    setTheme,
    initializeTheme
  }
}
