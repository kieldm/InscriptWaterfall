var bkgdColor, foreColor;
var colorSet = [];

var saveFileType = 0;

var sizeType = 0;
var previewScaler = 1;

var starterText = "INSCRIPT\nTYPE+TECH\nFESTIVAL";

var inputText = [];

var corePG;
var pg;
var tFont = [];
var tFontFactor = [];
var pgTextSize = 300;
var scaler = 0.9;
var leading = 10;
var tracking = 0;

var sands = [];
var sandRes = 10;

var animA = 60;
var animB = animA + 30;
var animC = animB + 60;

var animPreset0 = 0;
var animPreset1 = 0;
var offsetTexture = true;
var animMode = 0;

var customW = 1080;
var customH = 1350;

var defaultImage, userImage;
var sizedImage;
var imageLoaded = false;
var mainGraphic;
var imageOnlyToggle = false;
var imageForeToggle = false;
var imageInvertToggle = false;

var userSize = 1;
var userXoffset = 0;
var userYoffset = 0;

var swFactor = 0.7;

var cwidth, cheight;
var thisDensity = 1;
var recMessageOn = false;
var recording = false;
var recordedFrames = 0;
var numFrames = 150;
var frate = 30;

var debugToggle = false;

var mainCanvas;
var canvasContainer; 

var staticSaving = false;

var staggerX = true;
var staggerY = false;

var selFont = 3;

function preload(){
  tFont[0] = loadFont("resources/Inter-Medium.ttf");
  tFont[1] = loadFont("resources/Geist-ExtraBold.ttf");
  tFont[2] = loadFont("resources/Evans-Narrow-Bold-Italic.otf");
  tFont[3] = loadFont("resources/Heading-Now-45-Medium.otf");
  tFont[4] = loadFont("resources/NeueWorld-CondensedRegular.ttf");

  tFontFactor[0] = 0.75;
  tFontFactor[1] = 0.75;
  tFontFactor[2] = 0.8;
  tFontFactor[3] = 0.75;
  tFontFactor[4] = 0.72;

  defaultImage = loadImage("resources/glencoe.jpg");
  sizedImage = defaultImage;
  userImage = null;
}

function setup(){
  canvasContainer = document.getElementById('canvas-container');

  mainCanvas = createCanvas(windowWidth, windowHeight);

  mainCanvas.parent(canvasContainer);

  sizedImage.resize(width,height);

  document.getElementById("textArea").value = starterText;

  bkgdColor = color("#000000");
  foreColor = color("#ffffff");
  colorSet[0] = color('#ffffff');
  colorSet[1] = color('#f20f0f');
  colorSet[2] = color('#36bf7f');
  colorSet[3] = color('#491bf2');
  colorSet[4] = color('#6d1bbf');

  wWindowMin = width/8,
  wWindowMax = width;
  wWindow = map(scaler, 0, 1, wWindowMin, wWindowMax);

  windowResized();

  thisDensity = pixelDensity();
  cwidth = width;
  cheight = height;

  rectMode(CENTER);
  // imageMode(CENTER);
  textureMode(NORMAL);
  strokeCap(ROUND);
  strokeJoin(ROUND);

  frameRate(frate);

  setText();
}

function draw() {
  background(bkgdColor);
  
  // console.log(previewScaler)

  push();
    // translate(width/2, height/2);
    // scale(previewScaler);
    // translate(-width/2, -height/2);

    // image(corePG, width/2, height/2);

    // if(imageOnlyToggle){
    //   image(mainGraphic, 0, 0);
    // } else {
      push();
        for(var m = 0; m < sands.length; m++){
          sands[m].run();
        }
      pop();
    // }
  pop();

  // blend(sizedImage, 0, 0, width, height, 0, 0, width, height, SCREEN);
  if(imageForeToggle){
    if(imageInvertToggle){
      blend(sizedImage, 0, 0, width, height, 0, 0, width, height, SCREEN);
    } else {
      blend(sizedImage, 0, 0, width, height, 0, 0, width, height, MULTIPLY);
    }
  }

  // blendMode(MULTIPLY);
  // background(255);

  textSize(10);
  textFont(tFont[0]);
  noStroke();
  fill(foreColor);
  text(round(frameRate()), 20, 20);

  runRecording();
}

function analyzeText(){
  sands = [];

  for(var m = 0; m <= corePG.width/sandRes; m++){
    for(var n = 0; n <= corePG.height/sandRes; n++){
      var x = m * sandRes;
      if(staggerX){ x += (n%2) * sandRes/2; }

      var y = n * sandRes;
      if(staggerY){ y += (m%2) * sandRes/2; }

      var getColor = corePG.get(x, y);
      var getBright = brightness(getColor);

      // if(getBright > 10){
        // x += width/2;
        // y += height/2;

        // x -= corePG.width/2;
        // y -= pg.length * corePG.height/2;

        // y += p * corePG.height;

        var spiller = false;
        if(getBright > 10){
          spiller = true;
        }
        sands[sands.length] = new Spill(x, y, spiller);

      // }
    }
  }

}