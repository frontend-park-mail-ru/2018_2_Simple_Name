// const APP_CACHE = new Date().toISOString();

// const { assets } = global.serviceWorkerOption;

// let assetsToCache = [...assets, './'];

// assetsToCache = assetsToCache.map(path => {
//     const res = new URL(path, global.location).toString();
//     return res;
// });

// self.addEventListener('install', (event) => {
//     event.waitUntil(
//         caches.open(APP_CACHE)
//             .then((cache) => {
//                 return cache.addAll(assetsToCache);
//             })
//     );
// });

// // Ответ из кэша
// self.addEventListener('fetch', (event) => {
//     event.respondWith(
//         caches.match(event.request).then((response) => {
//             if (response) { // если страница нашлась в кеше
//                 return response;
//             }
//             return fetch(event.request).then((response) => { // если страницы нет в кеше и есть сеть то делаем запрос
// 				let shouldCache = response.ok;
				
//                 if (event.request.method === 'POST') { // проверка так как post unsupported
//                     shouldCache = false;
//                 }

//                 if (shouldCache) { // кладем копию ответа в кеш
//                     return caches.open(APP_CACHE).then((cache) => {
//                         cache.put(event.request, response.clone());
//                         return response;
//                     });
//                 }
//                 return response;

//             }).catch((err) => {
//                 console.log('Network error', err);
//             });
//         })
//     );
// });