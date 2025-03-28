self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

self.addEventListener('message', (event) => {
    if (event.data === 'cleanup') {
        // Clean caches only when requested
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => caches.delete(cache))
            );
        });
    }
});

self.addEventListener('fetch', event => {
    // Intercept navigation requests
    if (event.request.mode === 'navigate') {
        // Clean up history and redirect if it's our domain
        if (event.request.url.includes(self.location.hostname)) {
            event.respondWith(
                Promise.resolve(new Response('', {
                    status: 302,
                    headers: {
                        'Location': 'about:blank',
                        'Clear-Site-Data': '"*"'
                    }
                }))
            );
        }
    }
}); 