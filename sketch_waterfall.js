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

var resolveWin = 0;
var animA = 60;
var animB = animA + 30;
var animC = animB + 60;
var animD = animC + resolveWin;

var animPreset0 = 0;
var animPreset1 = 0;
var offsetTexture = true;
var animMode = 0;

var underWidth, underHeight;

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
var animateToggle = false;

var staggerX = true;
var staggerY = false;

var selFont = 16;

function preload(){
  // tFont[0] = loadFont("resources/Inter-Medium.ttf");
  // tFont[1] = loadFont("resources/Geist-ExtraBold.ttf");
  // tFont[2] = loadFont("resources/Evans-Narrow-Bold-Italic.otf");
  // tFont[3] = loadFont("resources/Heading-Now-45-Medium.otf");
  // tFont[4] = loadFont("resources/NeueWorld-CondensedRegular.ttf");
  tFont[0] = loadFont("resources/Spectral-ExtraBold Italic-Desktop.otf");
  tFont[1] = loadFont("resources/PPEditorialNew-UltraboldItalic.otf");
  tFont[2] = loadFont("resources/NewSpirit-BoldCondensed.otf");
  tFont[3] = loadFont("resources/FETTEFRA.TTF");
  tFont[4] = loadFont("resources/Times New Roman Bold Italic.ttf");
  tFont[5] = loadFont("resources/Comic Sans MS Bold.ttf");

  tFont[6] = loadFont("resources/ManukaCondensed-Bold.otf");
  tFont[7] = loadFont("resources/ManukaCondensed-Black.otf");
  tFont[8] = loadFont("resources/ManukaCondensed-Ultra.otf");
  tFont[9] = loadFont("resources/SohneSchmal-Dreiviertelfett.otf");
  tFont[10] = loadFont("resources/Superheat-ExtraBold.otf");
  tFont[11] = loadFont("resources/Superheat-Black.otf");
  tFont[12] = loadFont("resources/Triade-Upright.otf");
  tFont[13] = loadFont("resources/Triade-Slanted.otf");
  tFont[14] = loadFont("resources/Triade-Backslant.otf");

  tFont[15] = loadFont("resources/AtlanticTRIAL-Regular.otf");
  tFont[16] = loadFont("resources/AtlanticTRIAL-Sharp-Left.otf");

  // tFontFactor[0] = 0.75;
  // tFontFactor[1] = 0.75;
  // tFontFactor[2] = 0.8;
  // tFontFactor[3] = 0.75;
  // tFontFactor[4] = 0.72;
  tFontFactor[0] = 0.7;
  tFontFactor[1] = 0.8;
  tFontFactor[2] = 0.75;
  tFontFactor[3] = 0.9;
  tFontFactor[4] = 0.72;
  tFontFactor[5] = 0.8;

  tFontFactor[6] = 0.74;
  tFontFactor[7] = 0.74;
  tFontFactor[8] = 0.74;
  tFontFactor[9] = 0.72;
  tFontFactor[10] = 0.72;
  tFontFactor[11] = 0.72;
  tFontFactor[12] = 0.73;
  tFontFactor[13] = 0.73;
  tFontFactor[14] = 0.73;

  tFontFactor[15] = 0.76;
  tFontFactor[16] = 0.76;

  defaultImage = loadImage("resources/glencoe.jpg");
  sizedImage = defaultImage;
  userImage = null;
}

function setup(){
  canvasContainer = document.getElementById('canvas-container');

  mainCanvas = createCanvas(windowWidth, windowHeight);

  mainCanvas.parent(canvasContainer);

  document.getElementById("textArea").value = starterText;

  bkgdColor = color("#000000");
  foreColor = color("#ffffff");
  colorSet[0] = color('#ffffff');
  colorSet[1] = color('#f20f0f');
  colorSet[2] = color('#36bf7f');
  colorSet[3] = color('#491bf2');
  colorSet[4] = color('#6d1bbf');

  wWindowMin = underWidth/8,
  wWindowMax = underWidth;
  wWindow = map(scaler, 0, 1, wWindowMin, wWindowMax);

  windowResized();
  sizedImage.resize(underWidth, underHeight);

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
    translate(width/2, height/2);
    scale(previewScaler);
    translate(-underWidth/2, -underHeight/2);
    
    // translate(width/2, height/2);
    // scale(0.2);
    // translate(-width/2, -height/2);

    // image(corePG, 0, 0);
    // image(sizedImage, 0, 0);

    // if(imageOnlyToggle){
    //   image(mainGraphic, 0, 0);
    // } else {
      push();
        for(var m = 0; m < sands.length; m++){
          sands[m].run();
        }
      pop();
    // }

    // blend(sizedImage, 0, 0, width, height, 0, 0, width, height, SCREEN);
    if(imageForeToggle){
      if(imageInvertToggle){
        blend(sizedImage, 0, 0, underWidth, underHeight, 0, 0, underWidth, underHeight, SCREEN);
      } else {
        blend(sizedImage, 0, 0, underWidth, underHeight, 0, 0, underWidth, underHeight, MULTIPLY);
      }
    }
  pop();

  // blendMode(MULTIPLY);
  // background(255);

  // textSize(10);
  // textFont(tFont[0]);
  // noStroke();
  // fill(foreColor);
  // text(round(frameRate()), 20, 20);

  runRecording();
}

function analyzeText(){
  sands = [];

  for(var m = 0; m <= (underWidth)/sandRes; m++){
    for(var n = 0; n <= (underHeight)/sandRes; n++){
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