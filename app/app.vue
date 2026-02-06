<template>
  <div>
    <!-- Navigation Bar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <NuxtLink to="/" class="navbar-brand">
          <i class="fas fa-home"></i> My PWA
        </NuxtLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <NuxtLink to="/" class="nav-link">
                <i class="fas fa-home"></i> Home
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/about" class="nav-link">
                <i class="fas fa-info-circle"></i> About Us
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/contact" class="nav-link">
                <i class="fas fa-envelope"></i> Contact Us
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/profile" class="nav-link">
                <i class="fas fa-user"></i> Profile
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Page Content -->
    <NuxtPage />
  </div>
</template>

<script setup>
useHead({
  link: [
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",
    },
    {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
    },
  ],
  script: [
    {
      src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js",
      body: true,
    },
  ],
});
</script>

<style>
.nav-link {
  transition: all 0.3s;
}

.nav-link:hover {
  transform: translateY(-2px);
}

.router-link-active {
  font-weight: bold;
}
</style>
