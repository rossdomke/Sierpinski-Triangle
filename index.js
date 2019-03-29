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
  colorBasedOnX(minY, maxY, y){
    let stepSize = Math.floor((maxY- minY) / (this._colors.length - 1));
    let color = Math.floor((y-minY) /stepSize);
    let colorMixPercentage = ((y-minY) %stepSize)/stepSize;
    var c = this.mix([this._colors[color], this._colors[color + 1]], colorMixPercentage);
    return c;
  }
  mix(c, ratio){

    var deltaRatio = 50;
    var c = {ratio: 50, color: this.average(c[0], c[1]), parent: c}
    ratio = Math.floor(ratio * 100);
    var emerg = 0
    while(1){
      deltaRatio = Math.round(deltaRatio/2);
      if(ratio < c.ratio)
        c = {ratio: c.ratio - deltaRatio, color : this.average(c.parent[0], c.color), parent: [c.parent[0], c.color]};
      else if(ratio > c.ratio)
        c = {ratio: c.ratio + deltaRatio, color : this.average(c.color, c.parent[1]), parent: [c.color, c.parent[0]]};
      else 
        break;
      
      if(emerg > 10)
        break;
      emerg++;
    }
    return c.color;
  }
  average(c1, c2){
    function dec2hex(v) {return v.toString(16);}
    function hex2dec(v) {return parseInt(v,16);}
    let seg = /[\da-z]{2}/gi;

    var b1 = c1.match(seg);
    var b2 = c2.match(seg);
    var t, c = [];
    for(var i = 0; i< b1.length; i++){
      t = dec2hex((hex2dec(b1[i]) + hex2dec(b2[i])) >> 1)

      c[i] = (t.length == 2 ? '' : '0') + t;
    }

    return '#' + c.join('');
  }
  get random(){
    let i = Math.floor(Math.random() * this._colors.length);
    return this._colors[i];
  }

}