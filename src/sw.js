const CACHE = 'cache-v1-simplegame';
const { assets } = global.serviceWorkerOption;
let assetsToCache = [...assets];

assetsToCache = assetsToCache.map(path => {
    const url = '/static';
    const res = new URL(url + path, global.location).toString();
    return res;
});

// При установке воркера мы должны закешировать часть данных (статику)
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE).then((cache) => {
            return cache.addAll([...assetsToCache]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        // ищем запрашиваемый ресурс в хранилище кэша
        caches.match(event.request).then((cachedResponse) => {
            // выдаём кэш, если он есть
            if (cachedResponse) {
                return fromCache(event.request);
            }
                // иначе запрашиваем из сети как обычно
                return fetch(event.request);
        })
    );
});

function fromCache(request) {
    return caches.open(CACHE)
        .then((cache) => cache.match(request)
            .then((matching) => matching));
}