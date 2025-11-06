// src/service-worker.js

// Import the precache helper from Workbox
import { precacheAndRoute } from 'workbox-precaching';

// Workbox will automatically replace self.__WB_MANIFEST with your app’s assets
precacheAndRoute(self.__WB_MANIFEST);

// You can also add custom caching strategies here if you want
self.addEventListener('fetch', (event) => {
  // Example: cache-first strategy for images
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.open('images-cache').then((cache) =>
        cache.match(event.request).then((response) =>
          response ||
          fetch(event.request).then((resp) => {
            cache.put(event.request, resp.clone());
            return resp;
          })
        )
      )
    );
  }
});
