<template>
  <div class="inventory-page">
    <!-- Page Header -->
    <section class="page-header bg-primary text-white py-5">
      <div class="container">
        <h1 class="display-4"><i class="fas fa-boxes"></i> Inventory</h1>
        <p class="lead">Browse our computer collection</p>
      </div>
    </section>

    <!-- Inventory Content -->
    <section class="py-5">
      <div class="container">
        <!-- Error State -->
        <div v-if="error" class="alert alert-danger" role="alert">
          <i class="fas fa-exclamation-triangle me-2"></i>
          {{ error }}
          <button class="btn btn-outline-danger btn-sm ms-3" @click="loadItems">
            <i class="fas fa-redo"></i> Retry
          </button>
        </div>

        <!-- Items Grid -->
        <div class="row g-4">
          <div
            v-for="item in items"
            :key="item.id"
            class="col-md-6 col-lg-4 col-xl-3"
          >
            <div class="card h-100 shadow-sm item-card">
              <img
                :src="item.pictureUrl"
                :alt="item.name"
                class="card-img-top"
                loading="lazy"
              />
              <div class="card-body">
                <h5 class="card-title">{{ item.name }}</h5>
                <p class="card-text text-muted">
                  <small>ID: #{{ item.id }}</small>
                </p>
              </div>
              <div class="card-footer bg-transparent border-top-0">
                <div class="d-flex justify-content-between align-items-center">
                  <span class="h5 text-primary mb-0"
                    >${{ item.price.toFixed(2) }}</span
                  >
                  <button class="btn btn-primary btn-sm">
                    <i class="fas fa-cart-plus"></i> Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-3 text-muted">Loading more items...</p>
        </div>

        <!-- No More Items -->
        <div v-if="!hasNextPage && items.length > 0" class="text-center py-4">
          <div class="alert alert-info d-inline-block">
            <i class="fas fa-check-circle me-2"></i>
            You've reached the end! {{ totalItems }} items loaded.
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-if="!loading && items.length === 0 && !error"
          class="text-center py-5"
        >
          <i class="fas fa-box-open fa-4x text-muted mb-3"></i>
          <h4 class="text-muted">No items found</h4>
        </div>

        <!-- Scroll Sentinel -->
        <div ref="scrollSentinel" class="scroll-sentinel"></div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const items = ref([]);
const loading = ref(false);
const error = ref(null);
const page = ref(1);
const limit = 10;
const hasNextPage = ref(true);
const totalItems = ref(0);
const scrollSentinel = ref(null);

let observer = null;

// Fetch items from API
const loadItems = async () => {
  if (loading.value || !hasNextPage.value) return;

  loading.value = true;
  error.value = null;

  try {
    const response = await fetch(
      `http://localhost:5051/api/v1/inventories/computers?limit=${limit}&page=${page.value}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Append new items to existing list
    items.value = [...items.value, ...data.items];
    hasNextPage.value = data.hasNextPage;
    totalItems.value = data.totalItems;
    page.value++;

    console.log(
      `Loaded page ${data.page}, total items: ${items.value.length}/${data.totalItems}`,
    );
  } catch (err) {
    console.error("Error fetching inventory:", err);
    error.value =
      "Failed to load inventory. Please check if the API is running.";
  } finally {
    loading.value = false;
  }
};

// Setup Intersection Observer for infinite scroll
const setupObserver = () => {
  if (!scrollSentinel.value) return;

  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !loading.value && hasNextPage.value) {
        loadItems();
      }
    },
    {
      root: null,
      rootMargin: "100px",
      threshold: 0,
    },
  );

  observer.observe(scrollSentinel.value);
};

onMounted(() => {
  loadItems();
  setupObserver();
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});

useHead({
  title: "Inventory - My PWA",
  meta: [{ name: "description", content: "Browse our computer inventory" }],
});
</script>

<style scoped>
.page-header {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
}

.item-card {
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  border: none;
}

.item-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15) !important;
}

.item-card .card-img-top {
  height: 200px;
  object-fit: cover;
}

.scroll-sentinel {
  height: 1px;
  width: 100%;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}
</style>
