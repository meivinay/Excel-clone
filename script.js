let rowContainer = document.querySelector(".row-container");
let columnContainer = document.querySelector(".column-container");
let cellSection = document.querySelector(".cell-section");
let selectedCell = document.querySelector(".selected-cell");
let formulaDiv = document.querySelector(".formula-input");

let dataObj = {};
let lastCell = undefined; // this variable will always container last used/selected cell ELEMENT



// downstream array contain those cell addresses which values are used in my formula for evaluation 
// now there is no more formula in my cell , so connected cell should not send me there updated values 
// so updated cell going to remove itself from downstream array of connected cells
function removeFromParentDownStream(parentCell, childCell) {
    //parentCell is cell-address in which upstream i am present
    //childCell is cell-address which is present in upstream of parentCell
    // fetching downstream of connected cell
    
    let parentDownStream = dataObj[parentCell].downStream;
    // removing only my self from downstream of connected cell
    let filterDownStream = [];
    for (let i = 0; i < parentDownStream.length; i++) {
        if (parentDownStream[i] != childCell) {
            filterDownStream.push(parentDownStream[i]);
        }
    }
    // update downstream of connected cell
    dataObj[parentCell].downStream = filterDownStream;
}

function notifyParentCells(cell) {
    // cell contain formula
    let currCellObj = dataObj[cell];
    let formula = currCellObj.formula;
    // now fecthced cell value will update after its formula eval , so it need to update its upstream and downstream
    let upStream = currCellObj.upStream;
    let downStream = currCellObj.downStream;
    // getting values of cell-address present in our formula form upstream array of our object
    let valObj = {};
    // fetching value of every cell present in its upstream
    //NOTE = we do not provide the value of cell address who call this function , it fetch value of every one by itself
    for (let i = 0; i < upStream.length; i++) {
        let value = dataObj[upStream[i]].value;
        valObj[upStream[i]] = value;
    }

    for (let key in valObj) {
        formula = formula.replace(key, valObj[key]);
    }
    
    let newValue = eval(formula);
    currCellObj.value = newValue;
    document.querySelector(`[data-address=${cell}]`).innerText = newValue;
    //successfully evaluated formula, now update my parentCells
    for (let i = 0; i < downStream.length; i++) {
        notifyParentCells(downStream[i]);
    }
}


