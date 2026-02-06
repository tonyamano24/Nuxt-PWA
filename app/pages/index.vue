<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero bg-primary text-white text-center py-5">
      <div class="container">
        <h1 class="display-4 mb-4">
          <i class="fas fa-rocket"></i> Welcome to Our PWA
        </h1>
        <p class="lead mb-4">
          Experience the power of Progressive Web Applications
        </p>
        <NuxtLink to="/about" class="btn btn-light btn-lg">
          <i class="fas fa-arrow-right"></i> Learn More
        </NuxtLink>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features py-5">
      <div class="container">
        <h2 class="text-center mb-5">Our Features</h2>
        <div class="row g-4">
          <div class="col-md-4">
            <div class="card h-100 text-center shadow-sm">
              <div class="card-body">
                <i class="fas fa-bolt fa-3x text-primary mb-3"></i>
                <h5 class="card-title">Lightning Fast</h5>
                <p class="card-text">
                  Experience blazing fast performance with our optimized PWA.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card h-100 text-center shadow-sm">
              <div class="card-body">
                <i class="fas fa-mobile-alt fa-3x text-success mb-3"></i>
                <h5 class="card-title">Mobile Friendly</h5>
                <p class="card-text">
                  Fully responsive design that works on all devices.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card h-100 text-center shadow-sm">
              <div class="card-body">
                <i class="fas fa-shield-alt fa-3x text-danger mb-3"></i>
                <h5 class="card-title">Secure</h5>
                <p class="card-text">
                  Built with security best practices in mind.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="cta bg-light py-5">
      <div class="container text-center">
        <h3 class="mb-4">Ready to Get Started?</h3>
        <div class="d-flex justify-content-center gap-3">
          <NuxtLink to="/contact" class="btn btn-primary btn-lg">
            <i class="fas fa-envelope"></i> Contact Us
          </NuxtLink>
          <NuxtLink to="/profile" class="btn btn-outline-primary btn-lg">
            <i class="fas fa-user"></i> View Profile
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: "Home - My PWA",
  meta: [
    {
      name: "description",
      content: "Welcome to our Progressive Web Application",
    },
  ],
});
</script>

<style scoped>
.hero {
  min-height: 400px;
  display: flex;
  align-items: center;
}

.card {
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-10px);
}
</style>
