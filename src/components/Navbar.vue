<template>
  <nav class="navbar navbar-expand-lg navbar-dark space-navbar fixed-top">
    <div class="container">
      <router-link class="navbar-brand d-flex align-items-center" to="/">
        <img src="../assets/logo.png" alt="Space Logo" width="30" class="me-2">
        <span class="brand-text">SPACE EXPLORATION</span>
      </router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item"><router-link class="nav-link" to="/">Home</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/planets">Planets</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/mars">Mars</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/apod">APOD</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/weather">Weather</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/search">Search</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/favorites">Favorites</router-link></li>
        </ul>
      </div>

      <div class="d-none d-lg-block">
        <router-link to="/planets" class="btn explore-btn">EXPLORE</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavbarComponent'
}
</script>

<style scoped>
.space-navbar {
  background-color: rgba(5, 8, 20, 0.85);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 15px 0;
}
.brand-text {
  font-weight: 600;
  letter-spacing: 2px;
  color: #fff;
  font-size: 1rem;
}
.nav-link {
  color: rgba(255, 255, 255, 0.7) !important;
  margin: 0 12px;
  font-size: 0.9rem;
  transition: 0.3s ease-in-out;
}
.nav-link:hover, .nav-link.router-link-exact-active {
  color: #fff !important;
  border-bottom: 2px solid #5a4fcf;
}
.explore-btn {
  border-radius: 25px;
  border: 1px solid #5a4fcf;
  color: #fff;
  background-color: transparent;
  padding: 6px 24px;
  font-size: 0.9rem;
  text-decoration: none;
  transition: 0.3s;
}
.explore-btn:hover {
  background-color: #5a4fcf;
  box-shadow: 0 0 15px rgba(90, 79, 207, 0.6);
  color: #fff;
}
</style>