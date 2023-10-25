var song;
var fft;

//Preload the mp3 file to the 'song'varible
function preload() {
  song = loadSound('Asset/Abel Korzeniowski - Satin Birds.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  fft = new p5.FFT();
}

function draw() {
  background(0);
  stroke(255);
  noFill();
  //Store the fft data

  translate(width / 2, height / 2); //Move to the center of the screen


  var wave = fft.waveform();

  //Instead of draw two half circle, use a loop function
  for (var t = -1; t <= 1; t += 2) { //t needs to be -1 and 1

    //Use beginshape and endshape to make all points connected by a line
    beginShape();
    //Looping through the waveform data to create the wave on canva
    for (let i = 0; i <= 180; i += 0.5) { //180 indicates for 180 degrees, which is the half circle
      //Use floor to make sure the mapped value is an integer
      var index = floor(map(i, 0, 180, 0, wave.length - 1));
      var r = map(wave[index], -1, 1, height / 6, height / 3); //The last two arguments is the min and max radius, the 2nd and 3rd ctrl the amplitude
      var x = r * sin(i) * t; //When t is -1, it draws the left half and 1 for the right half
      var y = r * cos(i);
      vertex(x, y);
    }
    endShape();
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