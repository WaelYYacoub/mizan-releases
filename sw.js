const CACHE = 'kaffa-50c3158de252';
const FILES = ["./","./assets/index-Bmt1nZ9j.css","./assets/index-ZBAQETz8.js","./assets/kaffa-logo-Xjn-oynx.png","./icons/apple-touch-icon.png","./icons/icon-192.png","./icons/icon-512.png","./index.html","./manifest.webmanifest"];
// cache: 'reload' = always take the new files from the server, never an old copy from the browser cache.
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request).catch(() => caches.match('./'))));
});
