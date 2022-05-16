const grid = document.querySelector("#grid");
const slider = document.querySelector("#size-slider");
let rainbowMode = true;



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
    }
}

function clearGrid() {
    grid.innerHTML="";
}

function getSize() {
    return slider.value;
}

function rebuildGrid() {
    clearGrid();
    buildGrid(getSize());
}

function changeSize(newSize) {
    clearGrid();
    buildGrid(newSize);
}

// Changes text, borders and bg colors to random.
function changeDecorationColor() {
    let root = document.documentElement;
    switch (rainbowMode) {
        case true:
            root.style.setProperty('--color-all', getRandomRgbStringDarker());
            break
        case false:
            root.style.setProperty('--color-all', "black");
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

buildGrid(16);
changeDecorationColor();