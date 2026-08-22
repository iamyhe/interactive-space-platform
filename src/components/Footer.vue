<template>
  <footer class="space-footer mt-auto">
    <div class="container d-flex flex-column flex-md-row justify-content-between align-items-center py-4">
      <div class="brand-section mb-3 mb-md-0">
        <div class="d-flex align-items-center mb-1">
          <img src="../assets/logo.png" alt="Space Logo" width="24" class="me-2">
          <span class="brand-text">SPACE EXPLORATION</span>
        </div>
        <small class="text-muted">Explore • Discover • Learn</small>
      </div>
      
      <div class="links-section mb-3 mb-md-0 d-flex flex-wrap justify-content-center">
        <router-link to="/" class="footer-link">Home</router-link>
        <router-link to="/planets" class="footer-link">Planets</router-link>
        <router-link to="/mars" class="footer-link">Mars</router-link>
        <router-link to="/apod" class="footer-link">APOD</router-link>
        <router-link to="/weather" class="footer-link">Weather</router-link>
        <router-link to="/search" class="footer-link">Search</router-link>
        <router-link to="/favorites" class="footer-link">Favorites</router-link>
      </div>

      <div class="copyright text-muted">
        <small>© 2026 Space Exploration Team</small>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent'
}
</script>

<style scoped>
.space-footer {
  background-color: #050814;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
.brand-text {
  font-weight: 600;
  letter-spacing: 1px;
  color: #fff;
}
.text-muted {
  color: rgba(255, 255, 255, 0.4) !important;
}
.footer-link {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  margin: 0 10px;
  font-size: 0.85rem;
  transition: 0.3s;
}
.footer-link:hover {
  color: #fff;
}
</style>