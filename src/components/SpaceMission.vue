<template>
  <div class="mission-wrapper">
    
    <!-- ========================================== -->
    <!-- 1. OVERLAY BACKDROP                        -->
    <!-- Blurs the background when the mission starts-->
    <!-- ========================================== -->
    <transition name="fade">
      <div v-if="currentStage > 0" class="mission-backdrop" @click="abortMission"></div>
    </transition>

    <!-- ========================================== -->
    <!-- 2. THE FLOATING MASCOT CONTAINER           -->
    <!-- Handles the astronaut's position & visibility-->
    <!-- ========================================== -->
    <div class="mascot-fixed-container" :class="{ 'show-mascot': showMascot && !isDismissedLocally, 'is-flying': currentStage > 0 }">
      
      <div class="astronaut-wrapper">
        
        <!-- Dismiss Button -->
        <button v-if="showMascot" @click="abortMission" class="close-mission-btn" title="Dismiss Astronaut">✖</button>

        <!-- Dynamic Speech Bubbles -->
        <transition name="pop" mode="out-in">
          <!-- Initial Greeting -->
          <div class="speech-bubble" v-if="currentStage === 0">
            <p class="greeting mb-1">HEY, EXPLORER! 👋</p>
            <p class="mission-text mb-0">I've got new missions for you... Ready?</p>
          </div>
          
          <!-- Mission Alert -->
          <div class="speech-bubble mars-bubble" v-else-if="currentStage === 2">
            <p class="greeting text-danger mb-1">{{ currentPlanetData.name }} APPROACH!</p>
            <p class="mission-text mb-0">Navigate the terrain carefully!</p>
          </div>
        </transition>
        
        <!-- Sprite Animation Element -->
        <div class="astronaut-sprite" :class="{ 'fly-action': currentStage === -1 || currentStage === 2 }"></div>
      
      </div>

      <!-- Accept Mission Trigger -->
      <transition name="fade">
        <button 
          v-if="currentStage === 0" 
          @click="startMission" 
          class="btn mission-btn mt-3 glow-button">
          🚀 ACCEPT MISSION
        </button>
      </transition>

    </div>

    <!-- ========================================== -->
    <!-- 3. STAGE 1: RANDOM PLANETS SELECTION       -->
    <!-- Generates 3 random planets for the user    -->
    <!-- ========================================== -->
    <transition name="fade-slide">
      <div v-if="currentStage === 1" class="mission-modal-content stage-1-layout">
        
        <h2 class="success-title mb-2 text-center">MISSION STARTED! 🚀</h2>
        <h5 class="text-light mb-5 text-center">"Explorer, choose our next destination!"</h5>

        <!-- Level Progression Grid -->
        <div class="row justify-content-center gap-5 w-100 mt-5 pt-4">
          <div 
            v-for="planet in activeMissions" 
            :key="planet.id"
            class="col-auto text-center planet-target" 
            :class="{ 'locked-planet': unlockedLevel < planet.id }"
            @click="selectPlanet(planet)"
          >
            <div class="planet-img-wrapper">
              <img :src="planet.image" :alt="planet.name" class="mission-planet-img">
              
              <!-- Lock Overlay for locked levels -->
              <div v-if="unlockedLevel < planet.id" class="lock-overlay">
                <span class="lock-icon">🔒</span>
              </div>
            </div>
            
            <h5 class="mt-3 text-white planet-label">
              {{ planet.name }}
              <br>
              <small v-if="unlockedLevel < planet.id" class="text-secondary fs-6">Locked</small>
            </h5>
          </div>
        </div>

      </div>
    </transition>

    <!-- ========================================== -->
    <!-- 4. STAGE 2: DYNAMIC QUIZ                   -->
    <!-- Displays the specific quiz for the planet  -->
    <!-- ========================================== -->
    <transition name="fade-slide">
      <div v-if="currentStage === 2 && currentPlanetData" class="mission-modal-content quiz-layout">
        
        <h2 class="text-warning fw-bold mb-3 text-center text-uppercase">MISSION: {{ currentPlanetData.name }}</h2>
        <h5 class="text-light mb-4 text-center w-75">
          {{ currentPlanetData.quiz.question }}
        </h5>

        <div class="d-flex flex-column gap-3 w-100 align-items-center mt-4">
          <button 
            v-for="(option, index) in currentPlanetData.quiz.options" 
            :key="index"
            class="btn quiz-option w-75" 
            :class="{ 'shake-error': shakeBtn === index }"
            @click="checkAnswer(option.isCorrect, index)"
          >
            {{ option.text }}
          </button>
        </div>

        <!-- Feedback Message (Success/Error) -->
        <p v-if="feedbackMsg" class="mt-4 fw-bold fs-5" :class="feedbackClass">{{ feedbackMsg }}</p>
      
      </div>
    </transition>

    <!-- ========================================== -->
    <!-- 5. STAGE 3: MISSION SUCCESS (LEVEL CLEARED)-->
    <!-- ========================================== -->
    <transition name="pop">
      <div v-if="currentStage === 3" class="mission-modal-content text-center success-layout">
        
        <h1 class="text-success fw-bold mb-3" style="font-size: 3rem;">LEVEL CLEARED! 🚩</h1>
        <p class="text-light fs-4 mb-4">Brilliant work at {{ currentPlanetData.name }}, Explorer!<br>New coordinates unlocked.</p>
        
        <button class="btn mission-btn px-5 py-3 fs-5" @click="continueMission">
          CONTINUE EXPLORING 🚀
        </button>

      </div>
    </transition>

    <!-- ========================================== -->
    <!-- 6. STAGE 4: ULTIMATE VICTORY               -->
    <!-- Displayed when all 3 levels are completed  -->
    <!-- ========================================== -->
    <transition name="pop">
      <div v-if="currentStage === 4" class="mission-modal-content text-center success-layout">
        
        <h1 class="text-warning fw-bold mb-3" style="font-size: 3.5rem;">LEGENDARY EXPLORER! ⭐⭐⭐⭐⭐</h1>
        <p class="text-light fs-4 mb-4">You have successfully completed all missions in this sector.<br>The universe is safer because of you.</p>
        
        <button class="btn btn-outline-light px-5 py-3 fs-5" @click="abortMission">
          RETURN TO BASE
        </button>

      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// =========================================
