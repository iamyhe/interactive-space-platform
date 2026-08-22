<template>
  <!-- 1. Loading Screen -->
  <transition name="fade-screen">
    <div v-if="isLoading" class="loader-screen">
      <div class="loader-content">
        <div class="orbit-container">
          <div class="planet-core"></div>
          <div class="orbit-ring">
            <div class="moon"></div>
          </div>
        </div>
        <h3 class="loader-title mt-5">INTERACTIVE SPACE EXPLORATION</h3>
        <p class="loader-text mt-2">Loading<span class="loading-dots"></span></p>
      </div>
    </div>
  </transition>

  <!-- 2. Main Content -->
  <transition name="fade-screen">
    <div v-if="!isLoading" class="home-view">
      
      <!-- Animated Space Background -->
      <div class="space-bg">
        <div class="stars"></div>
        <div class="stars2"></div>
        <div class="stars3"></div>
      </div>

      <!-- Hero Section -->
      <header class="hero-section d-flex align-items-center">
        <div class="container position-relative z-index-2">
          <div class="row">
            <div class="col-12 col-lg-10 col-md-12">
              
              <!-- Perfected ONE-CURSOR Two-line Typewriter Effect -->
              <h1 class="hero-title fw-bold mb-3">
                <span class="type-wrap">
                  <span class="invisible-text">EXPLORE THE</span>
                  <span class="type-line-1">EXPLORE THE</span>
                </span><br>
                <span class="type-wrap">
                  <span class="invisible-text">UNIVERSE</span>
                  <span class="type-line-2">UNIVERSE</span>
                </span>
              </h1>
              
              <h4 class="hero-subtitle mb-4 fade-in-2">Discover worlds beyond our own.</h4>
              <p class="hero-text mb-5 fade-in-2">
                Explore planets, discover real NASA imagery,<br>
                and journey through the universe.
              </p>
              
              <div class="d-flex flex-wrap gap-3 fade-in-3">
                <router-link to="/planets" class="btn btn-primary primary-btn glow-button">
                  START EXPLORING <span class="ms-2"></span>
                </router-link>
                <a href="#explore-section" class="btn btn-outline-light secondary-btn">DISCOVER MORE</a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="explore-section" class="solar-system-section py-5 position-relative z-index-2">
        <div class="container-fluid px-4 px-lg-5 mt-4">
          
          <!-- Section Header -->
          <div class="section-header text-center mb-5 hidden-section">
            <div class="d-flex align-items-center justify-content-center">
              <div class="title-line"></div>
              <h2 class="section-title mx-3 mb-0">OUR SOLAR SYSTEM</h2>
              <div class="title-line"></div>
            </div>
            <p class="section-subtitle mt-2">Discover the worlds that surround our Sun.</p>
          </div>
          
          <!-- Planets Grid -->
          <div class="planets-grid mb-5 hidden-section">
            <div class="planet-card text-center p-3" v-for="(planet, index) in planets" :key="index">
              <img :src="planet.image" :alt="planet.name" class="planet-img mb-3">
              <h5 class="planet-name">{{ planet.name }}</h5>
              <p class="planet-desc">{{ planet.desc }}</p>
              <router-link to="/planets" class="btn btn-outline-light explore-planet-btn w-100 mt-auto">
                Explore
              </router-link>
            </div>
          </div>

          <!-- Feature Cards -->
          <div class="row g-4 mb-4 hidden-section">
            <div class="col-lg-6">
              <div class="feature-card mars-card d-flex align-items-center">
                <div class="feature-content z-index-2">
                  <h3 class="feature-title mb-2">MISSION: MARS</h3>
                  <p class="feature-desc mb-3">
                    Explore real images captured by<br>NASA's Mars exploration missions.
                  </p>
                  <div class="rover-links mb-4">
                    <span class="rover-name">Curiosity</span> • <span class="rover-name">Perseverance</span>
                  </div>
                  <router-link to="/mars" class="btn outline-action-btn">
                    EXPLORE MARS &rarr;
                  </router-link>
                </div>
              </div>
            </div>

            <div class="col-lg-6">
              <div class="feature-card apod-card d-flex align-items-center">
                <div class="feature-content z-index-2 ms-auto text-end apod-content-wrapper">
                  <h3 class="feature-title mb-2 text-start">ASTRONOMY PICTURE<br>OF THE DAY</h3>
                  <p class="feature-desc mb-3 text-start">
                    Discover a new view of the<br>universe every day.
                  </p>
                  <div class="apod-meta text-start mb-4">
                    <div class="meta-item"><i class="bi bi-calendar-event me-2"></i>May 18, 2026</div>
                    <div class="meta-item"><i class="bi bi-image me-2"></i>The Pillars of Creation</div>
                    <div class="meta-item"><i class="bi bi-building me-2"></i>NASA</div>
                  </div>
                  <div class="text-start">
                    <router-link to="/apod" class="btn outline-action-btn">
                      DISCOVER TODAY'S IMAGE &rarr;
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Tools Section -->
          <div class="row g-4 mb-5 hidden-section">
            <div class="col-lg-5">
              <div class="tool-card p-4 h-100 d-flex flex-column justify-content-center">
                <h4 class="tool-title mb-1">SEARCH THE UNIVERSE</h4>
                <p class="tool-desc mb-4">Explore NASA's collection of space imagery.</p>
                
                <div class="search-input-wrapper d-flex">
                  <div class="input-icon-wrapper flex-grow-1 position-relative">
                    <span class="search-icon">🔍</span>
                    <input type="text" class="form-control custom-search-input" placeholder="Search planets, galaxies, missions...">
                  </div>
                  <router-link to="/search" class="btn primary-btn ms-2 px-4">
                    SEARCH <span class="ms-1">🔍</span>
                  </router-link>
                </div>
              </div>
            </div>

            <div class="col-lg-7">
              <div class="tool-card p-4 h-100 d-flex flex-column justify-content-center">
                <div class="d-flex justify-content-between align-items-end mb-3">
                  <div>
                    <h4 class="tool-title mb-1">SAVE YOUR DISCOVERIES</h4>
                    <p class="tool-desc mb-0">Keep your favorite space discoveries in one place.</p>
                  </div>
                  <router-link to="/favorites" class="btn outline-action-btn btn-sm">
                    VIEW FAVORITES &rarr;
                  </router-link>
                </div>
                
                <div class="favorites-gallery d-flex gap-2 mt-2">
                  <div class="fav-item position-relative" v-for="(fav, index) in favorites" :key="index">
                    <img :src="fav" alt="Favorite Image" class="fav-img">
                    <div class="fav-overlay"><span class="heart-icon">♡</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            
          <!-- Weather Section -->
          <section class="weather-section hidden-section">
            <div class="weather-card">
              <div class="weather-content">
                <h2 class="section-title">LOCAL WEATHER</h2>
                <p class="section-desc">
                  Discover the current weather conditions in your area instantly, just by using your geographic location.
                </p>
                <router-link to="/weather" class="btn outline-action-btn btn-sm">
                  CHECK WEATHER &rarr;
                </router-link>
              </div>
              <div class="weather-img">
                <img src="../assets/weather.jpeg" alt="Weather Component">
              </div>
            </div>
          </section>

        </div>
      </section>
    </div>
  </transition>
