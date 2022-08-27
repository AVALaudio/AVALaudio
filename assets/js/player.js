var audio = new Audio("audio/prova1.mp3");
var audio2 = new Audio("audio/prova2.mp3");

audio.volume = 0;
audio2.volume = 0.5;

var btt = document.querySelector("#pb")

btt.addEventListener("click", function () {
    if ($(this).hasClass('fa-play')) {
        $(this).removeClass('fa-play');
        $(this).addClass('fa-pause');
        autoplay = true;
        audio.play();
        audio2.play();
        audio.muted = false;
        audio2.muted = false;
    }
    else {
        audio.muted = true;
        audio2.muted = true;
        $(this).removeClass('fa-pause');
        $(this).addClass('fa-play');
    }
});

audio.onended = function () {
    $("#pb").removeClass('fa-pause');
    $("#pb").addClass('fa-play');
};

let volume = document.querySelector("#v");
volume.addEventListener("change", function (e) {
    audio.volume = e.currentTarget.value / 200;
    audio2.volume = 0.5 - (e.currentTarget.value / 200);
})
/*
var audio3 = new Audio("audio/prova1.mp3");
var audio4 = new Audio("audio/prova2.mp3");

audio3.volume = 0;
audio4.volume = 0.5;

var btt1 = document.querySelector("#pb1");

btt1.addEventListener("click", function () {
    if ($(this).hasClass('fa-play')) {
        $(this).removeClass('fa-play');
        $(this).addClass('fa-pause');
        autoplay = true;
        audio3.play();
        audio4.play();
        audio3.muted = false;
        audio4.muted = false;
    }
    else {
        audio3.muted = true;
        audio4.muted = true;
        $(this).removeClass('fa-pause');
        $(this).addClass('fa-play');
    }
});

audio3.onended = function () {
    $("#pb1").removeClass('fa-pause');
    $("#pb2").addClass('fa-play');
};

let volume2 = document.querySelector("#v1");
volume2.addEventListener("change", function (e) {
    audio3.volume2 = e.currentTarget.value / 200;
    audio4.volume2 = 0.5 - (e.currentTarget.value / 200);
})*/