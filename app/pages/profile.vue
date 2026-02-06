<template>
  <div class="profile-page">
    <!-- Camera Modal -->
    <div
      v-if="showCameraModal"
      class="camera-modal-overlay"
      @click.self="closeCameraModal"
    >
      <div class="camera-modal">
        <div class="camera-modal-header">
          <h5><i class="fas fa-camera"></i> Take Photo</h5>
          <button class="btn-close" @click="closeCameraModal"></button>
        </div>
        <div class="camera-modal-body">
          <video
            ref="videoElement"
            autoplay
            playsinline
            class="camera-preview"
          ></video>
          <canvas ref="canvasElement" style="display: none"></canvas>
        </div>
        <div class="camera-modal-footer">
          <button class="btn btn-danger" @click="closeCameraModal">
            <i class="fas fa-times"></i> Cancel
          </button>
          <button class="btn btn-success" @click="capturePhoto">
            <i class="fas fa-camera"></i> Capture
          </button>
        </div>
      </div>
    </div>

    <!-- Page Header -->
    <section class="page-header bg-primary text-white py-5">
      <div class="container">
        <h1 class="display-4"><i class="fas fa-user"></i> User Profile</h1>
        <p class="lead">Manage your account information</p>
      </div>
    </section>

    <!-- Profile Content -->
    <section class="py-5">
      <div class="container">
        <div class="row">
          <!-- Profile Card -->
          <div class="col-lg-4 mb-4">
            <div class="card shadow text-center">
              <div class="card-body p-4">
                <div class="mb-3 profile-photo-container">
                  <img
                    v-if="formData.photo"
                    :src="formData.photo"
                    alt="Profile Photo"
                    class="profile-photo rounded-circle"
                  />
                  <i v-else class="fas fa-user-circle fa-10x text-primary"></i>
                </div>
                <h4 class="card-title mb-2">
                  {{ formData.firstName }} {{ formData.lastName }}
                </h4>
                <p class="text-muted mb-3">
                  <i class="fas fa-envelope"></i> {{ formData.email }}
                </p>
                <button class="btn btn-primary w-100 mb-2" @click="openCamera">
                  <i class="fas fa-camera"></i> Change Photo
                </button>
                <button class="btn btn-outline-secondary w-100">
                  <i class="fas fa-edit"></i> Edit Profile
                </button>
              </div>
            </div>

            <!-- Stats Card -->
            <div class="card shadow mt-4">
              <div class="card-body">
                <h5 class="card-title mb-4">
                  <i class="fas fa-chart-line"></i> Activity Stats
                </h5>
                <div class="d-flex justify-content-between mb-3">
                  <span><i class="fas fa-tasks text-primary"></i> Tasks</span>
                  <strong>24</strong>
                </div>
                <div class="d-flex justify-content-between mb-3">
                  <span
                    ><i class="fas fa-project-diagram text-success"></i>
                    Projects</span
                  >
                  <strong>8</strong>
                </div>
                <div class="d-flex justify-content-between">
                  <span
                    ><i class="fas fa-trophy text-warning"></i>
                    Achievements</span
                  >
                  <strong>15</strong>
                </div>
              </div>
            </div>
          </div>

          <!-- Profile Information -->
          <div class="col-lg-8">
            <!-- Personal Information -->
            <div class="card shadow mb-4">
              <div class="card-header bg-primary text-white">
                <h5 class="mb-0">
                  <i class="fas fa-id-card"></i> Personal Information
                </h5>
              </div>
              <div class="card-body">
                <form @submit.prevent="saveProfile">
                  <div class="row g-3">
                    <div class="col-md-6">
                      <label for="firstName" class="form-label"
                        >First Name</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="firstName"
                        v-model="formData.firstName"
                      />
                    </div>
                    <div class="col-md-6">
                      <label for="lastName" class="form-label">Last Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="lastName"
                        v-model="formData.lastName"
                      />
                    </div>
                    <div class="col-md-6">
                      <label for="email" class="form-label">Email</label>
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        v-model="formData.email"
                      />
                    </div>
                    <div class="col-md-6">
                      <label for="phone" class="form-label">Phone</label>
                      <input
                        type="tel"
                        class="form-control"
                        id="phone"
                        v-model="formData.phone"
                      />
                    </div>
                    <div class="col-12">
                      <label for="bio" class="form-label">Bio</label>
                      <textarea
                        class="form-control"
                        id="bio"
                        rows="3"
                        v-model="formData.bio"
                      ></textarea>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <!-- Account Settings -->
            <div class="card shadow mb-4">
              <div class="card-header bg-primary text-white">
                <h5 class="mb-0">
                  <i class="fas fa-cog"></i> Account Settings
                </h5>
              </div>
              <div class="card-body">
                <div class="row g-3">
                  <div class="col-12">
                    <div class="form-check form-switch">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="notifications"
                        v-model="formData.notifications"
                      />
                      <label class="form-check-label" for="notifications">
                        <i class="fas fa-bell"></i> Email Notifications
                      </label>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-check form-switch">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="newsletter"
                        v-model="formData.newsletter"
                      />
                      <label class="form-check-label" for="newsletter">
                        <i class="fas fa-newspaper"></i> Newsletter Subscription
                      </label>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-check form-switch">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="darkMode"
                        v-model="formData.darkMode"
                      />
                      <label class="form-check-label" for="darkMode">
                        <i class="fas fa-moon"></i> Dark Mode
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Status Message -->
            <div
              v-if="statusMessage"
              :class="['alert', statusMessage.type, 'mb-3']"
              role="alert"
            >
              <i :class="statusMessage.icon"></i> {{ statusMessage.text }}
            </div>

            <!-- Action Buttons -->
            <div class="d-flex gap-3">
              <button class="btn btn-success btn-lg" @click="saveProfile">
                <i class="fas fa-save"></i> Save Changes
              </button>
              <button
                class="btn btn-outline-danger btn-lg"
                @click="cancelProfile"
              >
                <i class="fas fa-times"></i> Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";

