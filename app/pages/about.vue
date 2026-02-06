<template>
  <div class="about-page">
    <!-- Page Header -->
    <section class="page-header bg-primary text-white py-5">
      <div class="container">
        <h1 class="display-4"><i class="fas fa-info-circle"></i> About Us</h1>
        <p class="lead">Learn more about our mission and vision</p>
      </div>
    </section>

    <!-- About Content -->
    <section class="py-5">
      <div class="container">
        <div class="row align-items-center mb-5">
          <div class="col-lg-6">
            <h2 class="mb-4">Who We Are</h2>
            <p class="text-muted">
              We are a team of passionate developers and designers committed to
              creating exceptional Progressive Web Applications that deliver
              outstanding user experiences.
            </p>
            <p class="text-muted">
              Our mission is to bridge the gap between web and mobile
              applications, providing users with fast, reliable, and engaging
              experiences across all devices.
            </p>
          </div>
          <div class="col-lg-6">
            <div class="text-center">
              <i class="fas fa-users fa-10x text-primary opacity-25"></i>
            </div>
          </div>
        </div>

        <!-- Values Section -->
        <div class="row mt-5">
          <div class="col-12">
            <h2 class="text-center mb-5">Our Values</h2>
          </div>
          <div class="col-md-3">
            <div class="text-center p-4">
              <i class="fas fa-lightbulb fa-3x text-warning mb-3"></i>
              <h5>Innovation</h5>
              <p class="text-muted">Constantly pushing boundaries</p>
            </div>
          </div>
          <div class="col-md-3">
            <div class="text-center p-4">
              <i class="fas fa-heart fa-3x text-danger mb-3"></i>
              <h5>Passion</h5>
              <p class="text-muted">Loving what we do</p>
            </div>
          </div>
          <div class="col-md-3">
            <div class="text-center p-4">
              <i class="fas fa-star fa-3x text-primary mb-3"></i>
              <h5>Excellence</h5>
              <p class="text-muted">Striving for the best</p>
            </div>
          </div>
          <div class="col-md-3">
            <div class="text-center p-4">
              <i class="fas fa-handshake fa-3x text-success mb-3"></i>
              <h5>Collaboration</h5>
              <p class="text-muted">Working together</p>
            </div>
          </div>
        </div>

        <!-- Stats Section -->
        <div class="row mt-5 bg-light rounded p-5">
          <div class="col-md-4 text-center">
            <h2 class="text-primary">
              <i class="fas fa-project-diagram"></i> 100+
            </h2>
            <p class="text-muted">Projects Completed</p>
          </div>
          <div class="col-md-4 text-center">
            <h2 class="text-primary"><i class="fas fa-smile"></i> 500+</h2>
            <p class="text-muted">Happy Clients</p>
          </div>
          <div class="col-md-4 text-center">
            <h2 class="text-primary"><i class="fas fa-award"></i> 50+</h2>
            <p class="text-muted">Awards Won</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: "About Us - My PWA",
  meta: [
    { name: "description", content: "Learn more about our team and mission" },
  ],
});
</script>

<style scoped>
.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
</style>
