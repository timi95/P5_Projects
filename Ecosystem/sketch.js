let mover;
let attractor;
let stop;
let start;
function setup() {

    let canvas = createCanvas(600, 400);
    stop = createButton('Stop animation');
    stop.mousePressed(deleteCanvas);

   attractor = new Attractor();
  // background(0);
  movers = [];
  for(let i=0; i<3; i++){    
    movers.push(new Mover());    
  }
  fishes = []
  for(let i=0; i<3; i++){
      fishes.push(new Fish());
  }
  liquid = new Liquid(0, height/2, width, height/2, 0.1);
  gravity = createVector(0,5);
  
  
  movers.forEach(mover=>{
    mover.setMass(random(0.1,4));
  });
}

function deleteCanvas() {
    var canvas = document.getElementById('defaultCanvas0');
    canvas.remove();
}

function draw() {
  background(0,0,0,100);
  liquid.display();
  
  movers.forEach( (mover, index) =>{
    

    if (keyIsDown(UP_ARROW)) {
    mover.accelerate(1);
    }

    if (keyIsDown(DOWN_ARROW)) {
    mover.decelerate(1);
    }

    if(mover.isInside(liquid)){
        mover.drag(liquid);
    }
    
    // for(let i = 0; i <  movers.length ; i++){
    //     if(index != i){
    //     let force_of_attraction_inner = movers[i].attract(mover,gravity.mag())
    //     movers[i].applyForce(force_of_attraction_inner);
    //     }    
    // } 

      

//   let force_of_attraction = attractor.attract(mover, gravity.mag());  
//   mover.applyForce(force_of_attraction);
    
  mover.applyForce(
            gravity.copy()
            .setMag(mover.mass*0.1));
    
  mover.update();
  mover.checkEdges();
  mover.display();
    


  });

  fishes.forEach((fish,index)=>{
    for(let i = 0; i <  fishes.length ; i++){
        let hunger = fish.attract(movers[index],gravity.mag())
        fish.applyForce(hunger);
    } 
    
    fish.update();
    fish.checkEdges();
    fish.display();
  });

  
  
  // testmag.setMag(-1);
  // console.log("This is the magnitude: ",testmag)
}

function keyPressed(){


}