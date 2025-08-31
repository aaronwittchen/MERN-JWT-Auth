<template>
  <div class="theme-toggle-container">
    <button
      @click="toggleTheme"
      @keydown.enter="toggleTheme"
      @keydown.space.prevent="toggleTheme"
      :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
      class="theme-toggle-button"
      :class="{ 'dark-mode': isDark }"
      tabindex="0"
    >
      <div class="icon-container">
        <svg
          v-if="isDark"
          class="icon sun-icon"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/>
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <svg
          v-else
          class="icon moon-icon"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const isDark = ref(false)
const THEME_KEY = 'vue-theme-mode'

const initializeTheme = () => {
  const savedTheme = localStorage.getItem(THEME_KEY)
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  } else {
    isDark.value = false
    document.documentElement.classList.remove('dark')
  }
}

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

watch(isDark, (newValue) => {
  if (newValue) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})

onMounted(() => {
  initializeTheme()
})
</script>

<style scoped>
.theme-toggle-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
}

.theme-toggle-button {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid;
  background: var(--toggle-bg);
  border-color: var(--toggle-border);
  color: var(--toggle-icon);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--toggle-shadow);
  outline: none;
  position: relative;
}

.theme-toggle-button:hover {
  background: var(--toggle-hover-bg);
  box-shadow: var(--toggle-hover-shadow);
}

.theme-toggle-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px var(--toggle-focus-ring);
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
}

.icon {
  width: 20px;
  height: 20px;
}

.theme-toggle-button:hover .sun-icon {
  color: #fbbf24;
}

.theme-toggle-button:hover .moon-icon {
  color: #fbbf24;
}

/* CSS Variables */
:root {
  --toggle-bg: #f3f4f6;
  --toggle-hover-bg: #e5e7eb;
  --toggle-border: #d1d5db;
  --toggle-icon: #f59e0b;
  --toggle-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  --toggle-hover-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  --toggle-focus-ring: rgba(59, 130, 246, 0.5);
}

.dark {
  --toggle-bg: #374151;
  --toggle-hover-bg: #4b5563;
  --toggle-border: #6b7280;
  --toggle-icon: #fbbf24;
  --toggle-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  --toggle-hover-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
  --toggle-focus-ring: rgba(59, 130, 246, 0.5);
}
</style>
