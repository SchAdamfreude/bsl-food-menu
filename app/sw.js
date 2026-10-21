// Service worker: stores every app file on the device so the menu works with no internet.
// Bump CACHE_VERSION whenever any file in app/ changes; installed tablets pick up the
// new version the next time the app is opened with an internet connection.
const CACHE_VERSION = 'cafe-menu-v1';
const FILES = [
  './',
  'index.html',
  'styles.css',
  'app.js',
  'menu.js',
  'manifest.webmanifest',
  'fonts/jost-latin-wght.woff2',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(FILES.map((f) => new Request(f, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Cache-first: always answer from the stored copy; fall back to the network only for anything not stored
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cached) => {
      if (cached) return cached;
      if (event.request.mode === 'navigate') return caches.match('index.html');
      return fetch(event.request);
    })
  );
});
