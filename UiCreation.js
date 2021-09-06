//scroll
cellSection.addEventListener("scroll", (e) => {
  columnContainer.style.transform = `translateX(-${e.currentTarget.scrollLeft}px)`;
  rowContainer.style.transform = `translateY(-${e.currentTarget.scrollTop}px)`;
});
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
      upStream: [],
      align: "none",
      color: "black",
      bgColor: "white",
      fontSize: "1rem",
      fontFamily: "Arial, sans-serif",
      fontStyle: "none",
      textDecoration: "none",
      fontWeight: "none",
    };

    //stroing value to dataObject by attaching a listner to every cell
    cell.addEventListener("input", (e) => {
      newCellValueAfterFormulaRemove(e); //inserting value to selected cell this will remove formula from itself ,remove itself from other downstream and than empty own upstream, and send new value to its downstream
    });
    cell.contentEditable = "true"; // making each cell editable
    row.append(cell); // inserting a cell to a row div
    //attaching event listner to every cell
    cell.addEventListener("click", (e) => {
      //remove lastSelected cell border and add border to newly selected cell
      if (lastCell) {
        lastCell.classList.remove("cell-selected");
      }
      e.currentTarget.classList.add("cell-selected");
      lastCell = e.currentTarget;
      let currCellAddress = e.currentTarget.getAttribute("data-address");
      // for(key in dataObj[currCellAddress]){
        // setOptions(dataObj[currCellAddress],lastCell);
      // }
      selectedCell.innerText = currCellAddress;
      formulaDiv.contentEditable = true;
    });
  }
  cellSection.append(row); //append a row when it is full of columns
}

(function loadSavedSheet() {
  if (localStorage.getItem("sheet")) {
    dataObj = JSON.parse(localStorage.getItem("sheet"));

    for (let x in dataObj) {
      let cell = document.querySelector(`[data-address='${x}']`);
      if (dataObj[x].value) cell.innerText = dataObj[x].value;
      // dataObj[x]
    }
  }
})();

// function setOptions(currCell,){

//   // is bold
//   // is italic 
//   // is underline
//   // if(currCell.fontWeight !== "none"){
//   //   lastCell.setAttribute("font-weight", "bold");
//   // }
//   // if(currCell.fontStyle !== "none"){
//   //   lastCell.setAttribute("font-style", "italic");

//   // }
//   // if(currCell.textDecoration !== "none"){
//   //   lastCell.setAttribute("text-decoration", "underline");
//   // }

//   //align
//  let alignDivs = document.querySelectorAll(".align")
//  if(currCell.align === "none"){
//   if(lastSelectedAlignOption){
//     lastSelectedAlignOption.classList.remove("selected-align");
//   }
//    return
//  }
//   if(currCell.align === "left"){
//     console.log(alignDivs[0]);
//     alignDivs[0].classList.add("selected-align");
//     console.log("left");
//   }
//   else if(currCell.align === "right"){
//     console.log(alignDivs[1]);

//     alignDivs[1].classList.add("selected-align")
//     console.log("right");
//   }
//   else if(currCell.align === "center"){
//     console.log(alignDivs[2]);
//     alignDivs[2].classList.add("selected-align");
//     console.log("center");
//   }
//   if(lastSelectedAlignOption){
//     lastSelectedAlignOption.classList.remove("selected-align");
//   }
// console.log(dataObj);
//   // if(fontFamily)

//   //font size 

//   //color

//   //bgcolor

  

// }