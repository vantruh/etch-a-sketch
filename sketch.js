const grid = document.querySelector("#grid");
const slider = document.querySelector("#size-slider");



// Creates grid inside #grid container with size x size cells
function buildGrid (size) {
    clearGrid();
    for (let row = 0; row<size; row++) {
        let cellRow= document.createElement("div");
        cellRow.classList.add("cell-row")
        for (let col = 0; col<size; col++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cellRow.appendChild(cell);
        }
        grid.appendChild(cellRow);
    }
}

function clearGrid() {
    grid.innerHTML="";
}

function changeSize(newSize) {
    clearGrid();
    buildGrid(newSize);
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

buildGrid(16);
