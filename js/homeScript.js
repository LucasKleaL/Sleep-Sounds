
var arrayContent = [["smooth_rain.png", "smooth_rain.mp3"], []]
var soundActive = false;
var actualSound = 1;

$(document).ready(function(){

    playerGenerator();

});

function playerGenerator() {

    $(".player-content").html("");

    if (actualSound === 1) {
        var content = "";

        content += "<div class='div-wallpaper'>"
        content += "<img src='public/img/" + arrayContent[0][0] + "'" + " class='wallpaper-player' alt='Wallpaper'>"
        console.log(content)
        content += "</div>"

        content += "<audio controls id='audioControl' class='audio-control'>"
        content += "<source src='public/sounds/smoothRain.mp3' id='srcAudio'>"
        content += "</audio>"

        content += "<div class='player-buttons'>"

        content += "<button class='back-button'><img src='public/img/back_button.png' alt='Back' class='back-button'></button>"
        content += "<button class='play-button' onclick='playSound()'><img src='public/img/play_button.png' alt='Play/Pause' class='play-button' id='playButtonImg'></button>"
        content += "<button class='next-button'><img src='public/img/next_button.png' alt='Next' class='next-button'></button>"

        content += "</div>"
    }    

        

    

    $(".player-content").append(content);
    console.log("generator finalizado")
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