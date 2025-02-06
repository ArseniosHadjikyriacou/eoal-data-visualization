// input: h in [0,360] and s,v in [0,1] - output: r,g,b in [0,255]
function hsv2rgb(h,s,v) {                              
  let f= (n,k=(n+h/60)%6) => v - v*s*Math.max( Math.min(k,4-k,1), 0);     
  return [Math.round(f(5)*255),Math.round(f(3)*255),Math.round(f(1)*255)];       
}   

export function spacedColors(total) {
  const i = 360 / total; // distribute the colors evenly on the hue range
  const r = []; // hold the generated colors
  for (let x=0; x<total; x++) {
    const rgbArray = hsv2rgb(i * x, 0.7, 0.9);
    const rgbString = `rgb(${rgbArray[0]},${rgbArray[1]},${rgbArray[2]})`
    r.push(rgbString); 
  }
  return r;
}