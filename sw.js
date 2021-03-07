self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("pwa-cache").then(cache => {
            return cache.addAll([
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
                "./public/sounds/smoothRain.mp3",
            ])
        })
    )
})
                