// ASSETS IMPORTS
// =========================================
import mercuryImg from '../assets/planet-mercury.png'
import venusImg from '../assets/planet-venus.png'
import earthImg from '../assets/planet-earth.png'
import marsImg from '../assets/planet-mars.png'
import jupiterImg from '../assets/planet-jupiter.png'
import saturnImg from '../assets/planet-saturn.png'
import uranusImg from '../assets/planet-uranus.png'
import neptuneImg from '../assets/planet-neptune.png'

// =========================================
// REACTIVE STATE MANAGEMENT
// =========================================
const currentStage = ref(0) // Tracks the current screen (0: Intro, 1: Planets, 2: Quiz, 3: Success, 4: Victory)
const showMascot = ref(false) // Controls astronaut visibility based on scroll
const isDismissedLocally = ref(false) // Tracks if user manually closed the mascot
const unlockedLevel = ref(1) // Current playable level (1, 2, or 3)

const feedbackMsg = ref('') // Stores success/error message for the quiz
const feedbackClass = ref('') // Stores CSS classes for the feedback message
const shakeBtn = ref(-1) // Triggers shake animation for incorrect answers

const activeMissions = ref([]) // Stores the 3 randomly selected planets
const currentPlanetData = ref(null) // Stores data of the currently played planet
const playedPlanets = ref([]) // History array to prevent replaying the same planets

