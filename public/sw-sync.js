// Background Sync Service Worker for Inventory

const DB_NAME = 'PWAInventoryDB'
const DB_VERSION = 1
const STORE_NAME = 'pendingProducts'
const API_URL = 'http://localhost:5051/api/v1/inventories'

// Open IndexedDB
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
    request.onupgradeneeded = (event) => {
      const db = event.target.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true })
        store.createIndex('status', 'status', { unique: false })
      }
    }
  })
}

// Get pending items
async function getPendingItems() {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly')
    const store = transaction.objectStore(STORE_NAME)
    const index = store.index('status')
    const request = index.getAll('pending')
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
    transaction.oncomplete = () => db.close()
  })
}

// Update item status
async function updateItemStatus(id, status) {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    const getRequest = store.get(id)
    getRequest.onsuccess = () => {
      const item = getRequest.result
      if (item) {
        item.status = status
        item.syncedAt = new Date().toISOString()
        store.put(item)
      }
      resolve()
    }
    getRequest.onerror = () => reject(getRequest.error)
    transaction.oncomplete = () => db.close()
  })
}

// Sync pending items
async function syncPendingItems() {
  const items = await getPendingItems()
  
  for (const item of items) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: item.name,
          price: item.price
        })
      })

      if (response.ok) {
        await updateItemStatus(item.id, 'completed')
        console.log('[SW] Synced item:', item.name)
      }
    } catch (error) {
      console.error('[SW] Failed to sync item:', item.name, error)
      throw error // Re-throw to retry sync later
    }
  }

  // Notify all clients that sync is complete
  const clients = await self.clients.matchAll()
  clients.forEach(client => {
    client.postMessage({ type: 'SYNC_COMPLETE' })
  })
}

// Handle background sync event
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync event:', event.tag)
  
  if (event.tag === 'sync-inventory') {
    event.waitUntil(syncPendingItems())
  }
})

// Handle messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SYNC_NOW') {
    syncPendingItems()
  }
})

console.log('[SW] Background sync service worker loaded')
