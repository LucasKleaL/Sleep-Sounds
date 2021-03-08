const cacheName = "pwa-cache"

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            cache.addAll([
                "./",
                "./index.html",
                "./css/global.css",
                "./css/home.css",
                "./js/jquery-3.5.1.js",
                "./js/homeScript.js",
                "./public/logo.png",
                "./public/img/back_button.png",
                "./public/img/next_button.png",
                "./public/img/play_button.png",
                "./public/img/pause_button.png",
                "./public/img/smooth_rain.png",
                "./public/img/heavy_rain.png",
                "./public/img/heavy_thunder_rain.png",
                "./public/sounds/smoothRain.mp3",
                "./public/sounds/heavyRain.mp3",
                "./public/sounds/thunderRain.mp3",
                "./public/img/ioga_icon.png",
                "./public/img/meditation_icon.png",
                "./public/img/sleep_icon.png",
            ])
        })
    )
    return self.skipWaiting();
})

self.addEventListener("activate", e =>{
    self.clients.claim();
})

self.addEventListener("fetch", async e =>{
    const req = e.resquest;
    const url = new URL(req.url);

    if(url.login === location.origin){
        e.respondWith(cacheFirst(req));
    }
    else {
        e.respondWith(networkAndCache(req))
    }
})

async function cacheFirst(req) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(req);

    return cached || fetch(req);
}

async function networkAndCache(req) {
    const cache = await caches.open(cacheName);

    try {
        const refresh = await fetch(req);
        await cache.put(req, refresh.clone());
        return refresh;
    }
    catch(e) {
        const cached = await cache.match(req);
        return cached;
    }
}
                