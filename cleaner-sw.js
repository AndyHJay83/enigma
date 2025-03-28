self.addEventListener('activate', async () => {
    // Get all cached data and remove it
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map(cache => caches.delete(cache)));
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