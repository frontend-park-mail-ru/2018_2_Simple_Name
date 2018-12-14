const CACHE = 'cache-only-v1';
const { assets } = global.serviceWorkerOption;
let assetsToCache = [...assets];

assetsToCache = assetsToCache.map(path => {
    const res = new URL(path, global.location).toString();
    // console.log('RES: ', res);
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

self.addEventListener('fetch', function (event) {
    // Мы используем `respondWith()`, чтобы мгновенно ответить без ожидания ответа с сервера
    if (event.request.method !== 'POST') { //post unsuported
        // event.request.method !== 'GET') {
        event.respondWith(fromCache(event.request));
        // `waitUntil()` нужен, чтобы предотвратить прекращение работы worker'a до того как кэш обновится
        if (event.request.url !== 'http://127.0.0.1:3002/islogged') {
            event.waitUntil(update(event.request));
        }
    }
});

function fromCache(request) {
    return caches.open(CACHE).then((cache) =>
        cache.match(request)
            .then((matching) => matching || Promise.reject('no-match'))
    )
}

function update(request) {
    return caches.open(CACHE).then((cache) =>
        fetch(request).then((response) =>
            cache.put(request, response)
        )
    );
}
