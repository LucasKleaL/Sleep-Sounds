
var shareIsActive = false;
var arrayContent = [["smooth_rain.png", "smoothRain.mp3"], ["heavy_rain.png", "heavyRain.mp3"], ["heavy_thunder_rain.png", "thunderRain.mp3"]]
var soundActive = false;
var actualSound = 0;
var maxNumSound = arrayContent.length - 1;

$(document).ready(function(){
    playerGenerator();
    pwaTrackingListeners();
});


function playerGenerator() {

    $(".player-content").html("");

    var content = "";

    content += "<div class='div-wallpaper'>"
    content += "<img src='public/img/" + arrayContent[actualSound][0] + "'" + " class='wallpaper-player' alt='Wallpaper' id='wallpaperImg'>"
    content += "</div>"

    content += "<audio controls id='audioControl' onclick='playAudiobar()' crossOrigin='anonymous' class='audio-control' preload='auto' loop='true' src='public/sounds/" + arrayContent[actualSound][1] + "'>"
    /*content += "<source src='public/sounds/" + arrayContent[actualSound][1] + "' id='srcAudio' type='audio/mpeg'>"*/
    content += "Seu navegador não suporta stream/arquivos de audio. Por favor tente com outro navegador."
    content += "</audio>"

    content += "<div class='player-buttons'>"

    content += "<button class='back-button' onclick='previousSound()' title='Previous'><img src='public/img/back_button.png' alt='Back' class='back-button'></button>"
    content += "<button class='play-button' onclick='playSound()' title='Play/Pause'><img src='public/img/play_button.png' alt='Play/Pause' class='play-button' id='playButtonImg'></button>"
    content += "<button class='next-button' onclick='nextSound()' title='Next'><img src='public/img/next_button.png' alt='Next' class='next-button'></button>"

    content += "</div>"
        
    $(".player-content").append(content);
    
}

function playSound() { /* Responsável pelo botão de play/pause */ 

    var sound = document.getElementById("audioControl");
    var img = document.getElementById("playButtonImg");    
    
    if (soundActive === false){
        sound.play();
        soundActive = true;
        img.src = "public/img/pause_button.png";
    }
    else if (soundActive === true) {
        sound.pause();
        soundActive = false;
        img.src = "public/img/play_button.png";
    }
    
}

function playAudiobar() {
    console.log("audiobar")
}

function nextSound() {

    if (actualSound < maxNumSound) {
        actualSound += 1;
    }
    else if (actualSound >= maxNumSound) {
        actualSound = 0;
    }

    /* Função para trocar o wallpaper do player */ 
    var wallpaperImg = document.getElementById("wallpaperImg");
    var currentWallpaper = "public/img/" + arrayContent[actualSound][0];
    
    wallpaperImg.src = ""
    wallpaperImg.src = currentWallpaper

    /* Função para trocar o audio em execução no player */
    var playerAudio = document.getElementById("audioControl");
    var currentAudio = "public/sounds/" + arrayContent[actualSound][1];

    playerAudio.src = "";
    playerAudio.src = currentAudio;

    /* Função para trocar o estilo do botão de play/pause quando um novo audio é carregado */ 
    var img = document.getElementById("playButtonImg");
    soundActive = false;
    img.src = "public/img/play_button.png";
}

function previousSound() {

    if (actualSound === 0){
        actualSound = arrayContent.length - 1;
    }
    else {
        actualSound -= 1;
    }
    
    /* Função para trocar o wallpaper do player */ 
    var wallpaperImg = document.getElementById("wallpaperImg");
    var currentWallpaper = "public/img/" + arrayContent[actualSound][0];
    
    wallpaperImg.src = ""
    wallpaperImg.src = currentWallpaper

    /* Função para trocar o audio em execução no player */
    var playerAudio = document.getElementById("audioControl");
    var currentAudio = "public/sounds/" + arrayContent[actualSound][1];

    playerAudio.src = "";
    playerAudio.src = currentAudio;

    /* Função para trocar o estilo do botão de play/pause quando um novo audio é carregado */ 
    var img = document.getElementById("playButtonImg");
    soundActive = false;
    img.src = "public/img/play_button.png";

}

function shareMenu() { //responsavel por ativar e desativar a div com os botões de compartilhar

    if (shareIsActive === false) {
        shareIsActive = true;
        $("#divShare").removeClass("div-share-inactive").addClass("div-share");

        var shareContent = '';

        shareContent += '<h1>Share this app.</h1>';
        shareContent += '<a href="https://www.facebook.com/sharer/sharer.php?u=https://sleepsounds.site/">';
        shareContent += '<img src="public/img/facebook_icon.png" alt="Facebook" style="margin-right: 0.5rem;">';
        shareContent += '</a>';
        shareContent += '<a href="https://api.whatsapp.com/send?text=https://sleepsounds.site/">';
        shareContent += '<img src="public/img/whatsapp_icon.png" alt="Whatsapp">';
        shareContent += '</a>';
        shareContent += '<a href="http://www.twitter.com/share?url=https://sleepsounds.site/"">';
        shareContent += '<img src="public/img/twitter_icon.png" alt="Twitter" style="margin-left: 0.5rem;">';
        shareContent += '</a>';
        
        $("#divShare").append(shareContent);

    }
    else {
        shareIsActive = false;

        $("#divShare").removeClass("div-share").addClass("div-share-inactive");
        $("#divShare").html("");

    }

}


/* Parte responsavel pelo banner de instalação */ 
       
    const pwaTrackingListeners = () => {
        const fireAddToHomeScreenImpression = event => {
        fireTracking("Add to homescreen shown");
        //will not work for chrome, untill fixed
        event.userChoice.then(choiceResult => {
            fireTracking(`User clicked ${choiceResult}`);
        });
        //This is to prevent `beforeinstallprompt` event that triggers again on `Add` or `Cancel` click
        window.removeEventListener(
            "beforeinstallprompt",
            fireAddToHomeScreenImpression
        );
        };
        window.addEventListener("beforeinstallprompt", fireAddToHomeScreenImpression);
        
        //Track web app install by user
        window.addEventListener("appinstalled", event => {
        fireTracking("PWA app installed by user!!! Hurray");
        });
    
        //Track from where your web app has been opened/browsed
        window.addEventListener("load", () => {
        let trackText;
        if (navigator && navigator.standalone) {
            trackText = "Launched: Installed (iOS)";
        } else if (matchMedia("(display-mode: standalone)").matches) {
            trackText = "Launched: Installed";
        } else {
            trackText = "Launched: Browser Tab";
        }
        fireTracking(track);
        });
  };