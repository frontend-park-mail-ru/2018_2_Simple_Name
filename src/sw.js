const CACHE = 'cache-v1-simplegame';
const { assets } = global.serviceWorkerOption;
let assetsToCache = [...assets];

console.log('Assets :', assetsToCache);

assetsToCache = assetsToCache.map(path => {
    if (path === '/index.html') return new URL('/', global.location).toString();
    const res = new URL(path, global.location).toString();
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
    console.log('EVENT', event.request.url);
    if (navigator.onLine) {
        console.log('Ты онлайн');
        // const regex = /leaders\/([0-9]+)/;
        const leaders = event.request.url.match('leaders');
        if (leaders) {
            return fetch(event.request).then((response) => {
                return caches.open(CACHE).then((cache) => {

                    // if (event.request.url === "https://simplegame.ru.com/api/signin" ||
                    //     event.request.url === "https://simplegame.ru.com/api/signup" ||
                    //     event.request.url === "https://simplegame.ru.com/api/logout") {
                    //
                    // }

                    cache.put(event.request, response.clone());
                    console.log('Положили в кеш ', event.request.url);
                    return response;
                });
            });
        }
        // });
        console.log("Не кладем в кеш");
        return fetch(event.request);

    }
    console.log('не онлайн, ищем в кеше');

    event.respondWith(caches.match(event.request).then((cachedResponse) => {
        // выдаём кэш, если он есть
        if (cachedResponse) {
            return fromCache(event.request);
        }
        console.log(event.request.url, ' Нет в кеше((');


    }));

    return fetch(event.request);


});

function fromCache(request) {
    return caches.open(CACHE)
        .then((cache) => cache.match(request)
            .then((matching) => matching));
}