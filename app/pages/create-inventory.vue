<template>
  <div class="create-inventory-page">
    <!-- Page Header -->
    <section class="page-header bg-primary text-white py-5">
      <div class="container">
        <h1 class="display-4">
          <i class="fas fa-plus-circle"></i> Create Inventory
        </h1>
        <p class="lead">Add new products to inventory</p>
      </div>
    </section>

    <!-- Create Form -->
    <section class="py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 mx-auto">
            <!-- Form Card -->
            <div class="card shadow mb-4">
              <div class="card-header bg-primary text-white">
                <h5 class="mb-0"><i class="fas fa-box"></i> New Product</h5>
              </div>
              <div class="card-body">
                <!-- Status Message -->
                <div
                  v-if="statusMessage"
                  :class="['alert', statusMessage.type, 'mb-3']"
                  role="alert"
                >
                  <i :class="statusMessage.icon"></i> {{ statusMessage.text }}
                </div>

                <form @submit.prevent="submitProduct">
                  <div class="mb-3">
                    <label for="name" class="form-label">
                      <i class="fas fa-tag"></i> Product Name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="name"
                      v-model="formData.name"
                      placeholder="Enter product name"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="price" class="form-label">
                      <i class="fas fa-dollar-sign"></i> Price
                    </label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      v-model.number="formData.price"
                      placeholder="Enter price"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    class="btn btn-success btn-lg w-100"
                    :disabled="submitting"
                  >
                    <span v-if="submitting">
                      <span
                        class="spinner-border spinner-border-sm me-2"
                      ></span>
                      Submitting...
                    </span>
                    <span v-else>
                      <i class="fas fa-paper-plane"></i> Submit
                    </span>
                  </button>
                </form>
              </div>
            </div>

            <!-- Pending/Completed Items List -->
            <div class="card shadow">
              <div
                class="card-header bg-secondary text-white d-flex justify-content-between align-items-center"
              >
                <h5 class="mb-0"><i class="fas fa-list"></i> Sync Queue</h5>
                <span class="badge bg-light text-dark"
                  >{{ pendingItems.length }} items</span
                >
              </div>
              <div class="card-body p-0">
                <div
                  v-if="pendingItems.length === 0"
                  class="text-center py-4 text-muted"
                >
                  <i class="fas fa-inbox fa-2x mb-2"></i>
                  <p class="mb-0">No items in queue</p>
                </div>
                <ul v-else class="list-group list-group-flush">
                  <li
                    v-for="item in pendingItems"
                    :key="item.id"
                    class="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{{ item.name }}</strong>
                      <br />
                      <small class="text-muted"
                        >${{ item.price.toFixed(2) }}</small
                      >
                    </div>
                    <div class="d-flex align-items-center gap-2">
                      <span
                        :class="[
                          'badge',
                          item.status === 'pending'
                            ? 'bg-warning text-dark'
                            : 'bg-success',
                        ]"
                      >
                        <i
                          :class="
                            item.status === 'pending'
                              ? 'fas fa-clock'
                              : 'fas fa-check'
                          "
                        ></i>
                        {{ item.status }}
                      </span>
                      <button
                        v-if="item.status === 'pending'"
                        class="btn btn-outline-danger btn-sm"
                        @click="deleteItem(item.id)"
                      >
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="card-footer">
                <button
                  class="btn btn-primary btn-sm"
                  @click="syncNow"
                  :disabled="
                    !isOnline ||
                    pendingItems.filter((i) => i.status === 'pending')
                      .length === 0
                  "
                >
                  <i class="fas fa-sync"></i> Sync Now
                </button>
                <button
                  class="btn btn-outline-secondary btn-sm ms-2"
                  @click="loadPendingItems"
                >
                  <i class="fas fa-redo"></i> Refresh
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";

const DB_NAME = "PWAInventoryDB";
const DB_VERSION = 1;
const STORE_NAME = "pendingProducts";
const API_URL = "http://localhost:5051/api/v1/inventories";

const formData = reactive({
  name: "",
  price: null,
});

const pendingItems = ref([]);
const statusMessage = ref(null);
const submitting = ref(false);
const isOnline = ref(true);

// Open IndexedDB database
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
        store.createIndex("status", "status", { unique: false });
      }
    };
  });
};

// Save product to IndexedDB
const saveToIndexedDB = async (product) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.add({
      ...product,
      status: "pending",
      createdAt: new Date().toISOString(),
    });

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);

    transaction.oncomplete = () => db.close();
  });
};

// Get all items from IndexedDB
const getAllFromIndexedDB = async () => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);

    transaction.oncomplete = () => db.close();
  });
};

