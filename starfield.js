const FILL_RATIO = 0.8
const starColors = [
    "#FFFFFF",
    "#9a99cb",
    "#333366",
    "#777777",
    "#cdbbff",
    "#663267",
    "#310133"
];

const canvas = document.createElement("canvas");//document.getElementById("starfield");
canvas.height = 768;
canvas.width = 1024;
const {width: clientWidth, height: clientHeight} = canvas;

// @ts-ignore
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, clientWidth, clientHeight);


for(let i = 0; i < clientWidth * FILL_RATIO; i++){
    const color = starColors[Math.floor(Math.random() * starColors.length)]
    ctx.fillStyle = color;
    
    const randX = Math.floor(Math.random() * clientWidth) + 0.5;
    const randY = Math.floor(Math.random() * clientHeight) + 0.5;
    const size = Math.random() > 0.95
        ? Math.random() > 0.75 
            ? 4 : 3 
        : 1;
    
    ctx.fillRect(randX, randY,size, size);
}

// @ts-ignore
const dataUrl = canvas.toDataURL();
document.getElementById("bg").style.cssText = `background: url(${dataUrl}) repeat;`;