let params = {
  numeroElementiMin: 1,
  massimaVelocita: 4, massimaVelocitaMin: 1, massimaVelocitaMax: 100,
  forzaDiSeparazione: 1, forzaDiSeparazioneMin: -1, forzaDiSeparazioneMax: 10, forzaDiSeparazioneStep: 0.1,
  forzaDiAllineamento: 1, forzaDiAllineamentoMin: -1, forzaDiAllineamentoMax: 10, forzaDiAllineamentoStep: 0.1,
  forzaDiCoesione: 1, forzaDiCoesioneMin: -1, forzaDiCoesioneMax: 10, forzaDiCoesioneStep: 0.1,
  raggioVisuale: 50, raggioVisualeMin: 1, raggioVisualeMax: 100
}

let a = 0;
let numeroElementi = 250;
let sino = 1;
let coloress = [255, 200, 255, 100];
var canvas;

class Boid {
  constructor(posizione_p, velocita_p, colore_p, size_p) {
    this.posizione = posizione_p;
    if (!posizione_p) {
      this.posizione = createVector(random(width), random(height));
    }
    this.velocita = velocita_p;
    if (!velocita_p) {
      this.velocita = createVector(
        random(-params["massimaVelocita"], params["massimaVelocita"]),
        random(-params["massimaVelocita"], params["massimaVelocita"])
      );
      //limite per la velocita
      this.velocita = this.velocita.limit(params["massimaVelocita"]);
      //colore
      this.colore = colore_p;
      if (!colore_p) {
        this.colore = [
          random(60)+40,
          random(10)+90,
          100
        ];
      }
      this.size = size_p;
      if (!size_p) {this.size = 5+random(7);}
    }
  }

  update() {
    //aggiornamento del numero di 'piccioni'
    while (boids.length < numeroElementi) {
      boids.push(new Boid());
    }
    while (boids.length > numeroElementi) {
      boids.pop();
    }

    
    this.colore[0] = (this.colore[0]+0.1)%100;

    //regola 1 separazione
    for (var altro of boids) {
      if (this.posizione.dist(altro.posizione) < params['raggioVisuale']) {
        this.velocita = p5.Vector.sub(
          this.posizione, altro.posizione
        ).normalize()
          .mult(params['forzaDiSeparazione'] * params['massimaVelocita'])
          .add(this.velocita);
      }
    }

    //calcolo dei vicini 
    var stormo_locale = [];
    for (var altro of boids) {
      if (
        this != altro &&
        this.posizione.dist(altro.posizione) < params['raggioVisuale']
      ) {
        stormo_locale.push(altro);
      }
    }

    if(stormo_locale.length>0){
      var media = stormo_locale.reduce(
        (media,boid)=>new Boid(
          p5.Vector.add(media.posizione,boid.posizione),
          p5.Vector.add(media.velocita,boid.velocita)
        )
      );

      media.posizione.div(stormo_locale.length);
      media.velocita.div(stormo_locale.length);

      //allineamento
      this.velocita.add(
        p5.Vector.mult(
          media.velocita,params['forzaDiAllineamento']
        )
      );

      //coesione
      this.velocita = p5.Vector.sub(media.posizione,this.posizione)
      .normalize()
      .mult(params['forzaDiCoesione']*params['massimaVelocita'])
      .add(this.velocita);

    }

    this.velocita.limit(params['massimaVelocita']);
    this.posizione.add(this.velocita);
    if (this.posizione.x > width) {
      this.posizione.x = width;
      this.velocita.x *= -1 
    };
    if (this.posizione.x < 0) {
      this.posizione.x = 0;
      this.velocita.x *= -1 
    };
    if (this.posizione.y > height) {
      this.posizione.y = height;
      this.velocita.y *= -1 
    };
    if (this.posizione.y < 0) {
      this.posizione.y = 0;
      this.velocita.y *= -1 
    };
  }

  draw() {
    colorMode(HSB, 100);
    fill(this.colore);
    noStroke();
    ellipse(this.posizione.x, this.posizione.y, this.size, this.size);
    fill(100,5);

    //ellipse(this.posizione.x, this.posizione.y,params['raggioVisuale'],params['raggioVisuale']);
  }
}

var boids = [];

function windowResized() { 
  canvas = resizeCanvas(windowWidth, windowHeight);
  //numeroElementi = Math.floor((230/(1920*1080))*(windowWidth*windowHeight));
  fill(color(0, 0, 0, 100));
  rect(0, 0, width, height);
}

function setup() {
  if (windowWidth != windowWidth) {
    canvas = createCanvas(windowWidth, windowHeight);
  }
  else {
    canvas = createCanvas(windowWidth, windowHeight);
  }
  //myCanvas.parent("container");
  fill(color(0, 0, 0, 100));
  rect(0, 0, width, height);
  //gui = createGui("boids");
  //gui.addObject(params);
  //gui.setPosition(400, 0);
  //numeroElementi = Math.floor((230/(1920*1080))*(windowWidth*windowHeight));
  for (var i = 0; i < numeroElementi; i++) {
    boids.push(new Boid());
  }
}

function draw() {
  colorMode(RGB, 255);
  fill(color(232, 236, 242, 100));
  rect(0, 0, width, height);

  boids.forEach(
    (boid) => boid.update()
  );

  boids.forEach(
    (boid) => boid.draw()
  );
  
  if (mouseOver()) {
    boids[0].posizione = createVector(mouseX, mouseY);
    boids[0].velocita = createVector(0,0);
    boids[0].size = 50;
  }
  //coloress = boids[0].colore;
  //document.body.style.color = "hsl("+((coloress[0]*3.6+30)%360)+","+coloress[1]+"%,"+coloress[2]*0.75+"%)";
  //document.body.style.color = 'rgb(255,225,255)';
}

function mouseClicked() {
  //boids.push(new Boid());
}

function mouseOver() {
  return 1;
}

function touchStarted() {
  sino = 0;
}
