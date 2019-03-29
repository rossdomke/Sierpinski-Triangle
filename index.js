class SierpinskiTri {

  constructor(id, size){
    this._canvas = document.getElementById(id);
    this._canvas.height = size;
    this._canvas.width = size;
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

  DrawInvertedCenterTri(x,y,size){
    let ctx = this.ctx;
    ctx.fillStyle = "black";
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