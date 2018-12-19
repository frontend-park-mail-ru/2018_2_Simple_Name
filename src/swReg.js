// Регистрируем sw
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/static/sw.js', {scope: './'})
        .then(() => navigator.serviceWorker.ready.then((reg) => {
            reg.sync.register('data');
        }))
        .catch((err) => console.log('ServiceWorker registration failed: ', err));

}