</template>

<script>
import mercuryImg from '../assets/planet-mercury.png'
import venusImg from '../assets/planet-venus.png'
import earthImg from '../assets/planet-earth.png'
import marsImg from '../assets/planet-mars.png'
import jupiterImg from '../assets/planet-jupiter.png'
import saturnImg from '../assets/planet-saturn.png'
import uranusImg from '../assets/planet-uranus.png'
import neptuneImg from '../assets/planet-neptune.png'

import fav1Img from '../assets/fav-1.png'
import fav2Img from '../assets/fav-2.png'
import fav3Img from '../assets/fav-3.png'
import fav4Img from '../assets/fav-4.png'
import fav5Img from '../assets/fav-5.jpeg'
import fav6Img from '../assets/fav-6.jpeg'

export default {
  name: 'HomeView',
  data() {
    return {
      isLoading: true,
      planets: [
        { name: 'Mercury', desc: 'The smallest planet in our solar system.', image: mercuryImg },
        { name: 'Venus', desc: 'The hottest planet and closest to Earth.', image: venusImg },
        { name: 'Earth', desc: 'Our home planet and the only known life.', image: earthImg },
        { name: 'Mars', desc: 'The Red Planet and humanity\'s next stop.', image: marsImg },
        { name: 'Jupiter', desc: 'The largest planet in our solar system.', image: jupiterImg },
        { name: 'Saturn', desc: 'Famous for its beautiful rings.', image: saturnImg },
        { name: 'Uranus', desc: 'An ice giant with a unique tilt.', image: uranusImg },
        { name: 'Neptune', desc: 'The windiest planet far from the Sun.', image: neptuneImg }
      ],
      favorites: [fav1Img, fav2Img, fav3Img, fav4Img, fav5Img, fav6Img]
    }
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
      
      this.$nextTick(() => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('show-section');
              observer.unobserve(entry.target); 
            }
          });
        }, {
          threshold: 0.15 
        });

        const hiddenElements = document.querySelectorAll('.hidden-section');
        hiddenElements.forEach(el => observer.observe(el));
      });
      
    }, 1800);
  }
}
</script>

