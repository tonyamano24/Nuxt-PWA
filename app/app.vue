<template>
  <div>
    <!-- Offline/Online Status Overlay -->
    <div v-if="showOfflineAlert" class="network-status-overlay">
      <div
        class="alert alert-danger d-flex align-items-center justify-content-center m-0"
        role="alert"
      >
        <i class="fas fa-wifi-slash me-2"></i>
        <strong>You are offline!</strong> Please check your internet connection.
      </div>
    </div>
    <div v-if="showOnlineAlert" class="network-status-overlay online">
      <div
        class="alert alert-success d-flex align-items-center justify-content-center m-0"
        role="alert"
      >
        <i class="fas fa-wifi me-2"></i>
        <strong>Back online!</strong> Your connection has been restored.
      </div>
    </div>

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
            <li class="nav-item">
              <NuxtLink to="/inventory" class="nav-link">
                <i class="fas fa-boxes"></i> Inventory
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
import { ref, onMounted, onUnmounted } from "vue";

const isOnline = ref(true);
const showOfflineAlert = ref(false);
const showOnlineAlert = ref(false);

const handleOnline = () => {
  isOnline.value = true;
  showOfflineAlert.value = false;
  showOnlineAlert.value = true;

  // Hide the online alert after 3 seconds
  setTimeout(() => {
    showOnlineAlert.value = false;
  }, 3000);
};

const handleOffline = () => {
  isOnline.value = false;
  showOnlineAlert.value = false;
  showOfflineAlert.value = true;
};

onMounted(() => {
  // Set initial state
  isOnline.value = navigator.onLine;
  showOfflineAlert.value = !navigator.onLine;

  // Add event listeners
  window.addEventListener("online", handleOnline);
  window.addEventListener("offline", handleOffline);
});

onUnmounted(() => {
  window.removeEventListener("online", handleOnline);
  window.removeEventListener("offline", handleOffline);
});

useHead({
  link: [
    {
      rel: "manifest",
      href: "/manifest.webmanifest",
    },
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
  meta: [
    { name: "theme-color", content: "#0d6efd" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "default" },
  ],
});
</script>

<style>
.network-status-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  animation: slideDown 0.3s ease-out;
}

.network-status-overlay .alert {
  border-radius: 0;
  padding: 15px;
  font-size: 16px;
}

.network-status-overlay.online .alert {
  animation: fadeOut 0.5s ease-out 2.5s forwards;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

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
