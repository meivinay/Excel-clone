let fileDiv = document.querySelector("#file");
let helpDiv = document.querySelector("#help");
let bgColorBtn = document.querySelector(".bgclr");
let textColorBtn = document.querySelector(".text-color")
let isOptionSelected = false;
let body = document.querySelector("body");
let fontFamilyBtn = document.querySelector("#font-family");
let fontSizeBtn = document.querySelector("#font-size");

//file-option-menu-dropdown
fileDiv.addEventListener('click',e=>{
    let isOpen = e.currentTarget.getAttribute("file-option-open");
    if(isOpen == "true"){
        e.currentTarget.setAttribute("file-option-open","false");
        e.currentTarget.querySelector(".file-option-container").remove();
        return;
    }
    else{
        e.currentTarget.setAttribute("file-option-open","true");
        let fileMenu = document.createElement("div");
        fileMenu.classList.add('file-option-container');
        fileMenu.innerHTML = `<p class = "file-options">
        Save
        </p>
        <p class = "file-options">Restore</p>`;
        fileDiv.append(fileMenu);
    }
})

bgColorBtn.addEventListener("click",e=>{
    if(isOptionSelected){
        let options = document.querySelectorAll(".option-selected");
        for(let i =0; i<options.length;i++){
            options[i].remove();
        }
        isOptionSelected = false;
        return;
    }
    isOptionSelected = true;
    let colorPicker = document.createElement("input");
    colorPicker.classList.add("colorPicker","option-selected");
    colorPicker.type = "color";
    body.append(colorPicker);
    colorPicker.click();
    colorPicker.addEventListener("input",e=>{
        if(lastCell){
            lastCell.style.background = e.currentTarget.value;
            let dataAddress = lastCell.getAttribute("data-address");
            dataObj[dataAddress].bgColor = e.currentTarget.value; 
        }
    })
    
});

textColorBtn.addEventListener("click",e=>{
    if(isOptionSelected){
        let options = document.querySelectorAll(".option-selected");
        for(let i =0; i<options.length;i++){
            options[i].remove();
        }
        isOptionSelected = false;
        return;
    }
    isOptionSelected = true;
    let fontColorPicker = document.createElement("input");
    fontColorPicker.classList.add("colorPicker","option-selected")
    fontColorPicker.type = "color";
    body.append(fontColorPicker);
    fontColorPicker.click();
    fontColorPicker.addEventListener("input",e=>{
        if(lastCell){
            lastCell.style.color = e.currentTarget.value;
            let dataAddress = lastCell.getAttribute("data-address");
            dataObj[dataAddress].color = e.currentTarget.value;
        }
    })
})

fontFamilyBtn.addEventListener("change",e=>{
    if(lastCell){
        lastCell.style.fontFamily = e.currentTarget.value;
        let dataAddress = lastCell.getAttribute("data-address");
        dataObj[dataAddress].fontFamily = e.currentTarget.value;
    }
})

fontSizeBtn.addEventListener("change",e=>{
    if(lastCell){
        lastCell.style.fontSize = e.currentTarget.value;
        let dataAddress = lastCell.getAttribute("data-address");
        dataObj[dataAddress].fontSize = e.currentTarget.value;
    }
})