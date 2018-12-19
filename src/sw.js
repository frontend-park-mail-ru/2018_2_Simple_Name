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
            return cache.addAll([
                ...assetsToCache,
                '/static/b3f5e82c46a8e0cd2d7a8b5dce47a084.png',
                
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    // update(event.request);
    event.respondWith(
        // ищем запрашиваемый ресурс в хранилище кэша
        caches.match(event.request).then((cachedResponse) => {
            // выдаём кэш, если он есть
            if (cachedResponse) {
                return fromCache(event.request);
            } else {
                // иначе добавляем в кэш и запрашиваем из сети как обычно
                update(event.request);
                return fetch(event.request);
            }
        })
    );
});

function fromCache(request) {
    return caches.open(CACHE)
        .then((cache) => cache.match(request)
            .then((matching) => matching));
}

function update(request) {
    return caches.open(CACHE)
        .then((cache) => fetch(request)
            .then((response) => cache.put(request, response)));
}