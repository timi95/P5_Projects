class Attractor {

  constructor() {
    this.location = createVector(width/2,height/2);
    this.mass = 20;
  }
  
  display() {
    stroke(0);
    fill(175,200);
    ellipse(this.location.x,this.location.y,this.mass*2,this.mass*2);
  }
  
  attract(mover, G){
    let force = p5.Vector.sub(this.location, mover.location);
    let distance = force.mag();
    distance = constrain(distance,5.0,25.0);
    
    
    let strength = (G * this.mass * mover.mass) / (distance * distance);
    force.setMag(strength);
    return force; 
  }
  
}