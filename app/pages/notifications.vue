<template>
  <div class="notifications-page">
    <!-- Page Header -->
    <section class="page-header bg-primary text-white py-5">
      <div class="container">
        <h1 class="display-4">
          <i class="fas fa-bell"></i> Notifications Demo
        </h1>
        <p class="lead">Learn how PWA notifications work</p>
      </div>
    </section>

    <!-- Notification Content -->
    <section class="py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <!-- Permission Status -->
            <div class="card shadow mb-4">
              <div class="card-header bg-info text-white">
                <h5 class="mb-0">
                  <i class="fas fa-shield-alt me-2"></i>Permission Status
                </h5>
              </div>
              <div class="card-body text-center">
                <div
                  v-if="permissionStatus === 'granted'"
                  class="alert alert-success"
                >
                  <i class="fas fa-check-circle fa-2x mb-2"></i>
                  <h5>Notifications Enabled</h5>
                  <p class="mb-0">
                    You will receive notifications from this app.
                  </p>
                </div>
                <div
                  v-else-if="permissionStatus === 'denied'"
                  class="alert alert-danger"
                >
                  <i class="fas fa-times-circle fa-2x mb-2"></i>
                  <h5>Notifications Blocked</h5>
                  <p class="mb-0">
                    Please enable notifications in browser settings.
                  </p>
                </div>
                <div v-else class="alert alert-warning">
                  <i class="fas fa-question-circle fa-2x mb-2"></i>
                  <h5>Permission Required</h5>
                  <p class="mb-0">
                    Click the button below to enable notifications.
                  </p>
                </div>

                <button
                  v-if="permissionStatus !== 'granted'"
                  @click="requestPermission"
                  class="btn btn-primary btn-lg mt-3"
                  :disabled="permissionStatus === 'denied'"
                >
                  <i class="fas fa-bell me-2"></i>Enable Notifications
                </button>
              </div>
            </div>

            <!-- Test Notifications -->
            <div class="card shadow mb-4" v-if="permissionStatus === 'granted'">
              <div class="card-header bg-success text-white">
                <h5 class="mb-0">
                  <i class="fas fa-paper-plane me-2"></i>Test Notifications
                </h5>
              </div>
              <div class="card-body">
                <p class="text-muted mb-4">
                  Click any button below to send a test notification.
                  <strong>Click the notification</strong> to navigate to the
                  specified page.
                </p>

                <div class="row g-3">
                  <!-- Notification 1: Go to Home -->
                  <div class="col-md-6">
                    <div class="card h-100 border-primary">
                      <div class="card-body text-center">
                        <i class="fas fa-home fa-3x text-primary mb-3"></i>
                        <h6>Welcome Notification</h6>
                        <p class="small text-muted">Clicks → Home Page</p>
                        <button
                          @click="sendNotification('home')"
                          class="btn btn-outline-primary"
                        >
                          <i class="fas fa-bell me-1"></i>Send
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Notification 2: Go to Profile -->
                  <div class="col-md-6">
                    <div class="card h-100 border-success">
                      <div class="card-body text-center">
                        <i class="fas fa-user fa-3x text-success mb-3"></i>
                        <h6>Profile Update</h6>
                        <p class="small text-muted">Clicks → Profile Page</p>
                        <button
                          @click="sendNotification('profile')"
                          class="btn btn-outline-success"
                        >
                          <i class="fas fa-bell me-1"></i>Send
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Notification 3: Go to Inventory -->
                  <div class="col-md-6">
                    <div class="card h-100 border-warning">
                      <div class="card-body text-center">
                        <i class="fas fa-boxes fa-3x text-warning mb-3"></i>
                        <h6>New Product Alert</h6>
                        <p class="small text-muted">Clicks → Inventory Page</p>
                        <button
                          @click="sendNotification('inventory')"
                          class="btn btn-outline-warning"
                        >
                          <i class="fas fa-bell me-1"></i>Send
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Notification 4: Go to Contact -->
                  <div class="col-md-6">
                    <div class="card h-100 border-info">
                      <div class="card-body text-center">
                        <i class="fas fa-envelope fa-3x text-info mb-3"></i>
                        <h6>New Message</h6>
                        <p class="small text-muted">Clicks → Contact Page</p>
                        <button
                          @click="sendNotification('contact')"
                          class="btn btn-outline-info"
                        >
                          <i class="fas fa-bell me-1"></i>Send
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- How It Works -->
            <div class="card shadow">
              <div class="card-header bg-dark text-white">
                <h5 class="mb-0">
                  <i class="fas fa-code me-2"></i>How It Works
                </h5>
              </div>
              <div class="card-body">
                <div class="accordion" id="howItWorks">
                  <!-- Step 1 -->
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#step1"
                      >
                        <strong>Step 1:</strong>&nbsp;Request Permission
                      </button>
                    </h2>
                    <div
                      id="step1"
                      class="accordion-collapse collapse show"
                      data-bs-parent="#howItWorks"
                    >
                      <div class="accordion-body">
                        <pre
                          class="bg-dark text-light p-3 rounded"
                        ><code>const permission = await Notification.requestPermission()
