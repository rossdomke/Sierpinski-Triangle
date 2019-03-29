class SierpinskiTri {

  constructor(id, width, height,color){
    this._canvas = document.getElementById(id);
    this._canvas.height = height;
    this._canvas.width = width;

    let ctx = this.ctx;
    ctx.fillStyle = color;
    ctx.fillRect(0,0,width, height);
  }

  get ctx() {
    return this._canvas.getContext("2d");
  }

  DrawCenterRect(x, y, size, color) {
    let ctx = this.ctx;
    ctx.fillStyle = color;
    ctx.fillRect(x - (size/2), y - (size/2), size, size);
  }

  DrawCenterTri(x,y,size,color){
    let ctx = this.ctx;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x - size/2,y + size/2);
    ctx.lineTo(x, y - size/2);
    ctx.lineTo(x + size/2, y + size/2);
    ctx.lineTo(x - size/2,y + size/2);
    ctx.fill()

    return [{
      centers: [{x: x,y: y}],
      size: size/2
    }];

  }

  DrawInvertedCenterTri(x,y,size, color){
    let ctx = this.ctx;
    ctx.fillStyle = color;
    ctx.beginPath();
    y += size/2;
    ctx.moveTo(x - size/2,y - size/2);
    ctx.lineTo(x, y + size/2);
    ctx.lineTo(x + size/2, y - size/2);
    ctx.lineTo(x - size/2,y - size/2);
    ctx.fill();

    return [
      {
        centers: [
          {x: x, y: y-size},
          {x: x-size/2, y: y},
          {x: x+size/2, y: y}
        ],
        size: size/2,
      }
    ]
  }
} 

class ColorPallette{
  constructor(colors){
    this._colors = colors;
  }

  get random(){
    let i = Math.floor(Math.random() * this._colors.length);
    return this._colors[i];
  }

}