const DB_NAME = "PWAProfileDB";
const DB_VERSION = 1;
const STORE_NAME = "profile";

const formData = reactive({
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  bio: "Passionate developer and tech enthusiast.",
  notifications: true,
  newsletter: true,
  darkMode: false,
  photo: null,
});

const statusMessage = ref(null);

// Camera refs and state
const showCameraModal = ref(false);
const videoElement = ref(null);
const canvasElement = ref(null);
let mediaStream = null;

// Open camera and request permission
const openCamera = async () => {
  try {
    // Request camera permission
    mediaStream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
        width: { ideal: 640 },
        height: { ideal: 480 },
      },
    });

    showCameraModal.value = true;

    // Wait for DOM to update then attach stream to video
    setTimeout(() => {
      if (videoElement.value) {
        videoElement.value.srcObject = mediaStream;
      }
    }, 100);
  } catch (error) {
    if (error.name === "NotAllowedError") {
      showStatus(
        "Camera permission denied. Please allow camera access.",
        "alert-danger",
        "fas fa-exclamation-circle",
      );
    } else if (error.name === "NotFoundError") {
      showStatus(
        "No camera found on this device.",
        "alert-danger",
        "fas fa-exclamation-circle",
      );
    } else {
      showStatus(
        "Failed to access camera. Please try again.",
        "alert-danger",
        "fas fa-exclamation-circle",
      );
    }
    console.error("Camera error:", error);
  }
};

// Capture photo from video stream
const capturePhoto = () => {
  if (!videoElement.value || !canvasElement.value) return;

  const video = videoElement.value;
  const canvas = canvasElement.value;

  // Set canvas size to match video
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // Draw video frame to canvas
  const context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Convert to base64 image
  formData.photo = canvas.toDataURL("image/jpeg", 0.8);

  showStatus(
    "Photo captured! Click Save to store it.",
    "alert-success",
    "fas fa-check-circle",
  );
  closeCameraModal();
};

// Close camera modal and stop stream
const closeCameraModal = () => {
  showCameraModal.value = false;
  stopCameraStream();
};

