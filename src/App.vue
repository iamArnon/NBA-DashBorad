<script setup lang="ts">
import LiveScores from './components/liveScores.vue'
</script>

<template>
  <div class="app">
    <header>
      <h1>🏀 NBA Dashboard</h1>
    </header>
    <main>
      <LiveScores />
    </main>
  </div>
</template>

<style scoped>
.app {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

header {
  text-align: center;
  padding: 20px 0;
  border-bottom: 2px solid #1d4ed8;
  margin-bottom: 30px;
}

h1 {
  color: #1d4ed8;
  font-size: 3rem;
}
</style>