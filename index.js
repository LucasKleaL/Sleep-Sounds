$(document).ready(function(){
    registerServiceWorker();
    iosPwaPopup();
})

async function registerServiceWorker() { //responsavel por registrar e chamar o service worker 
    if ('serviceWorker' in navigator) {
        try{
            window.addEventListener("load", function() {
                navigator.serviceWorker.getRegistrations().then(function(registrations) { for(let registration of registrations) { registration.unregister() } })
                navigator.serviceWorker.register("./sw.js");
            })
            console.log("Server Worker registrated.")
        }
        catch(e) {
            console.log("Service Worker registration failed.")
        }
    }
}

function iosPwaPopup() {

    const isIos = () => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        return /iphone|ipad|ipod/.test( userAgent );
      }
      // Detects if device is in standalone mode
      const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);
      
      // Checks if should display install popup notification:
      if (isIos() && !isInStandaloneMode()) {
        this.setState({ showInstallMessage: true });

} 