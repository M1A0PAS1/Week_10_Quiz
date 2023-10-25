var song;

//Preload the mp3 file to the 'song'varible
function preload(){
  song = loadSound('Asset/Abel Korzeniowski - Satin Birds.mp3');
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}

//A function to let user use mouse click to play the song
function mouseClicked(){
  if (song.isPlaying()){
    song.pause();
  }
  else{
    song.play();
  }
}