<style scoped>
/* =========================================
   1. Loader Styles
========================================= */
.loader-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #03050c;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loader-content {
  text-align: center;
}

.orbit-container {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto;
}

.planet-core {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background: radial-gradient(circle, #5a4fcf, #8bb3f4);
  border-radius: 50%;
  box-shadow: 0 0 25px rgba(90, 79, 207, 0.6);
}

.orbit-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 1px dashed rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  animation: spin 3s linear infinite;
}

.moon {
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 12px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 10px #fff;
}

@keyframes spin {
  100% { transform: rotate(360deg); }
}

.loader-title {
  color: #fff;
  font-weight: 500;
  letter-spacing: 4px;
  font-size: 1.1rem;
}

.loader-text {
  color: #5a4fcf;
  font-size: 0.9rem;
  letter-spacing: 2px;
}

.loading-dots::after {
  content: '';
  animation: dots 1.5s steps(4, end) infinite;
}

@keyframes dots {
  0%, 20% { content: ''; }
  40% { content: '.'; }
  60% { content: '..'; }
  80%, 100% { content: '...'; }
}

/* Page Transitions */
.fade-screen-enter-active, .fade-screen-leave-active {
  transition: opacity 0.8s ease;
}
.fade-screen-enter-from, .fade-screen-leave-to {
  opacity: 0;
}

/* =========================================
   2. Scroll & View Animations
========================================= */
.hidden-section {
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.show-section {
  opacity: 1;
  transform: translateY(0);
}

.fade-in-2, .fade-in-3 {
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
}

.fade-in-2 { animation-delay: 0.5s; } 
.fade-in-3 { animation-delay: 0.8s; } 

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* =========================================
   3. Animated Space Background
========================================= */
.home-view {
  position: relative;
  overflow-x: hidden;
  background-color: #03050c;
}

.space-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
}

.stars, .stars2, .stars3 {
  position: absolute;
  top: -100%; left: 0; right: 0; bottom: 0;
  width: 100%; height: 200%;
}

