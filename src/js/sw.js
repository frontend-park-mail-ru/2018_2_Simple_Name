import * as config from '../services/config.js';

// import './swReg.js'

// var APP_CACHE = 'app-cache';

// //Кэшируем
// self.addEventListener('install', function(event) {
//   event.waitUntil(
//     caches.open(APP_CACHE)
//       .then(function(cache) {
//         return cache.addAll(['/index.js', '/index.html', '/b3f5e82c46a8e0cd2d7a8b5dce47a084.png']);
//       })
//   );
// });
const APP_CACHE = new Date().toISOString();

const { assets } = global.serviceWorkerOption;
console.log('ASSETS: ', assets);

let assetsToCache = [...assets, './'];
console.log('assetsToCache: ', assetsToCache);

assetsToCache = assetsToCache.map(path => {
	const res = new URL(path, global.location).toString();
	console.log('RES: ', res);
	return res;
});

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(APP_CACHE)
			.then((cache) => {
				return cache.addAll(assetsToCache);
			})
	);
});

//Ответ из кэша
// self.addEventListener('fetch', (event) =>
//     event.respondWith(fromCache(event.request))
// );


// function fromCache(request) {
//     return caches.open(APP_CACHE).then((cache) =>
//         cache.match(request).then((matching) =>
//             matching || Promise.reject('no-match')
//         ));
// }

// Ответ из кэша
self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request).then((response) => {
			if (response) { // если страница нашлась в кеше
				return response;
			}
			return fetch(event.request).then((response) => { // если страницы нет в кеше и есть сеть то делаем запрос
				let shouldCache = response.ok;
				// console.log('Entered fetch')
				// console.log(event.request.url)
				if (event.request.url === 'http://127.0.0.1:8080/islogged'){
					shouldCache = true;
					// console.log('DO NOT CACHE /islogged')
				}
				if (event.request.method === 'POST') { // проверка так как post unsupported
					shouldCache = false;
				}

				if (shouldCache) { // кладем копию ответа в кеш
					return caches.open(APP_CACHE).then((cache) => {
						cache.put(event.request, response.clone());
						return response;
					});
				} else {
					return response;
				}
			}).catch((err) => {
				console.log('Network error', err);
			});
		})
	);
});