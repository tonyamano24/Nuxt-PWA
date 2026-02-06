<template>
  <div class="profile-page">
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
                <div class="mb-3">
                  <i class="fas fa-user-circle fa-10x text-primary"></i>
                </div>
                <h4 class="card-title mb-2">John Doe</h4>
                <p class="text-muted mb-3">
                  <i class="fas fa-envelope"></i> john.doe@example.com
                </p>
                <button class="btn btn-primary w-100 mb-2">
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
                <form>
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
                      >
Passionate developer and tech enthusiast.</textarea
                      >
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
              <button class="btn btn-outline-danger btn-lg">
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
const DB_NAME = "pwa_db";
const DB_VERSION = 1;
const STORE_NAME = "profile";
const statusMessage = ref(null);

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

const formData = reactive({
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "0123-123123",
  bio: "test",
  notifications: true,
  newsletter: true,
  darkMode: true,
});

const saveProfile = async () => {
  await saveToIndexedDB({ ...formData });
  showStatus(
    "Profile saved successfully!",
    "alert-success",
    "fas fa-check-circle",
  );
};

const showStatus = (text, type, icon) => {
  statusMessage.value = { text, type, icon };
  setTimeout(() => {
    statusMessage.value = null;
  }, 3000);
};

useHead({
  title: "Profile - My PWA",
  meta: [{ name: "description", content: "Manage your user profile" }],
});

async function getContactById(contactId) {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const req = tx.objectStore(STORE_NAME).get(contactId);
  return new Promise((resolve) => {
    req.onsuccess = () => resolve(req.result);
  });
}

async function loadFormIndexedDB() {
  const user = await getContactById(1);
  for (const key in formData) {
    if (user && user[key] !== undefined) {
      formData[key] = user[key];
    }
  }
}
loadFormIndexedDB();
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
</style>
