<template>
  <div class="home-view">
    <!-- Hero Section -->
    <header class="hero-section d-flex align-items-center">
      <div class="container position-relative z-index-2">
        <div class="row">
          <div class="col-lg-6 col-md-8">
            <h1 class="hero-title fw-bold mb-3">
              EXPLORE THE<br>UNIVERSE
            </h1>
            <h4 class="hero-subtitle mb-4">Discover worlds beyond our own.</h4>
            <p class="hero-text mb-5">
              Explore planets, discover real NASA imagery,<br>
              and journey through the universe.
            </p>
            
            <div class="d-flex flex-wrap gap-3">
              <router-link to="/planets" class="btn btn-primary primary-btn">
                START EXPLORING <span class="ms-2"></span>
              </router-link>
              <a href="#explore-section" class="btn btn-outline-light secondary-btn">DISCOVER MORE</a>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Solar System Section -->
    <section id="explore-section" class="solar-system-section py-5">
      <div class="container-fluid px-4 px-lg-5 mt-4">
        
        <div class="section-header text-center mb-5">
          <div class="d-flex align-items-center justify-content-center">
            <div class="title-line"></div>
            <h2 class="section-title mx-3 mb-0">OUR SOLAR SYSTEM</h2>
            <div class="title-line"></div>
          </div>
          <p class="section-subtitle mt-2">Discover the worlds that surround our Sun.</p>
        </div>
        
        <div class="planets-grid mb-5">
          <div class="planet-card text-center p-3" v-for="(planet, index) in planets" :key="index">
            <img :src="planet.image" :alt="planet.name" class="planet-img mb-3">
            <h5 class="planet-name">{{ planet.name }}</h5>
            <p class="planet-desc">{{ planet.desc }}</p>
            <router-link to="/planets" class="btn btn-outline-light explore-planet-btn w-100 mt-auto">
              Explore
            </router-link>
          </div>
        </div>

        <!-- Features Section -->
        <div class="row g-4 mb-4">
          
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
        <div class="row g-4 mb-5">
          
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

      </div>
    </section>
  </div>
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
  }
}
</script>

<style scoped>
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
.z-index-2 { z-index: 2; }

.hero-title {
  font-size: 4.5rem;
  line-height: 1.1;
  letter-spacing: -1px;
  color: #ffffff !important;
  opacity: 1 !important;
}
.hero-subtitle { color: #5a4fcf; font-weight: 500; }
.hero-text { color: rgba(255, 255, 255, 0.7); font-size: 1.1rem; }

.primary-btn {
  background-color: #5a4fcf;
  border-color: #5a4fcf;
  border-radius: 8px;
  padding: 10px 24px;
  font-weight: 600;
  color: #fff;
  text-decoration: none;
  transition: all 0.3s ease;
}
.primary-btn:hover {
  background-color: #483eb8;
  border-color: #483eb8;
  color: #fff;
  box-shadow: 0 4px 15px rgba(90, 79, 207, 0.4);
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

.solar-system-section { background-color: #03050c; }
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
  transition: transform 0.3s ease, border-color 0.3s ease;
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

.feature-card {
  height: 280px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  background-color: #0c0e1a;
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

.tool-card {
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
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

@media (max-width: 1200px) { .planets-grid { grid-template-columns: repeat(4, 1fr); } }
@media (max-width: 991px) { .apod-content-wrapper { max-width: 100%; text-align: left !important; } }
@media (max-width: 768px) {
  .planets-grid { grid-template-columns: repeat(2, 1fr); }
  .hero-title { font-size: 3rem; }
  .feature-card { height: auto; padding: 20px 0; }
  .mars-card::before, .apod-card::before { background: linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 100%); }
}
</style>