.stars {
  background-image: radial-gradient(1px 1px at 20px 30px, #ffffff, transparent), radial-gradient(1px 1px at 90px 120px, #ffffff, transparent), radial-gradient(1px 1px at 160px 60px, #ffffff, transparent), radial-gradient(1px 1px at 230px 180px, #ffffff, transparent);
  background-size: 250px 250px;
  animation: starAnim 50s linear infinite;
  opacity: 0.6;
}

.stars2 {
  background-image: radial-gradient(2px 2px at 50px 160px, #ffffff, transparent), radial-gradient(2px 2px at 180px 20px, #ffffff, transparent);
  background-size: 350px 350px;
  animation: starAnim 100s linear infinite;
  opacity: 0.4;
}

.stars3 {
  background-image: radial-gradient(2px 2px at 40px 70px, #8bb3f4, transparent), radial-gradient(2px 2px at 150px 150px, #ffffff, transparent);
  background-size: 450px 450px;
  animation: starAnim 150s linear infinite;
  opacity: 0.3;
}

@keyframes starAnim {
  from { transform: translateY(0); }
  to { transform: translateY(50%); }
}

/* =========================================
   4. Hero Section & PERFECT Typewriter
========================================= */
.hero-section {
  position: relative;
  min-height: 100vh;
  background-image: url('../assets/hero-solar-system.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-top: -70px; 
  padding-top: 70px;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(3,5,12,0.95) 0%, rgba(3,5,12,0.6) 50%, rgba(3,5,12,0.1) 100%);
  z-index: 1;
}

.z-index-2 { z-index: 2; position: relative; }

.hero-title {
  margin: 0;
  color: #ffffff !important;
  opacity: 1 !important;
  font-size: clamp(2.5rem, 5vw, 4.5rem); 
  letter-spacing: 2px;
  line-height: 1.2;
}

.type-wrap {
  position: relative;
  display: inline-block;
  padding-right: 6px; 
}

.invisible-text {
  visibility: hidden; 
}

.type-line-1, .type-line-2 {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  overflow: hidden;
  white-space: nowrap;
}

/* Line 1: solid cursor while typing, then disappears immediately */
.type-line-1 {
  width: 0;
  border-right: 4px solid #5a4fcf;
  animation: typing-1 1.5s steps(20, end) forwards; 
}

/* Line 2: waits 1.5s, types with solid cursor, then blinks infinitely */
.type-line-2 {
  width: 0;
  border-right: 4px solid transparent;
  animation: 
    typing-2 1.3s steps(20, end) 1.5s forwards, 
    blink-caret-2 0.75s step-end 2.8s infinite; /* Blinks after 1.5 + 1.3 seconds */
}

@keyframes typing-1 {
  0% { width: 0; border-right-color: #5a4fcf; }
  99.9% { width: 100%; border-right-color: #5a4fcf; }
  100% { width: 100%; border-right-color: transparent; } /* Cursor dies */
}

@keyframes typing-2 {
  0% { width: 0; border-right-color: transparent; }
  1% { width: 0; border-right-color: #5a4fcf; } /* Cursor spawns */
  100% { width: 100%; border-right-color: #5a4fcf; }
}

@keyframes blink-caret-2 {
  from, to { border-right-color: transparent; }
  50% { border-right-color: #5a4fcf; }
}

.hero-subtitle { color: #5a4fcf; font-weight: 500; }
.hero-text { color: rgba(255, 255, 255, 0.7); font-size: 1.1rem; }

/* Pulse Animation for Button */
.primary-btn {
  background-color: #5a4fcf;
  border-color: #5a4fcf;
  border-radius: 8px;
  padding: 10px 24px;
  font-weight: 600;
  color: #fff;
  text-decoration: none;
  transition: all 0.3s ease;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(90, 79, 207, 0.7); }
  70% { box-shadow: 0 0 0 15px rgba(90, 79, 207, 0); }
  100% { box-shadow: 0 0 0 0 rgba(90, 79, 207, 0); }
}

.primary-btn:hover {
  background-color: #483eb8;
  border-color: #483eb8;
  color: #fff;
}

.secondary-btn {
  border-radius: 8px;
  padding: 10px 24px;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  text-decoration: none;
  transition: all 0.3s ease;
}
.secondary-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: #fff;
  color: #fff;
}

/* =========================================
   5. Solar System Grid & Features (HOVER ADDED)
========================================= */
.solar-system-section { background-color: transparent; }

.section-title {
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 2px;
  color: #ffffff !important;
  opacity: 1 !important;
}

.title-line {
  height: 1px;
  width: 150px;
  background-color: rgba(255, 255, 255, 0.2);
  position: relative;
}

.title-line::after {
  content: '';
  position: absolute;
  top: -2px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
}

.title-line:first-child::after { right: 0; }
.title-line:last-child::after { left: 0; }

.section-subtitle { color: rgba(255, 255, 255, 0.5); font-size: 0.95rem; }

.planets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 15px;
  padding: 20px 0;
}

.planet-card {
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  transition: all 0.3s ease; /* transition applies everywhere */
  display: flex;
  flex-direction: column;
  height: 100%;
}

.planet-card:hover {
  transform: translateY(-8px);
  background-color: rgba(255, 255, 255, 0.04);
  border-color: rgba(90, 79, 207, 0.6);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.planet-img {
  max-width: 100%;
  height: 100px;
  object-fit: contain;
  margin: 0 auto;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.1));
  transition: transform 0.4s ease;
}

.planet-card:hover .planet-img {
  transform: scale(1.15); 
}

.planet-name { 
  font-size: 1.1rem; 
  font-weight: 600; 
  margin-bottom: 5px; 
  color: #ffffff !important;
  opacity: 1 !important;
}

.planet-desc { font-size: 0.75rem; color: rgba(255, 255, 255, 0.5); margin-bottom: 15px; flex-grow: 1; }

.explore-planet-btn {
  border-color: rgba(90, 79, 207, 0.8);
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.8rem;
  border-radius: 20px;
  padding: 6px 0;
  text-decoration: none;
}

.explore-planet-btn:hover { background-color: rgba(90, 79, 207, 0.8); border-color: rgba(90, 79, 207, 0.8); color: #fff; }

/* Mars & APOD Cards */
.feature-card {
  height: 280px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  background-color: #0c0e1a;
  transition: all 0.3s ease; /* Add transition for hover effect */
}

.feature-card:hover {
  transform: translateY(-8px);
  border-color: rgba(90, 79, 207, 0.6);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.mars-card {
  background-image: url('../assets/mars-banner.png');
  background-size: cover;
  background-position: center;
}

.mars-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, transparent 100%);
}

.apod-card {
  background-image: url('../assets/apod-banner.jpeg');
  background-size: cover;
  background-position: center;
}

.apod-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(270deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 60%, transparent 100%);
}

.feature-content { padding: 40px; }
.apod-content-wrapper { max-width: 70%; }

.feature-title { 
  font-size: 1.4rem; 
  font-weight: 600; 
  letter-spacing: 1px; 
  color: #ffffff !important;
  opacity: 1 !important;
}

.feature-desc { color: rgba(255, 255, 255, 0.7); font-size: 0.9rem; }
.rover-links { font-size: 0.85rem; color: rgba(255, 255, 255, 0.5); }
.rover-name { color: #8bb3f4; cursor: pointer; }
.apod-meta { font-size: 0.8rem; color: rgba(255, 255, 255, 0.6); line-height: 1.8; }

.outline-action-btn {
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  border-radius: 6px;
  font-size: 0.8rem;
  padding: 8px 16px;
  text-decoration: none;
  transition: 0.3s;
}

.outline-action-btn:hover { background-color: rgba(255, 255, 255, 0.1); color: #fff; border-color: #fff; }

/* Search & Favorites Cards */
.tool-card {
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  transition: all 0.3s ease; /* Add transition for hover effect */
}

.tool-card:hover {
  transform: translateY(-8px);
  border-color: rgba(90, 79, 207, 0.6);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.tool-title { 
  font-size: 1.2rem; 
  font-weight: 600; 
  letter-spacing: 1px;
  color: #ffffff !important;
  opacity: 1 !important;
}

.tool-desc { color: rgba(255, 255, 255, 0.5); font-size: 0.9rem; }

.input-icon-wrapper { position: relative; }
.search-icon {
  position: absolute;
  left: 15px; top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.9rem;
}

.custom-search-input {
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 10px 10px 10px 40px;
  border-radius: 8px;
}

.custom-search-input:focus {
  background-color: rgba(255, 255, 255, 0.08);
  border-color: #5a4fcf;
  box-shadow: 0 0 0 0.25rem rgba(90, 79, 207, 0.25);
  color: #fff;
}

.favorites-gallery { overflow-x: auto; padding-bottom: 5px; }

.fav-item {
  width: 90px; height: 60px;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
}

.fav-img { width: 100%; height: 100%; object-fit: cover; transition: 0.3s; }

.fav-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.3);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transition: 0.3s;
}

.fav-item:hover .fav-img { transform: scale(1.1); }
.fav-item:hover .fav-overlay { opacity: 1; }
.heart-icon { color: #fff; font-size: 1.2rem; }

/* =========================================
   6. Weather Section
========================================= */
.weather-section {
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.weather-card {
  background-color: rgba(255, 255, 255, 0.02); 
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
}

.weather-card:hover {
  border-color: rgba(90, 79, 207, 0.6);
  transform: translateY(-8px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.weather-content {
  max-width: 600px;
}

.section-desc {
  color: rgba(255, 255, 255, 0.7); 
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.weather-img {
  width: 200px; 
  height: 175px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.weather-img img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0.75; 
}

/* =========================================
   7. Media Queries
========================================= */
@media (max-width: 1200px) { 
  .planets-grid { grid-template-columns: repeat(4, 1fr); } 
}

@media (max-width: 991px) { 
  .apod-content-wrapper { max-width: 100%; text-align: left !important; } 
}

@media (max-width: 768px) {
  .planets-grid { grid-template-columns: repeat(2, 1fr); }
  .feature-card { height: auto; padding: 20px 0; }
  .mars-card::before, .apod-card::before { background: linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 100%); }
  
  .weather-card {
    flex-direction: column;
    text-align: left;
    align-items: flex-start;
  }
  .weather-img {
    display: none;
  }
  
  /* Disable Typewriter on Mobile to prevent layout issues */
  .type-line-1, .type-line-2 {
    font-size: 2.5rem;
    white-space: normal;
    border-right: none;
    width: 100%;
    animation: fadeInUp 0.8s ease-out forwards;
  }
}
</style>