// =========================================
// FULL PLANETS DATABASE
// =========================================
const allPlanetsDB = [
  { 
    name: 'Mercury', 
    image: mercuryImg,
    quiz: {
      question: "Mercury has extreme temperatures. How do we survive the heat?",
      options: [
        { text: "A) Hide in the deep craters at the poles", isCorrect: true },
        { text: "B) Use solar sails to fly away quickly", isCorrect: false },
        { text: "C) Land on the equator facing the sun", isCorrect: false }
      ]
    }
  },
  { 
    name: 'Venus', 
    image: venusImg,
    quiz: {
      question: "Venus is covered in thick, toxic clouds. How do we navigate?",
      options: [
        { text: "A) Rely on visual cameras", isCorrect: false },
        { text: "B) Use advanced radar imaging to map the surface", isCorrect: true },
        { text: "C) Follow the magnetic field lines", isCorrect: false }
      ]
    }
  },
  { 
    name: 'Earth', 
    image: earthImg,
    quiz: {
      question: "Space debris is falling towards Earth's atmosphere! What is your order?",
      options: [
        { text: "A) Let it burn up naturally in the atmosphere", isCorrect: true },
        { text: "B) Shoot it down with a laser", isCorrect: false },
        { text: "C) Catch it with a giant space net", isCorrect: false }
      ]
    }
  },
  { 
    name: 'Mars', 
    image: marsImg,
    quiz: {
      question: "Approaching Mars! Where is the safest landing zone for our rover?",
      options: [
        { text: "A) Crater Edge (Steep Slopes)", isCorrect: false },
        { text: "B) Flat Plain (Jezero Crater)", isCorrect: true },
        { text: "C) Rocky Mountain Peak", isCorrect: false }
      ]
    }
  },
  { 
    name: 'Jupiter', 
    image: jupiterImg,
    quiz: {
      question: "Jupiter's gravity is pulling us in! Which maneuver saves us?",
      options: [
        { text: "A) Perform a Slingshot Maneuver", isCorrect: true },
        { text: "B) Fire reverse thrusters at full power", isCorrect: false },
        { text: "C) Dive into the Great Red Spot", isCorrect: false }
      ]
    }
  },
  { 
    name: 'Saturn', 
    image: saturnImg,
    quiz: {
      question: "We need to fly through Saturn's rings. What's the main danger?",
      options: [
        { text: "A) High radiation levels", isCorrect: false },
        { text: "B) Colliding with fast-moving ice and rock chunks", isCorrect: true },
        { text: "C) Extreme magnetic storms", isCorrect: false }
      ]
    }
  },
  { 
    name: 'Uranus', 
    image: uranusImg,
    quiz: {
      question: "Uranus is an Ice Giant with extreme cold. How do we prevent system failure?",
      options: [
        { text: "A) Fly faster to generate friction heat", isCorrect: false },
        { text: "B) Redirect engine heat to the core systems", isCorrect: true },
        { text: "C) Wait for the sun to warm it up", isCorrect: false }
      ]
    }
  },
  { 
    name: 'Neptune', 
    image: neptuneImg,
    quiz: {
      question: "Neptune has the fastest winds in the solar system. How do we stabilize?",
      options: [
        { text: "A) Deploy a space parachute", isCorrect: false },
        { text: "B) Ascend above the stormy atmosphere", isCorrect: true },
        { text: "C) Anchor to a solid surface", isCorrect: false }
      ]
    }
  }
]

// =========================================
// SCROLL LOGIC
// Controls when the mascot appears/hides
// =========================================
const handleScroll = () => {
  const currentScroll = window.scrollY;

  // Show mascot after scrolling down 400px
  if (currentScroll > 400 && currentStage.value === 0) {
    showMascot.value = true
  }

  // Reset Mascot state if user scrolled back to top
  if (isDismissedLocally.value && currentScroll < 100) {
    isDismissedLocally.value = false;
  }
}

onMounted(() => { 
  window.addEventListener('scroll', handleScroll) 
})

onUnmounted(() => { 
  window.removeEventListener('scroll', handleScroll) 
})

// =========================================
// MISSION METHODS
// Handles game progression and logic
// =========================================

/**
 * Starts the mission by generating 3 random, unplayed planets.
 */
const startMission = () => {
  unlockedLevel.value = 1
  
  // Filter out previously played planets
  let availablePlanets = allPlanetsDB.filter(planet => !playedPlanets.value.includes(planet.name))
  
  // Reset history if remaining planets are less than 3
  if (availablePlanets.length < 3) {
    playedPlanets.value = [] 
    availablePlanets = [...allPlanetsDB]
  }

  // Shuffle and select 3 planets
  const shuffled = availablePlanets.sort(() => 0.5 - Math.random())
  
  activeMissions.value = shuffled.slice(0, 3).map((planet, index) => ({
    ...planet,
    id: index + 1 // Assign ID for locked/unlocked system
  }))

  currentStage.value = -1 
  setTimeout(() => { 
    currentStage.value = 1 
  }, 1200)
}

