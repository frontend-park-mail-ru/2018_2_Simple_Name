// Регистрируем sw
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(() => navigator.serviceWorker.ready.then((reg) => {
            reg.sync.register('data');
            console.log('123123123123123');
        }))
        .catch((err) => console.log('ServiceWorker registration failed: ', err));

}