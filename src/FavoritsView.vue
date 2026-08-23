<template>
  <div class="favorites-container">
    <div class="header-section">
      <div class="glow-orb"></div>
      <h1 class="title">⭐ Celestial Favorites</h1>
      <p class="subtitle">Your curated cosmos of saved space discoveries and celestial items</p>
    </div>

    
    <div v-if="favorites.length === 0" class="empty-state">
      <div class="empty-icon">🪐</div>
      <h2>No Cosmic Favorites Yet</h2>
      <p>Explore the solar system, APOD, or search to pin your favorite items here!</p>
      <router-link to="/planets" class="explore-btn">
        <span>Start Exploring</span>
        <svg class="arrow-icon" viewBox="0 0 24 24" width="20" height="20">
          <path fill="currentColor" d="M5 13h11.586l-5.293 5.293a1 1 0 0 0 1.414 1.414l7-7a1 1 0 0 0 0-1.414l-7-7a1 1 0 0 0-1.414 1.414L16.586 11H5a1 1 0 0 0 0 2z"/>
        </svg>
      </router-link>
    </div>

    
    <div v-else class="favorites-grid">
      <div 
        v-for="(item, index) in favorites" 
        :key="item.id || index" 
        class="cosmic-card"
        :style="{ '--delay': index * 0.1 + 's' }"
      >
        <div class="card-glow"></div>
        <div class="card-content">
          <div class="card-badge">Saved Discovery</div>
          <h3>{{ item.name || item.title }}</h3>
          <p>{{ item.description || item.details || 'Saved favorite item from deep space exploration.' }}</p>
        </div>
        
        <div class="card-footer">
          <span class="item-id">ID: #{{ item.id || index + 1 }}</span>
          <button @click="removeFavorite(index)" class="remove-btn" title="Remove from favorites">
            <svg class="trash-icon" viewBox="0 0 24 24" width="18" height="18">
              <path fill="currentColor" d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12Z"/>
            </svg>
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      favorites: []
    };
  },
  mounted() {
    this.loadFavorites();
  },
  methods: {
    loadFavorites() {
      const stored = localStorage.getItem('favorites');
      if (stored) {
        this.favorites = JSON.parse(stored);
      }
    },
    removeFavorite(index) {
     
      this.favorites.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }
  }
};
</script>

<style scoped>

.favorites-container {
  background: radial-gradient(circle at center, #0b0f19 0%, #030712 100%);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999; 
  overflow-y: auto;
  padding: 80px 40px 40px 40px;
}

.favorites-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(white 1px, transparent 0);
  background-size: 50px 50px;
  opacity: 0.15;
  animation: starsTwinkle 20s linear infinite;
  pointer-events: none;
  z-index: 0;
}

@keyframes starsTwinkle {
  from { transform: translateY(0); }
  to { transform: translateY(-500px); }
}
.favorites-container {
  min-height: 85vh;
  padding: 50px 20px;
  max-width: 1800px;
  margin: 0 auto;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  color: #fff;
  position: relative;
  overflow: hidden;
  animation: pageFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}


.glow-orb {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(111, 76, 255, 0.25) 0%, rgba(13, 17, 23, 0) 70%);
  z-index: -1;
  pointer-events: none;
  filter: blur(60px);
}

.header-section {
  text-align: center;
  margin-bottom: 50px;
  position: relative;
}

.title {
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  margin-bottom: 12px;
  background: linear-gradient(135deg, #ffffff 30%, #a78bfa 70%, #f472b6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 10px 30px rgba(167, 139, 250, 0.2);
}

.subtitle {
  color: #94a3b8;
  font-size: 1.15rem;
  font-weight: 400;
}

.empty-state {
  text-align: center;
  background: rgba(18, 24, 38, 0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  padding: 60px 30px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  max-width: 550px;
  margin: 40px auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  animation: floatUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 20px;
  animation: floatOrb 4s ease-in-out infinite;
}

.empty-state h2 {
  font-size: 1.8rem;
  margin-bottom: 12px;
  color: #f8fafc;
}

.empty-state p {
  color: #94a3b8;
  font-size: 1rem;
  margin-bottom: 30px;
  line-height: 1.6;
}

.explore-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  color: white;
  padding: 14px 32px;
  border-radius: 14px;
  text-decoration: none;
  font-weight: 600;
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.explore-btn:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 12px 30px rgba(168, 85, 247, 0.6);
}

.arrow-icon {
  transition: transform 0.3s ease;
}

.explore-btn:hover .arrow-icon {
  transform: translateX(5px);
}


.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 25px;
}

.cosmic-card {
  position: relative;
  background: rgba(20, 27, 45, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  animation: cardEntrance 0.6s cubic-bezier(0.16, 1, 0.3, 1) backwards;
  animation-delay: var(--delay);
  overflow: hidden;
}

.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(167, 139, 250, 0.8), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cosmic-card:hover {
  transform: translateY(-8px) scale(1.01);
  border-color: rgba(167, 139, 250, 0.4);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(167, 139, 250, 0.15);
}

.cosmic-card:hover .card-glow {
  opacity: 1;
}

.card-badge {
  display: inline-block;
  background: rgba(167, 139, 250, 0.12);
  color: #c084fc;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
  margin-bottom: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-content h3 {
  font-size: 1.4rem;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 10px;
  line-height: 1.3;
}

.card-content p {
  color: #94a3b8;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 25px;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.item-id {
  font-size: 0.8rem;
  color: #64748b;
  font-family: monospace;
}

.remove-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(239, 68, 68, 0.12);
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.2);
  padding: 8px 14px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all 0.25s ease;
}

.remove-btn:hover {
  background: #ef4444;
  color: white;
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
}

.remove-btn:active {
  transform: scale(0.95);
}


@keyframes pageFadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes floatUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes cardEntrance {
  from { opacity: 0; transform: translateY(25px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes floatOrb {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style>