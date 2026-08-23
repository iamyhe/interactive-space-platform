<template>
  <div id="app-container" class="d-flex flex-column min-vh-100">
    
    <!-- ========================================== -->
    <!-- 1. NAVBAR SECTION                          -->
    <!-- ========================================== -->
    <NavbarComponent />
    
    <!-- ========================================== -->
    <!-- 2. MAIN CONTENT ROUTER                     -->
    <!-- ========================================== -->
    <main class="flex-grow-1 main-content">
      <router-view />
    </main>

    <!-- ========================================== -->
    <!-- 3. FOOTER SECTION                          -->
    <!-- ========================================== -->
    <FooterComponent />

    <!-- ========================================== -->
    <!-- 4. FLOATING SPACE MISSION GAME             -->
    <!-- ========================================== -->
    <!-- Available across all pages -->
    <SpaceMission />

  </div>
</template>

<script>
import NavbarComponent from './components/Navbar.vue'
import FooterComponent from './components/Footer.vue'
import SpaceMission from './components/SpaceMission.vue'

export default {
  name: 'App',
  components: {
    NavbarComponent,
    FooterComponent,
    SpaceMission
  }
}
</script>

<style>
/* =========================================
   GLOBAL STYLES & RESET
========================================= */

html {
  scroll-behavior: smooth;
}

body {
  background-color: #03050c;
  color: #ffffff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

/* Push content down to avoid overlapping with fixed Navbar */
.main-content {
  padding-top: 70px;
}
</style>