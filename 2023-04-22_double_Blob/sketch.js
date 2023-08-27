// for ccapture
let numFrames = 3000 * 15; // think of fraem rate 
//let numFrames = 50;
let capture;
let record = false;

// blob variables
let noiseMax  = 1;
let zoff = 0;
let tx = 0; //offset in 1d perlin noise
let ty = 1000;// 1000

function setup() {
let canvas = createCanvas(900, 700);
//let canvas = createCanvas(3840, 2160); // 4K 
//let canvas = createCanvas(1920, 1080); // HD

canvas.id('canvas');
capture = new CCapture( { format: 'png',
                          autoSaveTime: 60, // auto save every 20 min! chrome can only download 1GB of frames
                          name: '26-04-22_blob_frames_SaveTime' } );

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
      ///// DRAW PART
      //noiseSeed(99);
        background(0);
        translate( width/2 , height/2 ); 

        let walkX = map( noise(tx),0,1, -width/4, width/4);
        let walkY = map( noise(ty),0,1, -height/4 ,height/4);

        beginShape();
        let stretch_angle = 0;
        for(let a = 0; a < TWO_PI; a += 0.005) {
        
          let xoff = map( cos(a), -1, 1, 0, noiseMax); // walk in circle - polar to  cartesian
          let yoff = map( sin(a), -1, 1, 0,  noiseMax);

          let r = map( noise(xoff,yoff,zoff), 0, 1, 0, 1200);
        
          let stretchX = map(cos(a), -1, 1, 0, 800);
          stretchX  = stretchX * (sin(noise(zoff)))
          //stretchX  = stretchX * sin(stretch_angle);

          let  x = r * cos(a) + stretchX + walkX;
          let  y = r * sin(a) + walkY;
          
          ///NO WALKING
          vertex(x , y );

          stretch_angle  += 0.005;

          /// WALKING 
          //vertex(x + walkX , y + walkY);
        }
        endShape(CLOSE);
        
        zoff += 0.0009; 
        tx += 0.0003; // random walk speed
        ty += 0.0003;

      //// end of draw part

      capture.capture(document.getElementById('canvas'));
    }
  else 
    {
      background(0);
      translate( width/2 , height/2 ); 

      let walkX = map( noise(tx),0,1, -width/4, width/4);
      let walkY = map( noise(ty),0,1, -height/4 ,height/4);

      beginShape();
      let stretch_angle = 0;
      for(let a = 0; a < TWO_PI; a += 0.005) {
      
      let xoff = map( cos(a), -1, 1, 0, noiseMax); // walk in circle - polar to  cartesian
      let yoff = map( sin(a), -1, 1, 0,  noiseMax);

      let r = map( noise(xoff,yoff,zoff), 0, 1, 0, 1200);
      
        let stretchX = map(cos(a), -1, 1, 0, 800);
        stretchX  = stretchX * (sin(noise(zoff)))
        //stretchX  = stretchX * sin(stretch_angle);

        let  x = r * cos(a) + stretchX + walkX;
        let  y = r * sin(a) + walkY;
        
        ///NO WALKING
        vertex(x , y );

        stretch_angle  += 0.005;

        /// WALKING 
        //vertex(x + walkX , y + walkY);
      }
      endShape(CLOSE);
      
      zoff += 0.0009; 
      tx += 0.0003; // random walk speed
      ty += 0.0003;
    }
}


