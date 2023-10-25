var song;
var fft;

//Preload the mp3 file to the 'song'varible
function preload() {
  song = loadSound('Asset/Abel Korzeniowski - Satin Birds.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fft = new p5.FFT();
}

function draw() {
  background(255);
  stroke(0);
  //Store the fft data
  var wave = fft.waveform();

  //Looping through the waveform data to create the wave on canva
  for (let i = 0; i < width; i++) {
    //Use floor to make sure the mapped value is an integer
    var index = floor(map(i, 0, width, 0, wave.length));
    var x = i;
    //y coordinator is the current waveform value based on index
    var y = wave[index] * height / 4 + height / 2; //Scale it up to better see it, also offset the satring point down
    point(x, y);
  }
}

//A function to let user use mouse click to play the song
function mouseClicked() {
  if (song.isPlaying()) {
    song.pause();
  }
  else {
    song.play();
  }
}