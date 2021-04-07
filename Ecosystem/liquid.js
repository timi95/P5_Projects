class Liquid {


  constructor( x_,  y_,  w_,  h_, c_) {
      this.x = x_;
      this.y = y_;
      this.w = w_;
      this.h = h_;
      this.c = c_;
  }


  display() {
    noStroke();
    fill(175);
    rect(this.x,this.y,this.w,this.h);
  }



}