// Update item status in IndexedDB
const updateStatusInIndexedDB = async (id, status) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const getRequest = store.get(id);

    getRequest.onsuccess = () => {
      const item = getRequest.result;
      if (item) {
        item.status = status;
        item.syncedAt = new Date().toISOString();
        store.put(item);
      }
      resolve();
    };
    getRequest.onerror = () => reject(getRequest.error);

    transaction.oncomplete = () => db.close();
  });
};

// Delete item from IndexedDB
const deleteFromIndexedDB = async (id) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);

    transaction.oncomplete = () => db.close();
  });
};

// Load pending items
const loadPendingItems = async () => {
  try {
    pendingItems.value = await getAllFromIndexedDB();
    pendingItems.value.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
  } catch (error) {
    console.error("Error loading pending items:", error);
  }
};

// Show status message
const showStatus = (text, type, icon) => {
  statusMessage.value = { text, type, icon };
  setTimeout(() => {
    statusMessage.value = null;
  }, 4000);
};

// Submit product
const submitProduct = async () => {
  if (!formData.name || formData.price === null) return;

  submitting.value = true;

  const product = {
    name: formData.name,
    price: formData.price,
  };

  try {
    // Save to IndexedDB first
    await saveToIndexedDB(product);
    await loadPendingItems();

    // Reset form
    formData.name = "";
    formData.price = null;

    if (isOnline.value) {
      // Try to sync immediately if online
      showStatus(
        "Product saved! Syncing...",
        "alert-info",
        "fas fa-sync fa-spin",
      );
      await syncPendingItems();
    } else {
      // Register for background sync if offline
      showStatus(
        "Saved offline! Will sync when online.",
        "alert-warning",
        "fas fa-cloud-upload-alt",
      );
      await registerBackgroundSync();
    }
  } catch (error) {
    console.error("Error submitting product:", error);
    showStatus(
      "Error saving product.",
      "alert-danger",
      "fas fa-exclamation-circle",
    );
  } finally {
    submitting.value = false;
  }
};

// Register background sync
const registerBackgroundSync = async () => {
  if (
    "serviceWorker" in navigator &&
    "sync" in ServiceWorkerRegistration.prototype
  ) {
    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.sync.register("sync-inventory");
      console.log("Background sync registered");
    } catch (error) {
      console.error("Background sync registration failed:", error);
    }
  }
};

// Sync pending items to API
const syncPendingItems = async () => {
  const items = pendingItems.value.filter((item) => item.status === "pending");

  for (const item of items) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: item.name,
          price: item.price,
        }),
      });

      if (response.ok) {
        await updateStatusInIndexedDB(item.id, "completed");
        console.log(`Synced item: ${item.name}`);
      } else {
        console.error(`Failed to sync item: ${item.name}`, response.status);
      }
    } catch (error) {
      console.error(`Error syncing item: ${item.name}`, error);
    }
  }

  await loadPendingItems();

  const syncedCount =
    items.length -
    pendingItems.value.filter((i) => i.status === "pending").length;
  if (syncedCount > 0) {
    showStatus(
      `${syncedCount} item(s) synced successfully!`,
      "alert-success",
      "fas fa-check-circle",
    );
  }
};

// Manual sync
const syncNow = async () => {
  showStatus("Syncing...", "alert-info", "fas fa-sync fa-spin");
  await syncPendingItems();
};

// Delete item
const deleteItem = async (id) => {
  try {
    await deleteFromIndexedDB(id);
    await loadPendingItems();
    showStatus("Item deleted.", "alert-secondary", "fas fa-trash");
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};

// Online/Offline handlers
const handleOnline = async () => {
  isOnline.value = true;
  console.log("Back online, syncing pending items...");
  await syncPendingItems();
};

const handleOffline = () => {
  isOnline.value = false;
  console.log("Went offline");
};

onMounted(async () => {
  isOnline.value = navigator.onLine;
  await loadPendingItems();

  window.addEventListener("online", handleOnline);
  window.addEventListener("offline", handleOffline);

  // Listen for messages from service worker
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.addEventListener("message", async (event) => {
      if (event.data && event.data.type === "SYNC_COMPLETE") {
        await loadPendingItems();
        showStatus(
          "Background sync completed!",
          "alert-success",
          "fas fa-check-circle",
        );
      }
    });
  }
});

onUnmounted(() => {
  window.removeEventListener("online", handleOnline);
  window.removeEventListener("offline", handleOffline);
});

useHead({
  title: "Create Inventory - My PWA",
  meta: [{ name: "description", content: "Add new products to inventory" }],
});
</script>

<style scoped>
.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card {
  border: none;
}

.list-group-item {
  transition: background-color 0.3s;
}

.list-group-item:hover {
  background-color: #f8f9fa;
}
</style>
