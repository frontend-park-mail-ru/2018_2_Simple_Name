const CACHE = 'cache-v1-simplegame';
const { assets } = global.serviceWorkerOption;
let assetsToCache = [...assets];

assetsToCache = assetsToCache.map(path => {
    if (path === '/index.html') return new URL('/', global.location).toString();
    const res = new URL(path, global.location).toString();
    return res;
});

assetsToCache.push('/about');
assetsToCache.push('/signin');
assetsToCache.push('/signup');

// При установке воркера мы должны закешировать часть данных (статику)
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE).then((cache) => {
            return cache.addAll([...assetsToCache]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    if (navigator.onLine) {
        const req = event.request;
        const compareFinal = req.url.match('about') || req.url.match('leaders');

        if (compareFinal) {
            return fetch(event.request).then((response) => {
                return caches.open(CACHE).then((cache) => {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        }

    } else {
        event.respondWith(caches.match(event.request).then((cachedResponse) => {
            // выдаём кэш, если он есть
            if (cachedResponse) {
                return fromCache(event.request);
            }
        }));
    }

    return fetch(event.request).then((response) => {
        return response;
    });


});

function fromCache(request) {
    return caches.open(CACHE)
        .then((cache) => cache.match(request)
            .then((matching) => matching));
}