class Mover {
  
  constructor(location,velocity){
    this.location =  createVector(random(100,250), random(100,400));
      // .setMag(random(0,200))
      // .add(createVector(200,200));
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);
    // this.mass = mass? mass : 1;
    this.mass = 1;
    // this.gravity = createVector(0,1);
    // console.log('x and y => ',this.location.x,this.location.y);
  }
  
  checkEdges(){
    if (this.location.x > width) {
    this.location.x = 0;
    } else if (this.location.x < 0) {
    this.location.x = width;
    }
    
    if (this.location.y > height) {
    this.location.y = 0;
    } else if (this.location.y < 0) {
    this.location.y = height;
    }
  }
  
  update(){
//     let mouse = createVector(mouseX,mouseY);
//     let mouseAccel  =  p5.Vector.sub(mouse,this.location);
//     mouseAccel.setMag(0.1);
//     this.velocity.add(mouseAccel);
    
    this.velocity.add(this.acceleration);
    this.velocity.limit(5);
    this.location.add(this.velocity);
    
    // console.log('this is the current accel: ',this.acceleration);
    
    this.acceleration.mult(0);
    // this.checkEdges();
  }
  
  accelerate(intensity){
    this.acceleration.add(createVector(intensity,intensity));
    
    this.velocity.add(this.acceleration);
    this.velocity.limit(5);
    this.location.add(this.velocity);

  }
  decelerate(intensity){
    let deceleration = createVector(intensity,intensity);
    
    this.velocity = p5.Vector.sub(this.acceleration, deceleration);
    // this.location.add(this.velocity);
    // console.log('this is the current intensity: ',intensity);
    // console.log('this is the current accel: ',this.acceleration);
  }
  
  
  applyForce(force){
    let localForce = force.copy();
    
    localForce.div(this.mass);
    this.acceleration.add(localForce);
  }
  
  isInside(liquid){
    if (this.location.x>liquid.x &&
        this.location.x<liquid.x+liquid.w &&
        this.location.y>liquid.y &&
        this.location.y<liquid.y+liquid.h) {
     return true;
    } else {
     return false;
    }
  }
  
  drag(liquid){
    let speed = this.velocity.mag();
    let dragMagnitude = liquid.c * speed * speed; 
    let drag = this.velocity.copy();
    drag.setMag(-1)
    drag.mult(dragMagnitude);
    this.applyForce(drag);
  }
  
  setMass(newMass){
    this.mass = newMass;
  }
  
  
  attract(mover, G){
    let force = p5.Vector.sub(this.location, mover.location);
    let distance = force.mag();
    distance = constrain(distance,5.0,25.0);
    
    
    let strength = (G * this.mass * mover.mass) / (distance * distance);
    force.setMag(strength);
    return force; 
  }
  
  display(){
    stroke(255);
    strokeWeight(3);
    fill(10,70,50);
    ellipse(this.location.x,this.location.y, 16*this.mass,16*this.mass)
  }
}