const grid = document.querySelector("#grid");
const slider = document.querySelector("#size-slider");
let rainbowMode = true; // true - random colors; false - black.
let drawMode = true; // true - draw "on hover"; false - draw on mousedown
let drawing = false; // checks if user holds mouse button to draw

// 2 events for drawing in "on mousedown mode"
//window.addEventListener("mousedown", drawStart); 
//^^ moved to cell class to start drawing immideately^^
window.addEventListener("mouseup", drawStop)

// Creates grid inside #grid container with size x size cells
function buildGrid (size) {
    clearGrid();
    for (let row = 0; row<size; row++) {
        let cellRow= document.createElement("div");
        cellRow.classList.add("cell-row")
        for (let col = 0; col<size; col++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.addEventListener("mouseover", changeColor);
            cell.addEventListener("click", changeColor);
            cellRow.appendChild(cell);
        }
        grid.appendChild(cellRow);

    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Generates random rgb string
function getRandomRgbString() {
    return `rgb(${getRandomInt(255)},${getRandomInt(255)},${getRandomInt(255)})`;

}

// Darker version of random rgb color for text & stuff. ...+30 to escape black color.
function getRandomRgbStringDarker() {
    return `rgb(${getRandomInt(100)+30},${getRandomInt(100)+30},${getRandomInt(100)+30})`;
}

function changeColor(e) {
    switch (rainbowMode) {
        case true:
            let generatedColor = getRandomRgbString();
            e.target.style.backgroundColor = generatedColor;
            break
        case false:
            e.target.style.backgroundColor = "rgb(0,0,0)";
            break        
    }
}

// 3 functions in draw-mode
function drawStart(e) {
    drawing = true;
    changeColor(e);
}

function drawStop(e) {
    drawing = false;
}

function changeColorDrawMode(e) {
    if (drawing) {
        changeColor(e);
    }
}

// Empties the grid
function clearGrid() {
    grid.innerHTML="";
}

function getSize() {
    return slider.value;
}

//  Builds new grid
function rebuildGrid() {
    clearGrid();
    buildGrid(getSize());
    changeDrawMode();
    changeDrawMode();
}

function changeSize(newSize) {
    clearGrid();
    buildGrid(newSize);
    changeDrawMode();
    changeDrawMode();
}

// Changes text, borders and bg colors to random/black.
function changeDecorationColor() {
    let root = document.documentElement;
    const fieldBg = document.querySelector("#grid-container");
    switch (rainbowMode) {
        case true:
            let newRandomColor = getRandomRgbStringDarker();
            root.style.setProperty('--color-all', newRandomColor);
            fieldBg.style.backgroundColor = newRandomColor;
            break
        case false:
            root.style.setProperty('--color-all', "black");
            fieldBg.style.backgroundColor = "rgba(0,0,0,0.5)";
            break
    }
}

// Change value when user moves slider
slider.onchange = () => {
    newValue = slider.value;
    changeSize(newValue);
    const sliderLabel = document.querySelector("#slider-label");
    sliderLabel.textContent = `SIZE: ${newValue}x${newValue}`;
}

// Change value when user moves slider (2)
slider.oninput = () => {
    newValue = slider.value;
    changeSize(newValue);
    const sliderLabel = document.querySelector("#slider-label");
    sliderLabel.textContent = `SIZE: ${newValue}x${newValue}`;
}

// Toggle random-color and black drawing modes. Also paints the button
function changeColorMode() {
    rainbowMode = !rainbowMode;
    changeDecorationColor();
    const colorButton = document.querySelector(".color-mode");
    switch (rainbowMode) {
        case false:
            colorButton.style.background = "linear-gradient(to right, white, black)";
            break
        case true:
            colorButton.style.background = "linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet)";
            break
    }
}

//  Toggle mode from hover-drawing to hold-mouse-drawing
function changeDrawMode() {
    drawMode = !drawMode;
    const drawButton = document.querySelector(".click-mode");
    const cells = document.querySelectorAll(".cell");
    switch (drawMode) {
        case true:
            drawButton.src="icons/cursor.svg";
            cells.forEach(cell => {
                cell.addEventListener('mouseover', changeColor);
                cell.addEventListener("click", changeColor);
                cell.removeEventListener("mousedown", drawStart);
            });
            break
        case false:
            drawButton.src="icons/cursor-click.svg";
            cells.forEach(cell => {
                cell.removeEventListener('mouseover', changeColor);
                cell.removeEventListener("click", changeColor);
                cell.addEventListener('mouseover', changeColorDrawMode);
                cell.addEventListener("mousedown", drawStart);
            });
            break
    }
}

buildGrid(16);
changeDecorationColor();