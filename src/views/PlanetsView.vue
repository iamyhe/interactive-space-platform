<script setup>
import { ref } from 'vue'
import planetsData from '../data/planets.json'

const planets = ref(planetsData)

// Import all planet images directly from src/assets
const images = import.meta.glob('../assets/*.png', { eager: true, import: 'default' })

function getImage(filename) {
  const match = Object.keys(images).find((path) => path.endsWith(filename))
  return match ? images[match] : ''
}

function shortDescription(text) {
  return text.length > 80 ? `${text.slice(0, 80)}...` : text
}
</script>

<template>
  <div class="planet-list-page">
    <div class="container my-5">
      <header class="text-center mb-5">
        <h1 class="page-title">Explore the Solar System</h1>
        <p class="page-subtitle">Click on any planet to discover its secrets</p>
      </header>

      <div class="row g-4">
        <div class="col-md-4" v-for="planet in planets" :key="planet.id">
          <!-- The link goes to /planets/id dynamically -->
          <router-link :to="`/planets/${planet.id}`" class="planet-card-link">
            <article class="planet-card">
              <div class="planet-card-img-wrapper">
                <img :src="getImage(planet.image)" :alt="planet.name" class="planet-card-img" />
              </div>
              <div class="planet-card-body">
                <h5 class="planet-card-title">{{ planet.name }}</h5>
                <p class="planet-card-text">{{ shortDescription(planet.description) }}</p>
                <span class="planet-card-btn">View Details →</span>
              </div>
            </article>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.planet-list-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  padding-top: 20px;
  padding-bottom: 40px;
}
.page-title { color: #fff; font-weight: 700; font-size: 2.5rem; letter-spacing: 1px; }
.page-subtitle { color: #b8b8d1; font-size: 1.1rem; }
.planet-card-link { text-decoration: none; display: block; height: 100%; }
.planet-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;
  height: 100%;
  backdrop-filter: blur(6px);
  transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
}
.planet-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 15px 35px rgba(120, 100, 255, 0.35);
  border-color: rgba(150, 130, 255, 0.5);
}
.planet-card-img-wrapper {
  overflow: hidden;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle, rgba(167, 139, 250, 0.12) 0%, transparent 70%);
  padding: 15px;
}
.planet-card-img { width: 100%; height: 100%; object-fit: contain; transition: transform 0.5s ease; }
.planet-card:hover .planet-card-img { transform: scale(1.12); }
.planet-card-body { padding: 20px; }
.planet-card-title { color: #fff; font-weight: 600; margin-bottom: 10px; }
.planet-card-text { color: #b8b8d1; font-size: 0.9rem; min-height: 60px; }
.planet-card-btn {
  display: inline-block; color: #a78bfa; font-weight: 600; margin-top: 10px; transition: letter-spacing 0.3s ease;
}
.planet-card:hover .planet-card-btn { letter-spacing: 1px; }
</style>