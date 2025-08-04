////////////////////////////////////////
/////////////////////////// TYPE SIZES
////////////////////////////////////////
 
function setText(){
  print("NEW!");
  var enteredText = document.getElementById("textArea").value;
  
  inputText = "";
  inputText = enteredText.match(/[^\r\n]+/g);

  if(enteredText == ""){
    print("SHORT EXECUTED! and inputText is " + inputText);
    inputText = [];
    inputText[0] = " ";
  }

  coreCount = inputText.length;

  findMaxSize();

  // pg = [];
  // for(var m = 0; m < inputText.length; m++){
  //   drawText(m);
  // }

  drawCorePG();

  analyzeText();
}

function findMaxSize(){
  var testerSize = 100;
  textSize(testerSize);
  textFont(tFont[selFont]);
  
  ///////// FIND THE LONGEST LINE
  var longestLine = 0;
  var measurer = 0;

  for(var m = 0; m < inputText.length; m++){
    var tapeMeasurer = textWidth(inputText[m]);

    if(tapeMeasurer > measurer){
      longestLine = m;
      measurer = tapeMeasurer;
    }
  }
  // print("LONGLEST LINE IS:" + longestLine + " which reads: " + inputText[longestLine]);

  ///////// FIND THE SIZE THAT FILLS TO THE MAX WIDTH
  var widthTest = wWindow;

  let sizeHolder = 2;
  textSize(sizeHolder);
  let holdW = 0;

  while(holdW < widthTest){
    textSize(sizeHolder);
    holdW = textWidth(inputText[longestLine]);

    sizeHolder += 2;
  }
  pgTextSize = sizeHolder;

  ///////// MAKE SURE THE HEIGHT DOESN'T BRAKE THE HEIGHT
  var heightTest = (height - 100) - (inputText.length - 1) * leading;
  let holdH = inputText.length * sizeHolder * tFontFactor[selFont];
  while(holdH > heightTest){
    holdH = inputText.length * sizeHolder * tFontFactor[selFont];
    sizeHolder -= 2;
  }
  pgTextSize = sizeHolder;

  textSize(pgTextSize);
  fullH = inputText.length * pgTextSize * tFontFactor[selFont] + (inputText.length - 1) * leading;
  fullW = textWidth(inputText[longestLine]);
}

function setFont(val){
  selFont = val;

  console.log("CHANGED!");

  setText();
}

function setScaler(val){
  scaler = map(val, 0, 100, 0.1, 1);

  wWindow = map(scaler, 0, 1, wWindowMin, wWindowMax);
  
  setText();
}


////////////////////////////////////////
/////////////////////////// CANVAS SIZE
////////////////////////////////////////

function setCanvasSize(val){
  sizeType = val;

  if(val == 4){
    document.getElementById("customSizeInputs").style.display = "flex";
  } else {
    document.getElementById("customSizeInputs").style.display = "none"; 
  }

  if(val == 5){
    runUserReset();
  }

  windowResized();

}

function setCustomW(val){
  customW = val;

  windowResized();
}

function setCustomH(val){
  customH = val;

  windowResized();
}

function setImageForeToggle(){
  let checkbox = document.getElementById("imageForeToggle");
  imageForeToggle = checkbox.checked ? true : false;

  if(imageForeToggle){
    document.getElementById("imageFore").style.display = "flex";
    document.getElementById("colorFore").style.display = "none";
    setImageInvertToggle();

  } else {
    document.getElementById("imageFore").style.display = "none";
    document.getElementById("colorFore").style.display = "flex";

    bkgdColor = color(document.getElementById('bkgdColor').value);
    foreColor = color(document.getElementById('foreColor').value);

  }

  // analyzeText();
}

function setBkgdColor(val){
  bkgdColor = color(val);
}

function setForeColor(val){
  foreColor = color(val);
}

function setUserSize(val){
  userSize = map(val, 0, 100, 0.25, 4);
}

function setUserXoffset(val){
  userXoffset = map(val, 0, 100, -mainGraphic.width * 3/4, mainGraphic.width * 3/4);
}

function setUserYoffset(val){
  userYoffset = map(val, 0, 100, -mainGraphic.height * 3/4, mainGraphic.height * 3/4);
}

function setSandRes(val){
  sandRes = int(map(val, 0, 100, 20, 3));
  document.getElementById('sandResInput').value = sandRes;

  console.log("SAND RES IS NOW: " + sandRes)

  analyzeText();
}

function setSandResInput(val){
  sandRes = val;
  document.getElementById('sandRes').value = int(map(sandRes,20, 3, 0, 100));

  console.log("SAND RES IS NOW: " + sandRes)

  analyzeText();
}

function setSWfactor(val){
  swFactor = map(val, 0, 100, 0.1, 2);
  document.getElementById('swFactorInput').value = swFactor;

  for(var m = 0; m < sands.length; m++){
    sands[m].tweak();
  }
}

function setSWfactorInput(val){
  swFactor = val;
  document.getElementById('swFactor').value = map(swFactor, 0.1, 2, 0, 100);

  for(var m = 0; m < sands.length; m++){
    sands[m].tweak();
  }
}

function setImageInvertToggle(){
  let checkbox = document.getElementById("imageInvertToggle");
  imageInvertToggle = checkbox.checked ? true : false;

  if(imageInvertToggle){
    bkgdColor = color("#ffffff");
    foreColor = color("#000000");
  } else {
    bkgdColor = color("#000000");
    foreColor = color("#ffffff");
  }

}

function setStaggerX(){
  let checkbox = document.getElementById("staggerXgrid");
  staggerX = checkbox.checked ? true : false;

  analyzeText();
}

function setStaggerY(){
  let checkbox = document.getElementById("staggerYgrid");
  staggerY = checkbox.checked ? true : false;

  analyzeText();
}

