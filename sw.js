/* Field Kit Manage service worker: network-first for same-origin GETs,
   so a new version is never trapped behind the cache; the cache is the
   offline fallback only. Cross-origin traffic is never intercepted.
   The cache name carries the app version — bump it with every release. */
var CACHE = 'fkm-v1.16.3';

self.addEventListener('install', function () { self.skipWaiting(); });

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) { return k === CACHE ? null : caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(req).then(function (res) {
      if (res && res.ok) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
      }
      return res;
    }).catch(function () {
      return caches.match(req, { ignoreSearch: true }).then(function (hit) {
        if (hit) return hit;
        if (req.mode === 'navigate') {
          return caches.match('./index.html', { ignoreSearch: true }).then(function (shell) {
            return shell || new Response('Offline', { status: 503, statusText: 'Offline' });
          });
        }
        return new Response('', { status: 503, statusText: 'Offline' });
      });
    })
  );
});
