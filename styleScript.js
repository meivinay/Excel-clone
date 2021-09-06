let fileDiv = document.querySelector("#file");
let helpDiv = document.querySelector("#help");
let bgColorBtn = document.querySelector(".bgclr");
let textColorBtn = document.querySelector(".text-color");
let isOptionSelected = false;
let body = document.querySelector("body");
let fontFamilyBtn = document.querySelector("#font-family");
let fontSizeBtn = document.querySelector("#font-size");
let textAlignLeft = document.querySelector(".text-left");
let textAlignCenter = document.querySelector(".text-center");
let textAlignRight = document.querySelector(".text-right");
let boldOption = document.querySelector("#bold");
let italicOption = document.querySelector("#italic");
let underlineOption = document.querySelector("#underline");
boldOption.addEventListener("click", (e) => {
  let currCellAddress = lastCell.getAttribute("data-address");
  if (lastCell.getAttribute("font-weight") == null) {
    lastCell.setAttribute("font-weight", "bold");
    dataObj[currCellAddress].fontWeight = "bold";
    e.target.style.backgroundColor = "#cecdcd";
  } else {
    lastCell.removeAttribute("font-weight");
    dataObj[currCellAddress].fontWeight = "none";
    e.target.style.backgroundColor = "white";
    console.log(e);
  }
});

italicOption.addEventListener("click", (e) => {
  let currCellAddress = lastCell.getAttribute("data-address");
  console.log(currCellAddress);
  if (lastCell.getAttribute("font-style") == null) {
    lastCell.setAttribute("font-style", "italic");
    e.target.style.backgroundColor = "#cecdcd";
    dataObj[currCellAddress].fontStyle = "italic";
  } else {
    lastCell.removeAttribute("font-style");
    e.target.style.backgroundColor = "white";

    dataObj[currCellAddress].fontStyle = "none";
  }
});

underlineOption.addEventListener("click", (e) => {
  let currCellAddress = lastCell.getAttribute("data-address");

  if (lastCell.getAttribute("text-decoration") == null) {
    lastCell.setAttribute("text-decoration", "underline");
    e.target.style.backgroundColor = "#cecdcd";
    dataObj[currCellAddress].textDecoration = "underline";
  } else {
    lastCell.removeAttribute("text-decoration");
    e.target.style.backgroundColor = "white";
    dataObj[currCellAddress].textDecoration = "none";
  }
});

textAlignLeft.addEventListener("click", (e) => {
  let currCellAddress = lastCell.getAttribute("data-address");
  if (lastSelectedAlignOption) {
    lastSelectedAlignOption.classList.remove("selected-align");
  }

  lastSelectedAlignOption = e.currentTarget;
  //  e.currentTarget.classList.add("selected-align")

  if (lastCell.getAttribute("text-align") != "left") {
    lastCell.setAttribute("text-align", "left");
    dataObj[currCellAddress].align = "left";
  } else {
    lastCell.removeAttribute("text-align");
    dataObj[currCellAddress].align = "none";
  }
  if (dataObj[currCellAddress].align === "left") {
    e.currentTarget.classList.add("selected-align");
  }
});
textAlignCenter.addEventListener("click", (e) => {
  let currCellAddress = lastCell.getAttribute("data-address");
  if (lastSelectedAlignOption) {
    lastSelectedAlignOption.classList.remove("selected-align");
  }
  lastSelectedAlignOption = e.currentTarget;

  if (lastCell.getAttribute("text-align") != "center") {
    lastCell.setAttribute("text-align", "center");
    dataObj[currCellAddress].align = "center";
  } else {
    lastCell.removeAttribute("text-align");
    dataObj[currCellAddress].align = "none";
  }
  if (dataObj[currCellAddress].align === "center") {
    e.currentTarget.classList.add("selected-align");
  }
});
textAlignRight.addEventListener("click", (e) => {
  let currCellAddress = lastCell.getAttribute("data-address");
  if (lastSelectedAlignOption) {
    lastSelectedAlignOption.classList.remove("selected-align");
  }
  lastSelectedAlignOption = e.currentTarget;

  // lastSelectedAlignOption = e.currentTarget;
  //  e.currentTarget.classList.add("selected-align")

  if (lastCell.getAttribute("text-align") != "right") {
    lastCell.setAttribute("text-align", "right");
    dataObj[currCellAddress].align = "right";
  } else {
    lastCell.removeAttribute("text-align");
    dataObj[currCellAddress].align = "none";
  }
  if (dataObj[currCellAddress].align === "right") {
    e.currentTarget.classList.add("selected-align");
  }
});

