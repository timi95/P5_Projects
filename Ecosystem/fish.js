class Fish{
  
  constructor(location,velocity){
    this.xOff = 0;

    
    
    this.location = p5.Vector.random2D()
                      .setMag(random(0,200))
                      .add(createVector(200,200));
    
    this.velocity = p5.Vector.random2D();
    
    this.acceleration = p5.Vector.random2D();
    
    //once every second, set a new target location
    window.setInterval(()=>{
      this.targetVector = p5.Vector.random2D();
    },2000);
    
    this.mass = 1;
    this.gravity = createVector(0,0.01*this.mass);
    // this.bouyan

  }
  
    checkEdges(){
    if (this.location.x > width) {
    this.location.x = 0;
    } else if (this.location.x < 0) {
    this.location.x = width;
    }
    
    if (this.location.y > height-10) {
        this.location.y = height-10;
    } else 
    if (this.location.y < height/2) {
        this.location.y = (height/2)
    }
            
  }
  
  update(){
    
    this.applyForce(this.gravity);
    
    //change acceleration by new targetVector
    this.acceleration = p5.Vector.sub(this.acceleration, this.targetVector);
    
    this.velocity.add(this.acceleration);
    this.velocity.limit(5);
    this.location.add(this.velocity);
    
    this.acceleration.mult(0);
  }
  
  applyForce(force){
    let localForce = force.copy();
    
    localForce.div(this.mass);
    this.acceleration.add(localForce);
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
    fill(10,10,100);
    
    // translate(width / 2, height / 2);
    let tailX = 30;
    if(this.velocity.x > 0){
      tailX = -30;
    }
    push();
    triangle(this.location.x,this.location.y+10, this.location.x+tailX,this.location.y+20, this.location.x+tailX,this.location.y);
    ellipse(this.location.x,this.location.y+10, 40,15);
    pop();    
  }  
}