/**
 * Navigates to the quiz stage for the selected planet.
 */
const selectPlanet = (planet) => {
  if (unlockedLevel.value < planet.id) return

  currentPlanetData.value = planet
  currentStage.value = 2 
}

/**
 * Validates the user's answer and triggers animations/feedback.
 */
const checkAnswer = (isCorrect, index) => {
  if (isCorrect) {
    feedbackMsg.value = "BINGO! 🎯 Excellent decision, Explorer!"
    feedbackClass.value = "text-success animate-pop"
    
    setTimeout(() => {
      feedbackMsg.value = ''
      currentStage.value = 3 
    }, 1500)

  } else {
    shakeBtn.value = index 
    feedbackMsg.value = "OOPS! 💥 That was a close call, re-calculate!"
    feedbackClass.value = "text-danger"
    
    setTimeout(() => { 
      feedbackMsg.value = '' 
      shakeBtn.value = -1
    }, 1500)
  }
}

/**
 * Unlocks the next level or finishes the game if all 3 are completed.
 */
const continueMission = () => {
  // Save current planet to history
  if (!playedPlanets.value.includes(currentPlanetData.value.name)) {
    playedPlanets.value.push(currentPlanetData.value.name)
  }

  // Unlock next planet
  if (unlockedLevel.value === currentPlanetData.value.id) {
    unlockedLevel.value++ 
  }

  // Check victory condition
  if (unlockedLevel.value > 3) {
    currentStage.value = 4 
  } else {
    currentStage.value = 1
  }
}

/**
 * Closes the mission and dismisses the mascot.
 */
const abortMission = () => {
  currentStage.value = 0
  showMascot.value = false 
  isDismissedLocally.value = true 
  feedbackMsg.value = ''
}
</script>

<style scoped>
/* =========================================
   1. OVERLAY & LAYOUT
========================================= */
.mission-wrapper {
  position: relative;
  z-index: 99999;
}

.mission-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(3, 5, 12, 0.95);
  backdrop-filter: blur(10px);
  z-index: 9998;
}

