<template>
  <div class="maps-page">
    <!-- Page Header -->
    <section class="page-header bg-primary text-white py-5">
      <div class="container">
        <h1 class="display-4"><i class="fas fa-map-marker-alt"></i> Maps</h1>
        <p class="lead">Find your current location</p>
      </div>
    </section>

    <!-- Location Content -->
    <section class="py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 mx-auto">
            <div class="card shadow">
              <div class="card-header bg-primary text-white">
                <h5 class="mb-0">
                  <i class="fas fa-location-arrow"></i> Your Location
                </h5>
              </div>
              <div class="card-body">
                <!-- Loading State -->
                <div v-if="loading" class="text-center py-4">
                  <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <p class="mt-3 text-muted">Getting your location...</p>
                </div>

                <!-- Error State -->
                <div v-else-if="error" class="alert alert-danger" role="alert">
                  <i class="fas fa-exclamation-triangle me-2"></i>
                  {{ error }}
                </div>

                <!-- Location Data -->
                <div v-else-if="location" class="text-center">
                  <div class="row g-3">
                    <div class="col-md-6">
                      <div class="p-3 bg-light rounded">
                        <h6 class="text-muted mb-1">Latitude</h6>
                        <h4 class="mb-0">{{ location.latitude.toFixed(6) }}</h4>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="p-3 bg-light rounded">
                        <h6 class="text-muted mb-1">Longitude</h6>
                        <h4 class="mb-0">
                          {{ location.longitude.toFixed(6) }}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Request Permission Button -->
                <div v-else class="text-center py-4">
                  <button
                    class="btn btn-primary btn-lg"
                    @click="requestLocation"
                  >
                    <i class="fas fa-location-arrow"></i> Get My Location
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";

const location = ref(null);
const loading = ref(false);
const error = ref(null);

const requestLocation = async () => {
  loading.value = true;
  error.value = null;

  if (!navigator.geolocation) {
    error.value = "Geolocation is not supported by your browser.";
    loading.value = false;
    return;
  }

  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      });
    });

    location.value = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
  } catch (err) {
    if (err.code === err.PERMISSION_DENIED) {
      error.value = "Location permission denied.";
    } else {
      error.value = "Could not get your location.";
    }
  } finally {
    loading.value = false;
  }
};

useHead({
  title: "Maps - My PWA",
  meta: [{ name: "description", content: "Find your current location" }],
});
</script>

<style scoped>
.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card {
  border: none;
}

h4 {
  font-family: "Courier New", monospace;
  font-weight: bold;
}
</style>