// Stop camera stream
const stopCameraStream = () => {
  if (mediaStream) {
    mediaStream.getTracks().forEach((track) => track.stop());
    mediaStream = null;
  }
};

// Open IndexedDB database
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
  });
};

// Save profile to IndexedDB
const saveToIndexedDB = async (data) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put({ id: 1, ...data });

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);

    transaction.oncomplete = () => db.close();
  });
};

// Get profile from IndexedDB
const getFromIndexedDB = async () => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(1);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);

    transaction.oncomplete = () => db.close();
  });
};

// Delete profile from IndexedDB
const deleteFromIndexedDB = async () => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(1);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);

    transaction.oncomplete = () => db.close();
  });
};

// Show status message
const showStatus = (text, type, icon) => {
  statusMessage.value = { text, type, icon };
  setTimeout(() => {
    statusMessage.value = null;
  }, 3000);
};

// Save profile handler
const saveProfile = async () => {
  try {
    await saveToIndexedDB({ ...formData });
    showStatus(
      "Profile saved successfully!",
      "alert-success",
      "fas fa-check-circle",
    );
    console.log("Profile saved to IndexedDB:", formData);
  } catch (error) {
    showStatus(
      "Failed to save profile. Please try again.",
      "alert-danger",
      "fas fa-exclamation-circle",
    );
    console.error("Error saving to IndexedDB:", error);
  }
};

// Cancel profile handler - removes from IndexedDB and resets form
const cancelProfile = async () => {
  try {
    await deleteFromIndexedDB();

    // Reset to default values
    formData.firstName = "";
    formData.lastName = "";
    formData.email = "";
    formData.phone = "";
    formData.bio = "";
    formData.notifications = false;
    formData.newsletter = false;
    formData.darkMode = false;
    formData.photo = null;

    showStatus(
      "Profile data removed from storage.",
      "alert-warning",
      "fas fa-trash-alt",
    );
    console.log("Profile removed from IndexedDB");
  } catch (error) {
    showStatus(
      "Failed to remove profile data.",
      "alert-danger",
      "fas fa-exclamation-circle",
    );
    console.error("Error deleting from IndexedDB:", error);
  }
};

// Load profile on mount
onMounted(async () => {
  try {
    const savedProfile = await getFromIndexedDB();
    if (savedProfile) {
      formData.firstName = savedProfile.firstName || formData.firstName;
      formData.lastName = savedProfile.lastName || formData.lastName;
      formData.email = savedProfile.email || formData.email;
      formData.phone = savedProfile.phone || formData.phone;
      formData.bio = savedProfile.bio || formData.bio;
      formData.notifications =
        savedProfile.notifications ?? formData.notifications;
      formData.newsletter = savedProfile.newsletter ?? formData.newsletter;
      formData.darkMode = savedProfile.darkMode ?? formData.darkMode;
      formData.photo = savedProfile.photo || null;
      console.log("Profile loaded from IndexedDB:", savedProfile);
    }
  } catch (error) {
    console.error("Error loading from IndexedDB:", error);
  }
});

// Cleanup on unmount
onUnmounted(() => {
  stopCameraStream();
});

useHead({
  title: "Profile - My PWA",
  meta: [{ name: "description", content: "Manage your user profile" }],
});
</script>

<style scoped>
.page-header {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.card {
  border: none;
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-5px);
}

.form-check-input:checked {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

/* Profile Photo */
.profile-photo-container {
  position: relative;
}

.profile-photo {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border: 4px solid #0d6efd;
}

/* Camera Modal */
.camera-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.camera-modal {
  background: white;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.camera-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: #0d6efd;
  color: white;
}

.camera-modal-header h5 {
  margin: 0;
}

.camera-modal-header .btn-close {
  filter: brightness(0) invert(1);
}

.camera-modal-body {
  padding: 0;
  background: #000;
}

.camera-preview {
  width: 100%;
  display: block;
  max-height: 400px;
  object-fit: cover;
}

.camera-modal-footer {
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  background: #f8f9fa;
}
</style>
