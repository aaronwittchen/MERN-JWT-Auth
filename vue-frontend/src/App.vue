<template>
  <div id="app" class="min-h-screen">
    <ThemeToggle />
    
    <div class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <h1 class="text-3xl font-semibold text-primary">
          Sign in to your account
        </h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import ThemeToggle from './components/ThemeToggle.vue'
</script>

<style>
@import './styles/theme.css';
</style>
