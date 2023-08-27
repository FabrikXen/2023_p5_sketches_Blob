// * num for amount of minutes
let numFrames = 3600 * 0.5;
let capture;
let record = false;

// blob variables
let noiseMax = 1;
let zoff = 0;

let xoff1 = 0;
let xoff2 = 1000;

function setup() {
  //let canvas = createCanvas(3840, 2160); // 4K 
  let canvas = createCanvas(1920, 1080);
  canvas.id('canvas');
  capture = new CCapture( { format: 'png', name: '23-04-22_blob_frames' } ); 
}

function draw() {

    if ( record === true ) {
      if (frameCount === 1) {
        capture.start();
        console.log('starting recording');
      }
      console.log(frameCount);
      if (frameCount === numFrames) {
        console.log('done recording');
        noLoop();
        capture.stop();   // stop recording
        capture.save();   // and prompt us to save the frames
        return;
      }
      ///// DRAW PART
      background(0);
      translate( width/2 , height/2 ); 
      drawBlob(0.0009, 0.0008);
      ///// END OF DRAW PART
    
      capture.capture(document.getElementById('canvas'));

    } else {
      background(0);
      translate( width/2 , height/2 ); 
      drawBlob(0.0009, 0.0008);
      ///// END OF DRAW PART
    }
}

function drawBlob(a_inc, zoff_inc) {
  
  beginShape();
  for (let a = 0; a < TWO_PI; a += a_inc) {

    let xoff = map( cos(a), -1, 1, 0, noiseMax);
    let yoff = map( sin(a), -1, 1, 0, noiseMax);

    let r = map( noise(xoff, yoff, zoff), 0, 1, width*0, width*0.8); 
  
    let x = r * cos(a) ;
    let y = r  * sin(a);
    
    vertex(x, y);
  }
  endShape(CLOSE);
  zoff += zoff_inc;

}