// Returns: 'granted', 'denied', or 'default'</code></pre>
                      </div>
                    </div>
                  </div>

                  <!-- Step 2 -->
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#step2"
                      >
                        <strong>Step 2:</strong>&nbsp;Show Notification via
                        Service Worker
                      </button>
                    </h2>
                    <div
                      id="step2"
                      class="accordion-collapse collapse"
                      data-bs-parent="#howItWorks"
                    >
                      <div class="accordion-body">
                        <pre
                          class="bg-dark text-light p-3 rounded"
                        ><code>const registration = await navigator.serviceWorker.ready
registration.showNotification('Title', {
  body: 'Message body',
  icon: '/icon-192.png',
  data: { url: '/profile' }  // ← Page to open
})</code></pre>
                      </div>
                    </div>
                  </div>

                  <!-- Step 3 -->
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#step3"
                      >
                        <strong>Step 3:</strong>&nbsp;Handle Click in Service
                        Worker
                      </button>
                    </h2>
                    <div
                      id="step3"
                      class="accordion-collapse collapse"
                      data-bs-parent="#howItWorks"
                    >
                      <div class="accordion-body">
                        <pre
                          class="bg-dark text-light p-3 rounded"
                        ><code>self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const url = event.notification.data?.url || '/'
  event.waitUntil(
    clients.openWindow(url)
  )
})</code></pre>
                      </div>
                    </div>
                  </div>
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
import { ref, onMounted } from "vue";

const permissionStatus = ref("default");

// Notification configurations
const notifications = {
  home: {
    title: "👋 Welcome Back!",
    body: "Click here to go to the Home page.",
    icon: "/icon-192.png",
    url: "/",
  },
  profile: {
    title: "👤 Profile Update",
    body: "Your profile has been updated. Click to view.",
    icon: "/icon-192.png",
    url: "/profile",
  },
  inventory: {
    title: "📦 New Product Available!",
    body: "10 new items added to inventory. Check them out!",
    icon: "/icon-192.png",
    url: "/inventory",
  },
  contact: {
    title: "✉️ New Message Received",
    body: "You have a new message. Click to respond.",
    icon: "/icon-192.png",
    url: "/contact",
  },
};

// Check current permission status
const checkPermission = () => {
  if ("Notification" in window) {
    permissionStatus.value = Notification.permission;
  }
};

// Request notification permission
const requestPermission = async () => {
  if (!("Notification" in window)) {
    alert("This browser does not support notifications");
    return;
  }

  try {
    const permission = await Notification.requestPermission();
    permissionStatus.value = permission;

    if (permission === "granted") {
      // Send a welcome notification
      sendNotification("home");
    }
  } catch (error) {
    console.error("Error requesting permission:", error);
  }
};

// Send notification using Service Worker
const sendNotification = async (type) => {
  if (permissionStatus.value !== "granted") {
    alert("Please enable notifications first");
    return;
  }

  const config = notifications[type];

  try {
    // Use Service Worker to show notification (required for click handling)
    const registration = await navigator.serviceWorker.ready;

    await registration.showNotification(config.title, {
      body: config.body,
      icon: config.icon,
      badge: "/icon-192.png",
      vibrate: [200, 100, 200],
      tag: `notification-${type}`, // Prevents duplicate notifications
      renotify: true,
      requireInteraction: false,
      data: {
        url: config.url, // ← This URL will be used when clicking
        type: type,
      },
    });

    console.log(`Notification sent: ${type} → ${config.url}`);
  } catch (error) {
    console.error("Error sending notification:", error);

    // Fallback: Use basic Notification API (won't support click-to-navigate)
    new Notification(config.title, {
      body: config.body,
      icon: config.icon,
    });
  }
};

onMounted(() => {
  checkPermission();
});

useHead({
  title: "Notifications - PWA Demo",
  meta: [{ name: "description", content: "PWA Notifications Demo" }],
});
</script>

<style scoped>
.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card {
  border: none;
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-2px);
}

.accordion-button:not(.collapsed) {
  background-color: #e7f1ff;
  color: #0c63e4;
}

pre {
  margin: 0;
  font-size: 0.85rem;
  overflow-x: auto;
}

code {
  font-family: "Courier New", monospace;
}
</style>
