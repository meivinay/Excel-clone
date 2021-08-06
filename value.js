function newCellValueAfterFormulaRemove(e) {
    // console.log(e.currentTarget.innerText);
    // get cell address of cell which is currently taking input
    let currCellAddress = e.currentTarget.getAttribute("data-address");
    // fetch all properties of current cell address form dataObject
    let currCellObj = dataObj[currCellAddress];
    // set current input to value
    currCellObj.value = e.currentTarget.innerText;
    // remiving formula from its properties because we are inserting from a cell , not from a formula-input
    currCellObj.formula = undefined;
    
    let upStream = currCellObj.upStream;
    
    for (let i = 0; i < upStream.length; i++) {
        removeFromParentDownStream(upStream[i], currCellAddress);
    }
    // i am now not in any downstream so upstream array need to be empty
    currCellObj.upStream = [];

    //work on downStream 
    let downStream = currCellObj.downStream;
    for (let i = 0; i < downStream.length; i++) {
        // fetching address from own downstream
        let currCellOfChildDownStream = downStream[i];
        notifyParentCells(currCellOfChildDownStream); 
    }
    console.log(dataObj);
}