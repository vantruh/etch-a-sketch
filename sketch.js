const grid = document.querySelector("#grid");




// Creates grid inside #grid container with size x size cells
function generateGrid (size) {
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