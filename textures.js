//////////////////////////////////////////////
/////////////////////////////       DRAW
//////////////////////////////////////////////

//////////////////////////////////////////////
/////////////////////////////       TEXT
//////////////////////////////////////////////

function drawCorePG(){   // straight text
  // var w = holdW * 1.1;
  var w = width;
  var h = height;
  // var h = (inputText.length) * pgTextSize * tFontFactor[selFont] * 1.1;

  console.log("CORE PG IS: " + w + " by " + h);

  corePG = createGraphics(w, h);
  corePG.background(0);
  corePG.noStroke();
  // pg[p].fill(colorSet[p%colorSet.length]);
  corePG.fill(255);
  // corePG.stroke(255);
  // corePG.strokeWeight(3);
  corePG.textFont(tFont[selFont]);
  corePG.textSize(pgTextSize);
  corePG.textAlign(CENTER);
  corePG.push();
    corePG.translate(w/2, h/2);
    // corePG.scale(1, 1.7);
    corePG.translate(0, -(inputText.length - 1) * pgTextSize * tFontFactor[selFont]/2);
    corePG.translate(0, -(inputText.length - 1) * leading/2 );
    for(var m = 0; m < inputText.length; m++){
      corePG.push();
        corePG.translate(0, m * pgTextSize * tFontFactor[selFont]);
        corePG.translate(0, m * leading);
        corePG.text(inputText[m], 0, pgTextSize * tFontFactor[selFont]/2);
      corePG.pop();
    }
  corePG.pop();
}