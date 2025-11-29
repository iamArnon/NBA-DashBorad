<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { nbaApi, type Game } from '../services/nbaApi.ts';

const games = ref<Game[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const fetchGames = async () => {
  try {
    loading.value = true;
    const today = new Date().toISOString().split('T')[0];
    games.value = await nbaApi.getGames(today);
  } catch (err) {
    error.value = 'Failed to fetch games';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchGames();
});
</script>

<template>
  <div class="live-scores">
    <h2>🏀 Live Scores</h2>
    
    <div v-if="loading" class="loading">Loading games...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="games.length === 0" class="no-games">No games today</div>
    
    <div v-else class="games-grid">
      <div v-for="game in games" :key="game.id" class="game-card">
        <div class="team">
          <span class="team-name">{{ game.visitor_team.full_name }}</span>
          <span class="score">{{ game.visitor_team_score }}</span>
        </div>
        <div class="vs">vs</div>
        <div class="team">
          <span class="team-name">{{ game.home_team.full_name }}</span>
          <span class="score">{{ game.home_team_score }}</span>
        </div>
        <div class="game-status">{{ game.status }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.live-scores {
  padding: 20px;
}

h2 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.game-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background: #f9f9f9;
}

.team {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
}

.team-name {
  font-weight: bold;
}

.score {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1d4ed8;
}

.vs {
  text-align: center;
  color: #666;
  margin: 5px 0;
}

.game-status {
  text-align: center;
  margin-top: 10px;
  font-size: 0.875rem;
  color: #666;
}

.loading, .error, .no-games {
  text-align: center;
  padding: 40px;
  color: #666;
}
</style>