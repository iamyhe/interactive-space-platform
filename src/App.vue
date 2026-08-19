<template>
  <div id="app-container" class="d-flex flex-column min-vh-100">
    <NavbarComponent />
    
    <main class="flex-grow-1 main-content">
      <router-view />
    </main>

    <FooterComponent />
  </div>
</template>

<script>
import NavbarComponent from './components/Navbar.vue'
import FooterComponent from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    NavbarComponent,
    FooterComponent
  }
}
</script>

<style>
/* Smooth scrolling for anchor links */
html {
  scroll-behavior: smooth;
}

/* Global dark theme reset */
body {
  background-color: #03050c;
  color: #ffffff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

.main-content {
  padding-top: 70px;
}
</style>