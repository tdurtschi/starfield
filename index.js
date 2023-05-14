const FILL_RATIO = 0.8;
const starColors = [
    "#FFFFFF",
    "#FFFFFF",
    "#9a99cb",
    "#333366",
    "#777777",
    "#cdbbff",
    "#663267",
    "#310133",
];


const generateStarfieldImage = ({ fillRatio }) => {
    const canvas = document.createElement("canvas");
    canvas.width = Math.floor(1024);
    canvas.height = Math.floor(768);
    const { width, height } = canvas;

    const ctx = canvas.getContext("2d");
    ctx.translate(0.5, 0.5);

    for (let i = 0; i < width * (fillRatio ?? FILL_RATIO); i++) {
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
    return dataUrl;
}

const applyBackgroundToTarget = (dataUrl, targetElement) => {
    const bgContainer = document.createElement("div");
    bgContainer.id = "bg-container";
    targetElement.prepend(bgContainer);

    const bgElement = document.createElement("div");
    bgElement.id = "bg";
    bgContainer.prepend(bgElement);

    bgElement.style.cssText = `background: url(${dataUrl}) repeat;`;
}

export default function Starfield(options) {
    const { target } = options;
    const dataUrl = generateStarfieldImage(options);

    const targetElement = document.getElementById(target);
    applyBackgroundToTarget(dataUrl, targetElement);
}
