var song;
var fft;
var particles = []; //Keep track of particles

//Preload the mp3 file to the 'song'varible
function preload() {
  song = loadSound('Asset/Abel Korzeniowski - Satin Birds.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  colorMode(HSB);
  fft = new p5.FFT();
}

function draw() {
  background(0);
  fill(10);
  noStroke();
  strokeWeight(5);
  noFill();


  translate(width / 2, height / 2); //Move to the center of the screen


  var wave = fft.waveform();//Store the fft data

  //Instead of draw two half circle, use a loop function
  for (var t = -1; t <= 1; t += 2) { //t needs to be -1 and 1

    //Use beginshape and endshape to make all points connected by a line
    beginShape();
    //Looping through the waveform data to create the wave on canva
    for (let i = 0; i <= 180; i += 0.5) { //180 indicates for 180 degrees, which is the half circle
      //Use floor to make sure the mapped value is an integer
      var index = floor(map(i, 0, 180, 0, wave.length - 1));
      var r = map(wave[index], -1, 1, height / 6, height / 3); //The last two arguments is the min and max radius
      var x = r * sin(i) * t; //When t is -1, it draws the left half and 1 for the right half
      var y = r * cos(i);

      stroke(i * 2, 255, 255);

      // Create lines with a larger increment
      if (i % 4 === 0) {
        line(0, 0, x, y);
      }
      stroke(255);
      vertex(1.5 * x, 1.5 * y);

    }
    endShape();
  }


  //Create particle every frame
  var p = new Particle();
  particles.push(p); //push particle to array

  //call the show()
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].show();
  }
}

//A function to let user use mouse click to play the song
function mouseClicked() {
  if (song.isPlaying()) {
    song.pause();
    noLoop() //Use loop and noloop to pause
  }
  else {
    song.play();
    loop()
  }
}

//Create particle around the circle
class Particle {
  constructor() {
    this.pos = p5.Vector.random2D().mult(250); //Make the particle at random postion
    //Add velocity and acceleration
    this.vel = createVector(0, 0); //Strat at 0
    this.acc = this.pos.copy().mult(random(0.0001, 0.00001)); //Use copy() to ensure same direction

    this.w = random(3, 5); //random width
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel); //Add acceleration to velocity and velocity to postion
  }


  show() {
    noStroke();
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.w); //Draw the elipse

  }

}