function setOffsetTextureToggle(){
  let checkbox = document.getElementById("textureOffset");
  offsetTexture = checkbox.checked ? true : false;

  analyzeText();
}

function setAnimMode(val){
  animMode = val;

  if(animMode == 0){
    resolveWin = 0;
  } else {
    resolveWin = 60;
  }
  animD = animC + resolveWin;

  console.log("ANIM MODE IS NOW: " + animMode);

  analyzeText();
}

function setAnimPreset0(val){
  animPreset0 = val;

  analyzeText();
}


function setAnimPreset1(val){
  animPreset1 = val;

  analyzeText();
}

function runUserReset(){
  userSize = 1;
  document.getElementById("userSize").value = map(1, 0.25, 4, 0, 100);
  userXoffset = 0;
  document.getElementById("userXoffset").value = 50;
  userYoffset = 0;
  document.getElementById("userYoffset").value = 50;

  console.log("RESET RUN");

}

// function setAnimateToggle(){
//   let checkbox = document.getElementById("animateToggle");
//   animateToggle = checkbox.checked ? true : false;

//   if(animateToggle){
//     document.getElementById("animateOption").style.display = "block";

//     document.getElementById("saveFileType").value = 2;
//     setSaveFileType(2);

//     figureNumFrames();

//   } else {
//     document.getElementById("animateOption").style.display = "none";

//     document.getElementById("saveFileType").value = 0;
//     setSaveFileType(0);
//   }

//   makeDots();
//   // loop();
// }

function figureNumFrames(){
//   var smallest = width;
//   if(height < width){
//     smallest = height;
//   }

//   var numberOfHalves = Math.ceil(Math.log2(smallest / dotMinSize));
//   console.log("Number of halves: " + numberOfHalves);

//   numFrames = numberOfHalves * int(animWin + animWin/2);
//   var span = document.getElementById("numFrames");
//   span.textContent = numFrames;
// }

// function setIndRadiToggle(){
//   let checkbox = document.getElementById("indRadiToggle");
//   indRadiToggle = checkbox.checked ? true : false;

//   if(indRadiToggle){
//     document.getElementById('coreResRadiSettings').style.display = "none";
//     document.getElementById('indResRadiSettings').style.display = "block";
//   } else {
//     document.getElementById('coreResRadiSettings').style.display = "block";
//     document.getElementById('indResRadiSettings').style.display = "none";    
//   }
  numFrames = animD;

  analyzeText();
}

function setImageOnlyToggle(){
  let checkbox = document.getElementById("imageOnlyToggle");
  imageOnlyToggle = checkbox.checked ? true : false;
}

//////////////////////////////////////////////////////////////////////// UPLOAD OPTIONS


function setUploadImage(inputElement) {
  const selectedFile = document.getElementById('uploadImage');
  const file = selectedFile.files[0];
  
  if (file) {
      // fileName.textContent = file.name;
      
      // Create object URL from the file
      const fileURL = URL.createObjectURL(file);
      console.log('Created file URL:', fileURL);
      
      // First disable the current userImg
      userImage = null;
      imageLoaded = false;
      
      // Then load the new image, with a small delay to ensure proper loading
      setTimeout(() => {
          loadImage(fileURL, function(loadedImg) {
              if (loadedImg && loadedImg.width > 1) {
                  userImage = loadedImg;
                  imageLoaded = true;
                  // Log the dimensions to verify they're loaded correctly
                  console.log('Loaded image dimensions:', loadedImg.width, 'x', loadedImg.height);

                  sizedImage = userImage;
                  sizedImage.resize(width,height);

                  document.getElementById('uploadedImage').innerHTML = selectedFile.files[0].name;
                  document.getElementById('uploadedImage').style.display = "block";

                } else {
                  console.error('Image loaded but with invalid dimensions:', 
                      loadedImg ? `${loadedImg.width}x${loadedImg.height}` : 'undefined');
              }
              // Revoke the object URL to free memory
              URL.revokeObjectURL(fileURL);
          }, function(e) {
              // Error callback
              console.error('Error loading image:', e);
              URL.revokeObjectURL(fileURL);
          });
      }, 100);
  }
}

//////////////////////////////////////////////////////////////////////// EXPORT OPTIONS

function setSaveFileType(val){
  saveFileType = val;

  // if(animateToggle){
  //   if(val == 0 || val == 1 || val == 3){
  //     document.getElementById("animateToggle").checked = false;
  //     setAnimateToggle();
      
  //   }
  // }

  // if(val == 0 || val == 3){
  //   document.getElementById("alphaBkgdOption").style.display = "flex";

  // } else {
  //   document.getElementById("alphaBkgdOption").style.display = "none";

  //   document.getElementById("alphaBkgdToggle").checked = false;
  //   setAlphaBkgdToggle();
  // }

  if(val == 2){
    document.getElementById("motionOptions").style.display = "flex";

    // if(animateToggle == false){
    //   animateToggle = true;
    //   document.getElementById("animateToggle").checked = "true";
    //   document.getElementById("animateOption").style.display = "block";

    // }
    // makeDots();

  } else {
    document.getElementById("motionOptions").style.display = "none";

  }



}

function runExport(){
  if(saveFileType == 2){
    ticker = 0;
    
    runSave();        ////////// in recording.js

  } else {
    staticSaving = true;

    resizeForSave();

    if(saveFileType == 0){
      console.log("SAVE PNG! W: " + width + ", H: " + height);
      save('inscript25_static.png');

    } else if(saveFileType == 1){
      console.log("SAVE JPG! W: " + width + ", H: " + height);
      save('inscript25_static.jpg');

    }
  
    staticSaving = false;

    resizeForPreview();
  }
}