.mission-modal-content {
  position: fixed;
  left: 0;
  width: 100vw;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Modal positions based on stage */
.stage-1-layout { top: 38vh; } 
.quiz-layout { top: 40vh; }   
.success-layout { top: 35vh; }

/* =========================================
   2. MASCOT FIXED CONTAINER
========================================= */
.mascot-fixed-container {
  position: fixed;
  bottom: -250px;
  right: 40px;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 1.2s cubic-bezier(0.25, 1, 0.5, 1);
  opacity: 0;
  pointer-events: none;
}

.show-mascot {
  bottom: 40px;
  opacity: 1;
  pointer-events: auto;
}

/* Repositions mascot to center when mission is active */
.is-flying {
  bottom: auto;
  right: 50vw;
  top: 12vh;
  transform: translateX(50%) scale(1.2);
  opacity: 1;
  pointer-events: auto;
}

.astronaut-wrapper {
  position: relative;
  animation: wrapperFloat 4s ease-in-out infinite;
}

/* =========================================
   3. ASTRONAUT SPRITE ANIMATION
========================================= */
.astronaut-sprite {
  width: 180px;
  height: 180px;
  background-image: url('../assets/Astronaut Adventure Pose Sprite Sheet.png');
  background-size: 400% 200%; /* Sprite sheet is 4 columns x 2 rows */
  background-repeat: no-repeat;
  background-position: 0% 0%;
  animation: spriteFloat 1.2s infinite step-end;
  filter: drop-shadow(0 0 20px rgba(139, 179, 244, 0.3));
}

@keyframes spriteFloat {
  0% { background-position: 0% 0%; }
  25% { background-position: 33.33% 0%; }
  50% { background-position: 66.66% 0%; }
  75% { background-position: 100% 0%; }
  100% { background-position: 0% 0%; }
}

.fly-action {
  animation: spriteAction 0.6s infinite step-end !important;
}

@keyframes spriteAction {
  0% { background-position: 0% 100%; }
  25% { background-position: 33.33% 100%; }
  50% { background-position: 66.66% 100%; }
  75% { background-position: 100% 100%; }
  100% { background-position: 0% 100%; }
}

@keyframes wrapperFloat {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}

/* =========================================
   4. UI COMPONENTS (BUBBLE & BUTTONS)
========================================= */
.close-mission-btn {
  position: absolute;
  top: -10px;
  right: -10px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  cursor: pointer;
  z-index: 100;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}

.close-mission-btn:hover {
  background: #ff4757;
  transform: scale(1.1);
}

.speech-bubble {
  position: absolute;
  top: -20px;
  right: 150px;
  background: rgba(20, 24, 44, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid #5a4fcf;
  padding: 15px 25px;
  border-radius: 20px;
  border-bottom-right-radius: 0;
  color: white;
  width: 280px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  text-align: left;
}

.mars-bubble {
  border-color: #ff4757;
}

.greeting {
  font-weight: 800;
  color: #8bb3f4;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.mars-bubble .greeting {
  color: #ff4757;
}

.mission-text {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
}

.mission-btn {
  background: linear-gradient(45deg, #5a4fcf, #483eb8);
  border: 2px solid #8bb3f4;
  color: white;
  font-weight: 700;
  letter-spacing: 2px;
  padding: 12px 30px;
  border-radius: 50px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.mission-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(139, 179, 244, 0.6);
  color: white;
}

/* =========================================
   5. QUIZ OPTIONS & PLANETS
========================================= */
.success-title {
  color: #8bb3f4;
  font-weight: 800;
  letter-spacing: 2px;
  text-shadow: 0 0 15px rgba(139, 179, 244, 0.5);
}

.quiz-option {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 15px;
  border-radius: 12px;
  font-size: 1.1rem;
  transition: 0.3s;
}

.quiz-option:hover {
  background: rgba(90, 79, 207, 0.4);
  border-color: #5a4fcf;
  color: white;
  transform: translateX(10px);
}

.shake-error {
  animation: shake 0.4s;
  background-color: rgba(255, 71, 87, 0.2) !important;
  border-color: #ff4757 !important;
  color: #ff4757 !important;
}

/* Planet Cards Styling */
.planet-target {
  cursor: pointer;
  transition: transform 0.3s ease;
  position: relative;
}

.planet-img-wrapper {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.02);
  border: 2px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.mission-planet-img {
  width: 85%;
  height: 85%;
  object-fit: contain;
  transition: all 0.4s ease;
  filter: drop-shadow(0 0 15px rgba(255,255,255,0.1));
}

.planet-target:not(.locked-planet):hover .planet-img-wrapper {
  border-color: #5a4fcf;
  box-shadow: 0 0 35px rgba(90, 79, 207, 0.6);
  transform: scale(1.1);
}

.planet-target:not(.locked-planet):hover .mission-planet-img {
  transform: rotate(15deg) scale(1.1);
}

.planet-label {
  transition: all 0.3s ease;
  letter-spacing: 1px;
  font-size: 1.3rem;
}

/* Locked Planet Visuals */
.locked-planet {
  opacity: 0.5;
  cursor: not-allowed;
}

.lock-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.lock-icon {
  font-size: 2rem;
}

/* =========================================
   6. TRANSITIONS & ANIMATIONS
========================================= */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active {
  animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.pop-leave-active {
  animation: popIn 0.4s reverse;
}

.fade-slide-enter-active {
  transition: all 0.6s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(40px);
}

.animate-pop {
  animation: popIn 0.4s;
}

@keyframes popIn {
  0% {
    opacity: 0;
    transform: scale(0.5) translateY(20px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-15px);
  }
  50% {
    transform: translateX(15px);
  }
  75% {
    transform: translateX(-15px);
  }
}

/* =========================================
   7. MEDIA QUERIES
========================================= */
@media (max-width: 768px) {
  .mascot-fixed-container {
    bottom: -200px;
    right: 20px;
    transform: scale(0.8);
  }
  
  .is-flying {
    transform: translate(50%, 0) scale(1);
    top: 5vh;
    right: 50vw;
  }
  
  .speech-bubble {
    right: 120px;
    width: 220px;
  }
  
  .planet-img-wrapper {
    width: 110px;
    height: 110px;
  }
  
  .quiz-option {
    width: 95% !important;
    font-size: 0.95rem;
  }
  
  .stage-1-layout {
    top: 32vh;
  }
  
  .quiz-layout {
    top: 32vh;
  }
}
</style>