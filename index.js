const FILL_RATIO = 0.8;
let doSatellite;
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
    return bgElement;
}

const satellite = (targetElement, initialSpeed, repeatInterval) => () => {
    let canvas = document.querySelector("#satellite");
    if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.id = "satellite";
        canvas.width = targetElement.clientWidth;
        canvas.height = targetElement.clientHeight;

        targetElement.append(canvas);
    }

    let yPos = Math.floor(Math.random() * (canvas.height - window.innerHeight - 400)) + 200;
    let xPos = 0;
    const speed = initialSpeed * window.devicePixelRatio;
    const direction = (Math.random() * Math.PI / 1.5) - Math.PI / 3;
    const amtToAddX = speed * Math.cos(direction);
    const amtToAddY = speed * Math.sin(direction);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FFFFFF";
    ctx.translate(0.5, 0.5);

    const updateAnimation = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(xPos, yPos, 2, 2);
        xPos += amtToAddX;
        yPos += amtToAddY;

        if (xPos <= canvas.width && yPos <= canvas.height) {
            requestAnimationFrame(updateAnimation);
        } else {
            console.info("Done with Satellite!")
            setTimeout(() => doSatellite && doSatellite(), repeatInterval);
        }
    };

    requestAnimationFrame(updateAnimation);
}

export default function Starfield(options) {
    const { target, satelliteSpeed, satelliteInterval } = options;
    const dataUrl = generateStarfieldImage(options);

    const targetElement = document.getElementById(target);
    const backgroundElement = applyBackgroundToTarget(dataUrl, targetElement);

    doSatellite = satellite(backgroundElement, satelliteSpeed, satelliteInterval)

    setTimeout(doSatellite, satelliteInterval ?? 5000);
}
