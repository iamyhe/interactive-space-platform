<script setup>
import { computed } from 'vue'
import planetsData from '../data/planets.json'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const planet = computed(() => planetsData.find((p) => p.id === props.id))

// Import all planet images directly from src/assets
const images = import.meta.glob('../assets/*.png', { eager: true, import: 'default' })

function getImage(filename) {
  const match = Object.keys(images).find((path) => path.endsWith(filename))
  return match ? images[match] : ''
}
</script>

<template>
  <div class="details-page">
    <div class="stars"></div>
    <div class="stars2"></div>
    <div class="stars3"></div>

    <div class="container position-relative page-content">
      <div v-if="planet" class="details-content">
        <router-link to="/planets" class="back-link">← Back to Planets</router-link>

        <div class="row align-items-center mt-4">
          <div class="col-md-5 mb-4 text-center">
            <div class="image-glow">
              <img :src="getImage(planet.image)" :alt="planet.name" class="planet-image" />
            </div>
          </div>

          <div class="col-md-7">
            <h1 class="planet-name">{{ planet.name }}</h1>
            <p class="planet-description">{{ planet.description }}</p>

            <div class="stats-grid">
              <div class="stat-box">
                <span class="stat-label">Gravity</span>
                <span class="stat-value">{{ planet.gravity }}</span>
              </div>
              <div class="stat-box">
                <span class="stat-label">Distance from Sun</span>
                <span class="stat-value">{{ planet.distanceFromSun }}</span>
              </div>
              <div class="stat-box">
                <span class="stat-label">Diameter</span>
                <span class="stat-value">{{ planet.diameter }}</span>
              </div>
              <div class="stat-box">
                <span class="stat-label">Moons</span>
                <span class="stat-value">{{ planet.moons }}</span>
              </div>
              <div class="stat-box">
                <span class="stat-label">Orbital Period</span>
                <span class="stat-value">{{ planet.orbitalPeriod }}</span>
              </div>
              <div class="stat-box">
                <span class="stat-label">Day Length</span>
                <span class="stat-value">{{ planet.dayLength }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="not-found">
        <h2>Planet Not Found</h2>
        <router-link to="/planets" class="btn btn-light mt-3">← Back to Planets</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.details-page {
  position: relative;
  min-height: 100vh;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  overflow: hidden;
  padding: 40px 0;
}

.page-content {
  z-index: 2;
}

.stars,
.stars2,
.stars3 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 1;
}

.stars {
  background-image: radial-gradient(1px 1px at 20px 30px, #fff, transparent),
    radial-gradient(1px 1px at 90px 120px, #fff, transparent),
    radial-gradient(1px 1px at 160px 60px, #fff, transparent),
    radial-gradient(1px 1px at 230px 180px, #fff, transparent),
    radial-gradient(1px 1px at 300px 90px, #fff, transparent),
    radial-gradient(1px 1px at 400px 40px, #fff, transparent);
  background-repeat: repeat;
  background-size: 500px 300px;
  animation: moveStars 80s linear infinite;
  opacity: 0.8;
}

.stars2 {
  background-image: radial-gradient(1.5px 1.5px at 50px 160px, #fff, transparent),
    radial-gradient(1.5px 1.5px at 180px 20px, #fff, transparent),
    radial-gradient(1.5px 1.5px at 260px 130px, #fff, transparent),
    radial-gradient(1.5px 1.5px at 340px 200px, #fff, transparent);
  background-repeat: repeat;
  background-size: 400px 250px;
  animation: moveStars 120s linear infinite reverse;
  opacity: 0.6;
}

.stars3 {
  background-image: radial-gradient(2px 2px at 100px 50px, #a78bfa, transparent),
    radial-gradient(2px 2px at 220px 150px, #60a5fa, transparent),
    radial-gradient(2px 2px at 320px 80px, #f472b6, transparent);
  background-repeat: repeat;
  background-size: 450px 300px;
  animation: moveStars 200s linear infinite;
  opacity: 0.7;
}

@keyframes moveStars {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-1000px);
  }
}

.back-link {
  color: #a78bfa;
  text-decoration: none;
  font-weight: 600;
  transition: letter-spacing 0.3s ease;
}

.back-link:hover {
  letter-spacing: 1px;
  color: #c4b5fd;
}

.details-content {
  animation: fadeInUp 0.7s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.image-glow {
  display: inline-block;
  border-radius: 50%;
  padding: 20px;
  background: radial-gradient(circle, rgba(167, 139, 250, 0.35) 0%, transparent 70%);
  animation: pulseGlow 3s ease-in-out infinite;
}

@keyframes pulseGlow {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.planet-image {
  width: 100%;
  max-width: 420px;
  border-radius: 50%;
  box-shadow: 0 0 80px rgba(167, 139, 250, 0.45);
  object-fit: contain;
}

.planet-name {
  color: #fff;
  font-weight: 800;
  font-size: 3rem;
  margin-bottom: 15px;
  background: linear-gradient(90deg, #fff, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.planet-description {
  color: #cbd5e1;
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 30px;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.stat-box {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  transition: background 0.3s ease, transform 0.3s ease;
}

.stat-box:hover {
  background: rgba(167, 139, 250, 0.15);
  transform: translateY(-3px);
}

.stat-label {
  color: #94a3b8;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 5px;
}

.stat-value {
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
}

.not-found {
  color: #fff;
  text-align: center;
  padding: 100px 0;
}

@media (max-width: 767px) {
  .planet-name {
    font-size: 2.2rem;
  }
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>