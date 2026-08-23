<template>
  <div class="apod-wrapper py-5">
    <div class="container">
      <!-- Animated Title -->
      <div class="text-center mb-5 animate-slide-down">
        <h1 class="display-3 fw-bold text-gradient mb-2">NASA Astronomy Picture</h1>
        <p class="text-light opacity-75">Explore the cosmos with NASA's daily featured imagery.</p>
      </div>

      <!-- Date Picker Filter with Glow -->
      <div class="row justify-content-center mb-5">
        <div class="col-md-5">
          <div class="glass-card p-3 rounded-4 shadow-lg animate-scale-in">
            <label for="apodDate" class="form-label text-info fw-semibold mb-2">
              <i class="bi bi-calendar-date me-1"></i> Select Date:
            </label>
            <input 
              type="date" 
              id="apodDate" 
              class="form-control custom-date-input" 
              v-model="selectedDate" 
              :max="currentDate"
            />
          </div>
        </div>
      </div>

      <!-- Loading Spinner -->
      <div v-if="loading" class="text-center my-5 py-5 animate-pulse">
        <div class="spinner-border text-info" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="text-info mt-3 fw-light tracking-wide">Cosmic journey initializing...</p>
      </div>

      <!-- Error Message -->
      <div v-if="errorMsg" class="alert alert-danger text-center rounded-4 shadow animate-shake" role="alert">
        {{ errorMsg }}
      </div>

      <!-- Main Content with Float Animation -->
      <div v-if="!loading && apodData" class="row justify-content-center animate-float">
        <div class="col-lg-10">
          <div class="glass-card overflow-hidden rounded-4 shadow-2lg border-0">
            
            <!-- Media Container -->
            <div class="media-container position-relative">
              <div v-if="apodData.media_type === 'image'">
                <img :src="apodData.url" :alt="apodData.title" class="w-100 apod-img">
              </div>
              <div v-else-if="apodData.media_type === 'video'" class="ratio ratio-16x9">
                <iframe :src="apodData.url" title="NASA APOD Video" allowfullscreen></iframe>
              </div>
              <div class="date-overlay position-absolute top-0 end-0 m-3 px-4 py-2 rounded-pill text-white fw-bold">
                {{ apodData.date }}
              </div>
            </div>

            <!-- Card Body with Text Gradient -->
            <div class="card-body p-5 text-light">
              <h2 class="card-title fw-bold text-gradient-blue mb-3">{{ apodData.title }}</h2>
              <p class="card-text lh-lg text-light opacity-90 fs-6">{{ apodData.explanation }}</p>
            </div>

          </div>
        </div>
      </div>
    </div>
    <!-- Floating background particles -->
    <div class="particles"></div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';

export default {
  name: 'ApodView',
  setup() {
    const getTodayDate = () => {
      const today = new Date();
      return today.toISOString().split('T')[0];
    };

    const currentDate = ref(getTodayDate());
    const selectedDate = ref(getTodayDate());
    const apodData = ref(null);
    const loading = ref(false);
    const errorMsg = ref(null);

    const fetchApod = async (date) => {
      loading.value = true;
      errorMsg.value = null;
      
      const apiKey = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY';
      let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
      
      if (date) {
        url += `&date=${date}`;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data from NASA API.');
        }
        const data = await response.json();
        apodData.value = data;
      } catch (err) {
        errorMsg.value = 'Could not load data. Please check your connection or API key.';
        console.error(err);
      } finally {
        loading.value = false;
      }
    };

    watch(selectedDate, (newDate) => {
      if (newDate) {
        fetchApod(newDate);
      }
    });

    onMounted(() => {
      fetchApod(selectedDate.value);
    });

    return {
      currentDate,
      selectedDate,
      apodData,
      loading,
      errorMsg
    };
  }
}
</script>

<style scoped>
/* 1. Wrapper Background (Space Theme) */
.apod-wrapper {
  background: radial-gradient(circle at center, #0b1120 0%, #05070e 100%);
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

/* Space Background Particles */
.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(white, rgba(255, 255, 255, 0.2) 2px, transparent 3px),
    radial-gradient(white, rgba(255, 255, 255, 0.15) 1px, transparent 2px),
    radial-gradient(white, rgba(255, 255, 255, 0.1) 2px, transparent 3px);
  background-size: 550px 550px, 350px 350px, 250px 250px;
  background-position: 0 0, 40px 60px, 130px 270px;
  animation: particleDrift 60s linear infinite;
  opacity: 0.6;
  pointer-events: none;
}

/* 2. Glassmorphism Card Style */
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.5s ease;
}

.glass-card:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  transform: translateY(-5px);
}

/* 3. Custom Date Input */
.custom-date-input {
  background-color: rgba(0, 0, 0, 0.2) !important;
  border: 1px solid rgba(56, 189, 248, 0.4) !important;
  color: #e0f2fe !important;
  border-radius: 12px;
  padding: 12px 18px;
  color-scheme: dark;
  transition: all 0.3s ease;
}

.custom-date-input:focus {
  border-color: #38bdf8 !important;
  box-shadow: 0 0 20px rgba(56, 189, 248, 0.5) !important;
}

/* 4. Image & Media */
.apod-img {
  max-height: 600px;
  object-fit: cover;
  transition: transform 0.8s ease;
}

.glass-card:hover .apod-img {
  transform: scale(1.05);
}

.date-overlay {
  background: rgba(56, 189, 248, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(56, 189, 248, 0.5);
  font-size: 1rem;
  letter-spacing: 1.2px;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}

/* 5. Text Gradient */
.text-gradient {
  background: linear-gradient(90deg, #ffffff, #38bdf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 15px rgba(56, 189, 248, 0.5);
}

.text-gradient-blue {
  background: linear-gradient(90deg, #38bdf8, #a5f3fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 6. Custom Animations (Keyframes) */

/* Particle drift */
@keyframes particleDrift {
  from { background-position: 0 0, 40px 60px, 130px 270px; }
  to { background-position: 550px 550px, 390px 410px, 380px 520px; }
}

/* Slide down */
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-40px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Scale in */
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

/* Float */
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(10px); }
  100% { transform: translateY(0px); }
}

/* Shake */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
  20%, 40%, 60%, 80% { transform: translateX(8px); }
}

/* Apply animations with classes */
.animate-slide-down {
  animation: slideDown 0.9s ease-out forwards;
}

.animate-scale-in {
  animation: scaleIn 0.8s ease-out forwards;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-pulse {
  animation: pulse 1.5s infinite;
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}
</style>