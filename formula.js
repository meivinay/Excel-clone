formulaDiv.addEventListener("keydown", e => {
    if (e.key == "Enter") {
        // set formula on last selected cell
        // make current value undefined
        // remove previous values from upstream
        // put addresses that are in formula inside upstream of last cell
        // add yourself to the downstream of address present in formula
        // get values from updated upstream
        // store newValue
        // now send new value to addresses present in last cell downstream
        if (!lastCell) return; // if no cell is selected than return
        
        let lastCellAddress = lastCell.getAttribute("data-address");
        let currCellObj = dataObj[lastCellAddress];
        //currCell.formula = "";
        let formula = e.currentTarget.value;
        e.currentTarget.value = ""
        currCellObj.formula = formula;
        // currCell.value = undefined;
        currCellObj = addToUpStream(currCellObj);
        
        let currCellUpStream = currCellObj.upStream;
        for(let i=0;i<currCellUpStream.length;i++){
            removeFromParentDownStream(currCellUpStream[i],currCellObj);
        }
        let updatedValue = evaluateFormula(currCellObj);
        currCellObj.value = updatedValue;
        dataObj[lastCellAddress] = currCellObj;
        
        notifyParentCells(lastCellAddress);
       
        lastCell.innerText = updatedValue;
        addToDownStream(formula);
       
        function addToDownStream(formula){
            formula = formula.split(" ");
            for(let i=0;i<formula.length;i++){
                let ch = formula[i];
                if(ch!='+' && ch!="-" && ch!="/" && ch!="*" && ch !="%" && isNaN(ch)){
                    dataObj[ch].downStream.push(lastCell.getAttribute("data-address"));
                }
            }
        }
        function addToUpStream(cell) {
            //empty upstream
            // split spaces from formula
            // filter number from data-address and store data address in upstream
            // store new upstream
            // return cell object
            cell.upStream = [];

            let formula = cell.formula;
            console.log(formula);
            formula = formula.split(" ");
            for (let i = 0; i < formula.length; i++) {
                let ch = formula[i];
                if (ch != '+' && ch != '-' && ch != '/' && ch != '*' && isNaN(ch)) {
                    cell.upStream.push(ch);
                }
            }
            return cell;
        }
        function evaluateFormula(cell) {
            // fetch values from upstream
            // replace values in formula 
            let values = getValuesFromUpStream(cell.upStream);
            let formula = cell.formula;
            for (let key in values) {
                formula = formula.replace(key, values[key]);
            }
            let newValue = eval(formula);
            return newValue;

            function getValuesFromUpStream(upStream) {
                let value = {};
                for (let i = 0; i < upStream.length; i++) {
                    let address = upStream[i];
                    value[address] = dataObj[upStream[i]].value;
                }
                return value;
            }
        }
    }

})