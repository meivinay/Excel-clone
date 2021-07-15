let rowContainer = document.querySelector(".row-container");
let columnContainer = document.querySelector(".column-container");
let cellSection = document.querySelector(".cell-section");
let selectedCell = document.querySelector(".selected-cell");
let dataObj = {};
let lastCell = undefined;
//scroll
cellSection.addEventListener("scroll", (e) => {
    columnContainer.style.transform = `translateX(-${e.currentTarget.scrollLeft}px)`;
    rowContainer.style.transform = `translateY(-${e.currentTarget.scrollTop}px)`;
})
//row serial number creation
for (let i = 1; i <= 100; i++) {
    let div = document.createElement("div");
    div.innerText = i;
    div.classList.add("row-number");
    rowContainer.append(div);
}
//column name creation
for (let i = 0; i < 26; i++) {
    let asciiCode = 65 + i;
    let alphabet = String.fromCharCode(asciiCode);
    let div = document.createElement("div");
    div.classList.add("column");
    div.innerText = alphabet;
    columnContainer.append(div);
}
//cell creation
for (let i = 1; i <= 100; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < 26; j++) {
        let asciiCode = 65 + j;
        let alphabet = String.fromCharCode(asciiCode);
        let cellAdress = alphabet + i;
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-address", cellAdress);
        dataObj[cellAdress] = {
            value: undefined,
            formula: undefined,
            downStream: [],
            upStream: []
        };

        //stroing value to dataObject
        cell.addEventListener("input", (e) => {
            updateCell(e);
        })
        cell.contentEditable = "true";
        row.append(cell);
        //attaching event listner to every cell
        cell.addEventListener("click", (e) => {   //remove lastSelected cell border and add border to newly selected cell
            if (lastCell) {
                lastCell.classList.remove("cell-selected");
            }
            e.currentTarget.classList.add("cell-selected");
            lastCell = e.currentTarget;
            let currCellAddress = e.currentTarget.getAttribute("data-address");
            selectedCell.innerText = currCellAddress;

        })

    }
    cellSection.append(row);
}

function removeFromDownStream(parentCell, childCell) {
    let parentDownStream = dataObj[parentCell].downStream;
    let filterDownStream = [];
    for (let i = 0; i < parentDownStream.length; i++) {
        if (parentDownStream[i] != childCell) {
            filterDownStream.push(parentDownStream[i]);
        }
    }

    dataObj[parentCell].downStream = filterDownStream;
}

function updateDownStream(cell) {
    let currCellObj = dataObj[cell];
    let formula = currCellObj.formula;
    let upStream = currCellObj.upStream;
    let downStream = currCellObj.downStream;
    // getting values of cell-address present in our formula form upstream array of our object
    let valObj = {};
    for (let i = 0; i < upStream.length; i++) {
        let value = dataObj[upStream[i]].value;
        valObj[upStream[i]] = value;
    }
    for (let key in valObj) {
        formula.replace(key, valObj[key]);
    }

    let newValue = eval(formula);
    dataObj.value = newValue;
    for (let i = 0; i < downStream.length; i++) {
        updateDownStream(downStream[i]);
    }
}

function updateCell(e) {
    // console.log(e.currentTarget.innerText);
    let currCellAddress = e.currentTarget.getAttribute("data-address");
    let currCellObj = dataObj[currCellAddress];
    currCellObj.value = e.currentTarget.innerText;
    currCellObj.formula = undefined;
    
    //work on upStream
    //upsteam me jake apne app ko remove krvana hai, fir hr jgh se remove krvane ke baad apna upstream array empty kr dena hai
    let upStream = currCellObj.upStream;
    for (let i = 0; i < upStream.length; i++) {
        removeFromDownStream(upStream[i], currCellAddress);
    }
    currCellObj.upStream = [];
   
    //work on downStream 
    // apni downStream pe pde cell-address ko jaake btana hai ki meri value update hui hai , tum bhi meri value ko fetch kr ke update ho jao
    let downStream = currCellObj.downStream;
    for (let i = 0; i < downStream.length; i++) {
        let currCellOfDownStream = downStream[i];
        updateDownStream(currCellOfDownStream); //updated value ko pass krne ki zrurat nhi hai kyoki hum iss function me upstream me jaake fetch kr lege
    }
    console.log(dataObj);
}