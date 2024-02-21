let canvas = document.getElementById("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let ctx = canvas.getContext("2d");
ctx.lineWidth = 5;

let prevX = null;
let prevY = null;

let draw = false;

let clrs = document.querySelectorAll(".clr");
clrs = Array.from(clrs);
clrs.forEach(clr => {
    clr.addEventListener("click", () => {
        ctx.strokeStyle = clr.dataset.clr;
    })
})

let clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})

let saveBtn = document.querySelector(".save");
saveBtn.addEventListener("click", () => {
    let data = canvas.toDataURL("imag/png");
    let a = document.createElement("a");
    a.href = data;
    a.download = "sketch.png";
    a.click();
})

window.addEventListener("mousedown", (e) => {
    draw = true;
    prevX = e.clientX;
    prevY = e.clientY;
});
window.addEventListener("mouseup", () => draw = false);
window.addEventListener("mousemove", drawLine);


window.addEventListener("touchstart", (e) => {
    let touch = e.touches[0];
    draw = true;
    prevX = touch.clientX;
    prevY = touch.clientY;
});

window.addEventListener("touchend", () => draw = false);

window.addEventListener("touchmove", (e) => {
    
    e.preventDefault();
    if (!draw) return;

    let touch = e.touches[0];
    drawLine(touch);
});

function drawLine(e) {
    if (!draw) return;

    let mouseX = e.clientX || e.touches[0].clientX;
    let mouseY = e.clientY || e.touches[0].clientY;

    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(mouseX, mouseY);
    ctx.stroke();

    prevX = mouseX;
    prevY = mouseY;
}


document.body.addEventListener("touchstart", e => {
    if (e.target == canvas) {
        e.preventDefault();
    }
}, { passive: false });

document.body.addEventListener("touchend", e => {
    if (e.target == canvas) {
        e.preventDefault();
    }
}, { passive: false });

document.body.addEventListener("touchmove", e => {
    if (e.target == canvas) {
        e.preventDefault();
    }
}, { passive: false });