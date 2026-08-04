const CACHE_NAME = 'tokyo-trip-v2';
const STATIC_FILES = [
  './tokyo-img1.jpg',
  './tokyo-img2.jpg',
  './나리타출발.pdf',
  './닛포리우에노출발.pdf',
  './manifest.json'
];

// 설치 — 이미지/PDF만 캐시 (HTML은 제외)
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_FILES))
  );
  self.skipWaiting();
});

// 활성화 — 오래된 캐시 삭제
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// HTML → 네트워크 우선 (항상 최신), 실패시 캐시
// 이미지/PDF → 캐시 우선 (빠른 로딩)
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  const isHtml = url.pathname.endsWith('.html') || url.pathname === '/' || url.pathname.endsWith('/');

  if (isHtml) {
    // 네트워크 우선 → 최신 반영
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
  } else {
    // 캐시 우선 → 이미지/PDF 빠르게
    e.respondWith(
      caches.match(e.request).then(cached => cached || fetch(e.request))
    );
  }
});
