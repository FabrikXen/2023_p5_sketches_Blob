// for ccapture
let numFrames = 3000 * 15; // think of frame rate 
let capture;
let record = false; /// SET TO TRUE FOR CCAPTURE

// blob variables
let noiseMax  = 1;
let zoff = 0;
let tx = 0; //offset in 1d perlin noise
let ty = 1000;
let xstretch_phase = 0;
let noise_radius = 1;

let loops = 0; 

function setup() {
let canvas = createCanvas(900, 700); 
//let canvas = createCanvas(3840, 2160); // 4K 
//let canvas = createCanvas(1920, 1080); // HD

canvas.id('canvas');
capture = new CCapture( { format: 'png',
                          autoSaveTime: 60, // auto save every 20 min! chrome can only download 1GB of frames
                          name: '23-05-10_contained_blob_frames_version3' } );

frameRate(50); // 50 fps, 3000 frames per mimute
}

function draw() {
  if (record) 
    {
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
      //////// DRAW PART
      background(0);
      translate( width/2, height/2 ); 
      let walkX = map( noise(tx), 0, 1, -width/3, width/3);// noise values in 1d perlin noise
      let walkY = map( noise(ty), 0, 1, -height/2, height/2);// starting at different offsets
      let contained_xstretch_range = (width-height)/2; // radius goes to height/2, x can stretch still width/2 - height/2 to still be inside box
      
      beginShape();
        for(let a = 0; a < TWO_PI; a += 0.005) // 0.005 
          {
          let xoff = map( noise_radius * cos(a), -1 * noise_radius, 1 * noise_radius, 0, noiseMax); // walk in circle - polar to  cartesian
          let yoff = map( noise_radius * sin(a), -1 * noise_radius, 1 * noise_radius, 0, noiseMax); // cos(a),sin(a) = (x, y) in circle in noise field
          let r = map( noise(xoff, yoff, zoff), 0, 1, 0, height/2); // radius varies between 0 and height/2, height < width and needs to be contained
          let stretchX = map( cos(xstretch_phase), -1, 1, 0, contained_xstretch_range); // extra strech in x direction, cos(a) is x value on unit circle, max  at 0 deg and 180 deg, in this case stretchx from -100 to 100            
          let  x = (r + stretchX) * cos(a) + walkX;
          let  y = r * sin(a) + walkY;
          vertex( x, y); 
          }
      endShape(CLOSE);
      
      zoff += 0.0015; 
      tx += 0.0004; //random walk speed
      ty += 0.0004;
      xstretch_phase += 0.003;
      noise_radius += 0.2;
     ///////// END OF RECORDED DRAW PART

      capture.capture(document.getElementById('canvas'));
    }
  else 
    {
     // if ( loops <= 5000 ) {
      background(0);
      translate( width/2, height/2 ); 
      let walkX = map( noise(tx), 0, 1, -width/3, width/3);// noise values in 1d perlin noise
      let walkY = map( noise(ty), 0, 1, -height/2, height/2);// starting at different offsets
      let contained_xstretch_range = (width-height)/2; // radius goes to height/2, x can stretch still width/2 - height/2 to still be inside box
      
      beginShape();
        for(let a = 0; a < TWO_PI; a += 0.005) // 0.005 
          {
          let xoff = map( noise_radius * cos(a), -1 * noise_radius, 1 * noise_radius, 0, noiseMax); // walk in circle - polar to  cartesian
          let yoff = map( noise_radius * sin(a), -1 * noise_radius, 1 * noise_radius, 0, noiseMax); // cos(a),sin(a) = (x, y) in circle in noise field
          let r = map( noise(xoff, yoff, zoff), 0, 1, 0, height/2); // radius varies between 0 and height/2, height < width and needs to be contained
          let stretchX = map( cos(xstretch_phase), -1, 1, 0, contained_xstretch_range); // extra strech in x direction, cos(a) is x value on unit circle, max  at 0 deg and 180 deg, in this case stretchx from -100 to 100            
          let  x = (r + stretchX) * cos(a) + walkX;
          let  y = r * sin(a) + walkY;
          vertex( x, y); 
          }
      endShape(CLOSE);
      
      zoff += 0.0015; 
      tx += 0.0004; //random walk speed
      ty += 0.0004;
      xstretch_phase += 0.003;
      noise_radius += 0.2;
     
      // } else {
      //   noLoop();
      //  }
      // loops++;
    
    }
}
