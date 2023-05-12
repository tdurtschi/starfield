const FILL_RATIO = 0.8
const starColors = [
    "#FFFFFF",
    "#FFFFFF",
    "#9a99cb",
    "#333366",
    "#777777",
    "#cdbbff",
    "#663267",
    "#310133"
];

const canvas = document.createElement("canvas");
const scale = window.devicePixelRatio;
canvas.width = Math.floor(1024 * scale);
canvas.height = Math.floor(768 * scale);
const {width, height} = canvas;

const ctx = canvas.getContext("2d");
ctx.scale(scale, scale);
ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, width, height);
ctx.translate(0.5, 0.5);

for(let i = 0; i < width * FILL_RATIO; i++){
    const color = starColors[Math.floor(Math.random() * starColors.length)]
    ctx.fillStyle = color;
    
    const randX = Math.floor(Math.random() * width);
    const randY = Math.floor(Math.random() * height);
    const size = Math.random() > 0.95
        ? Math.random() > 0.75 
            ? 4 : 3 
        : 1;
    
    ctx.fillRect(randX, randY, size, size);
}

const dataUrl = canvas.toDataURL();
document.getElementById("bg").style.cssText = `background: url(${dataUrl}) repeat;`;