//file-option-menu-dropdown
fileDiv.addEventListener("click", (e) => {
  let isOpen = e.currentTarget.getAttribute("file-option-open");
  if (isOpen == "true") {
    e.currentTarget.setAttribute("file-option-open", "false");
    e.currentTarget.querySelector(".file-option-container").remove();
    return;
  } else {
    e.currentTarget.setAttribute("file-option-open", "true");
    let fileMenu = document.createElement("div");
    fileMenu.classList.add("file-option-container");
    fileMenu.innerHTML = `<p class = "file-options save">
        Save
        </p>
        <p class = "file-options clear">Clear</p>`;
    let saveSheetBtn = fileMenu.querySelector(".save");
    saveSheetBtn.addEventListener("click", (e) => {
      saveSheet(e);
    });
    let clearSheetBtn = fileMenu.querySelector(".clear");
    clearSheetBtn.addEventListener("click", (e) => {
      clearSheet(e);
    });
    fileDiv.append(fileMenu);
  }
});

bgColorBtn.addEventListener("click", (e) => {
  if (isOptionSelected) {
    let options = document.querySelectorAll(".option-selected");
    for (let i = 0; i < options.length; i++) {
      options[i].remove();
    }
    isOptionSelected = false;
    return;
  }
  isOptionSelected = true;
  let colorPicker = document.createElement("input");
  colorPicker.classList.add("colorPicker", "option-selected");
  colorPicker.type = "color";
  body.append(colorPicker);
  colorPicker.click();
  colorPicker.addEventListener("input", (e) => {
    if (lastCell) {
      lastCell.style.background = e.currentTarget.value;
      let dataAddress = lastCell.getAttribute("data-address");
      dataObj[dataAddress].bgColor = e.currentTarget.value;
    }
  });
});

textColorBtn.addEventListener("click", (e) => {
  if (isOptionSelected) {
    let options = document.querySelectorAll(".option-selected");
    for (let i = 0; i < options.length; i++) {
      options[i].remove();
    }
    isOptionSelected = false;
    return;
  }
  isOptionSelected = true;
  let fontColorPicker = document.createElement("input");
  fontColorPicker.classList.add("colorPicker", "option-selected");
  fontColorPicker.type = "color";
  body.append(fontColorPicker);
  fontColorPicker.click();
  fontColorPicker.addEventListener("input", (e) => {
    if (lastCell) {
      lastCell.style.color = e.currentTarget.value;
      let dataAddress = lastCell.getAttribute("data-address");
      dataObj[dataAddress].color = e.currentTarget.value;
    }
  });
});

fontFamilyBtn.addEventListener("change", (e) => {
  if (lastCell) {
    lastCell.style.fontFamily = e.currentTarget.value;
    let dataAddress = lastCell.getAttribute("data-address");
    dataObj[dataAddress].fontFamily = e.currentTarget.value;
  }
});

fontSizeBtn.addEventListener("change", (e) => {
  if (lastCell) {
    lastCell.style.fontSize = e.currentTarget.value;
    let dataAddress = lastCell.getAttribute("data-address");
    dataObj[dataAddress].fontSize = e.currentTarget.value;
  }
});

function saveSheet(e) {
  localStorage.setItem("sheet", JSON.stringify(dataObj));
}

function clearSheet(e) {
  localStorage.removeItem("sheet");
  window.location.reload();
}
