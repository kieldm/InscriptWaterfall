class Spill {
  constructor(x, y, spiller){
    this.xOrg = x;
    this.yOrg = y;

    this.spiller = spiller;

    this.p1 = createVector(this.xOrg, this.yOrg);
    this.p2 = createVector(this.xOrg, this.yOrg);
    this.p3 = createVector(this.xOrg, this.yOrg);
    this.p4 = createVector(this.xOrg, this.yOrg);
    this.p5 = createVector(this.xOrg, this.yOrg);

    this.ang0;
    this.t1 = createVector(this.xOrg, this.yOrg - height);
    this.t2 = createVector(this.xOrg, this.yOrg + height);

    this.sw = 0;
    this.swOrg = sandRes * swFactor;
    this.swTar = 25;

    this.indA = 0;
    this.indB = 0;

    this.ticker = 0;
    
    this.build();
  }

  build(){
    this.ticker = 0;

    if(this.spiller){
      this.swOrg = sandRes * swFactor;
    } else {
      this.swOrg = 0;
    }
    this.swTar = sandRes * 2;

    // INTRO STAGGER
    if(animPreset0 == 0){
      var tk0 = dist(this.xOrg, this.yOrg, width/2, height/2);
      this.indA = constrain(map(tk0, 0, width/2, animA, 0), 0, animA);

    } else if(animPreset0 == 1){
      var tk0 = dist(0, this.yOrg, 0, height/2 - fullH/2);
      this.indA = constrain(map(tk0, 0, height, 0, animA), 0, animA);

    }

    // OUTRO STAGGER
    if(animPreset1 == 0){
      var tk0 = dist(this.xOrg, this.yOrg, width/2, height/2);
      this.indB = constrain(map(tk0, 0, width/2, 0, animA), 0, animA);

    } else if(animPreset1 == 1){
      var tk0 = dist(0, this.yOrg, 0, height/2 - fullH/2);
      this.indB = constrain(map(tk0, 0, height, animA, 0), 0, animA);
      
    }

    if(offsetTexture){
      this.indA -= map(noise(this.xOrg * 0.01, this.yOrg * 0.01), 0, 1, 0, animA * 2/3);
      this.indB -= map(noise(this.xOrg * 0.01, this.yOrg * 0.01), 0, 1, 0, animA * 2/3);
    
    }

    this.t1.set(this.xOrg, -150);
    this.t2.set(this.xOrg, height + 150);
    // this.t1.set(this.xOrg, this.yOrg - height);
    // this.t2.set(this.xOrg, this.yOrg + height);
  }

  tweak(){
    if(this.spiller){
      this.swOrg = sandRes * swFactor;
    } else {
      this.swOrg = 0;
    }
    this.swTar = sandRes * 2;
  }

  reset(){
    this.ticker = 0;

    this.p1 = createVector(this.xOrg, this.yOrg - height);
    this.p2 = createVector(this.xOrg, this.yOrg - height);
    this.p3 = createVector(this.xOrg, this.yOrg - height);
    // this.p4 = createVector(this.xOrg, -100);
    // this.p5 = createVector(this.xOrg, -100);
  }

  run(){
    this.update();
    this.display();
  }

  update(){
    var tarX = this.t1.x;
    var tarY = this.t1.y;

    if(this.ticker < 0){
      tarX = this.t1.x;
      tarY = this.t1.y;
      this.sw = this.swOrg;

    } else if (this.ticker <= animA - this.indA){
      var tk0 = map(this.ticker, 0, animA - this.indA - 1, 0, 1);
      var tk1 = easeInOutExpo(tk0);

      tarX = map(tk1, 0, 1, this.t1.x, this.xOrg);
      tarY = map(tk1, 0, 1, this.t1.y, this.yOrg);
      this.sw = this.swOrg;

    } else if(this.ticker < animB + this.indB){    
      tarX = this.xOrg;
      tarY = this.yOrg;
      this.sw = this.swOrg;

    } else if(this.ticker < animC){
      var tk0 = map(this.ticker, animB + this.indB, animC - 1, 0, 1);
      var tk1 = easeInOutExpo(tk0);

      if(animMode == 0){
        tarX = map(tk1, 0, 1, this.xOrg, this.t2.x);
        tarY = map(tk1, 0, 1, this.yOrg, this.t2.y);
        this.sw = this.swOrg;

      } else {
        tarX = this.xOrg;
        tarY = this.yOrg;
        this.sw = map(tk1, 0, 1, this.swOrg, this.swTar);

      }

    } else {
      this.reset();
    }

    this.ticker ++;


    // this.p5.set(this.p4.x, this.p4.y)
    // this.p4.set(this.p3.x, this.p3.y)
    this.p3.set(this.p2.x, this.p2.y);
    this.p2.set(this.p1.x, this.p1.y);

    // this.p1.set(this.x, this.y);    
    this.p1.set(tarX, tarY);

  }

  display(){
    noFill();
    stroke(foreColor);

    // if(this.ticker < 5){
    //   strokeWeight(0);
    // } else if(this.ticker > animC){
    //   strokeWeight(0);
    // } else {
    //   strokeWeight(this.sw);
    // }
    strokeWeight(this.sw);
    // stroke(colorSet[4]);
    // line(this.p4.x, this.p4.y, this.p5.x, this.p5.y);
    
    // stroke(colorSet[2]);
    // line(this.p3.x, this.p3.y, this.p4.x, this.p4.y);
    
    // stroke(colorSet[0]);
    // line(this.p2.x, this.p2.y, this.p3.x, this.p3.y);
    line(this.p1.x, this.p1.y, this.p3.x, this.p3.y);
  }
}