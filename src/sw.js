// const CACHE = 'cache-only-v1';
const CACHE = new Date().toISOString();
const { assets } = global.serviceWorkerOption;
let assetsToCache = [...assets];

assetsToCache = assetsToCache.map(path => {
    const res = new URL(path, global.location).toString();
    return res;
});

// При установке воркера мы должны закешировать часть данных (статику)
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE).then((cache) => {
            return cache.addAll([...assetsToCache, '/']);
        })
    );
});

// период обновления кэша - одни сутки
var MAX_AGE = 86400000;

self.addEventListener('fetch', function (event) {
    event.respondWith(
        // ищем запрошенный ресурс среди закэшированных
        caches.match(event.request).then(function (cachedResponse) {
            var lastModified, fetchRequest;
            // если ресурс есть в кэше
            if (cachedResponse) {
                // получаем дату последнего обновления
                lastModified = new Date(cachedResponse.headers.get('last-modified'));
                // и если мы считаем ресурс устаревшим
                if (lastModified && (Date.now() - lastModified.getTime()) > MAX_AGE) {
                    fetchRequest = event.request.clone();
                    // создаём новый запрос
                    return fetch(fetchRequest).then(function (response) {
                        // при неудаче всегда можно выдать ресурс из кэша
                        if (!response || response.status !== 200) {
                            return cachedResponse;
                        }
                        // обновляем кэш
                            caches.open(CACHE).then(function (cache) {
                                cache.put(event.request, response.clone());
                            });
                        // возвращаем свежий ресурс
                        return response.clone();
                    }).catch(function () {
                        return cachedResponse;
                    });
                }
                return cachedResponse;
            }
            // запрашиваем из сети как обычно
            return fetch(event.request);
        })
    );
});


// self.addEventListener('fetch', function (event) {
//     // Мы используем `respondWith()`, чтобы мгновенно ответить без ожидания ответа с сервера
//     if (event.request.method !== 'POST') {
//         event.respondWith(fromCache(event.request));
//         // `waitUntil()` нужен, чтобы предотвратить прекращение работы worker'a до того как кэш обновится
//         event.waitUntil(update(event.request));
//     }
// });

// function fromCache(request) {
//     return caches.open(CACHE).then((cache) =>
//         cache.match(request)
//             .then((matching) => matching || Promise.reject('no-match'))
//     )
// }

// function update(request) {
//     return caches.open(CACHE).then((cache) =>
//         fetch(request).then((response) =>
//             cache.put(request, response)
//         )
//     );
// }