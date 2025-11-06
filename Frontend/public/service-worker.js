// public/service-worker.js
self.addEventListener("install", (e) => {
  console.log("SW installed");
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  console.log("SW activated");
  return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  try {
    const url = new URL(event.request.url);
    // adapt path/host check to your tile URL pattern
    if (url.pathname.includes("/tile/") || url.pathname.includes("/tiles/")) {
      event.respondWith(
        caches.open("tiles-v1").then(async (cache) => {
          const cached = await cache.match(event.request);
          if (cached) return cached;
          const res = await fetch(event.request);
          // Only cache successful responses
          if (res && res.status === 200) cache.put(event.request, res.clone());
          return res;
        })
      );
    }
  } catch (err) {
    // non-URL requests or CORS issues — let default fetch happen
  }
});
