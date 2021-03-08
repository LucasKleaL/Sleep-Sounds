$(document).ready(function(){
    registerServiceWorker();
})

async function registerServiceWorker() { //responsavel por registrar e chamar o service worker 
    if ('serviceWorker' in navigator) {
        try{
            window.addEventListener("load", function() {
                navigator.serviceWorker.getRegistrations().then((r)=>{r[0].unregister()})
                navigator.serviceWorker.register("/sw.js");
            })
            console.log("Server Worker registrated.")
        }
        catch(e) {
            console.log("Service Worker registration failed.")
        }
    }
}