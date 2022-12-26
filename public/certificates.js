const eachCard = document.getElementsByClassName("card-selector");

function openCf() {
  var imgCfsrc = this.childNodes[1].src;
  const cfOpen = document.getElementsByClassName("cf-open")[0];
  const cfChilds = cfOpen.childNodes;
  for (i = 0; i < cfChilds.length; i++) {
    if (cfChilds[i].nodeName.toLowerCase() == "div") {
      cfChilds[i].style.display = "none";
    }
  }
  const cfDiv = document.createElement("div");
  cfDiv.classList.add(
    "rounded",
    "mt-3",
    "position-relative"
  );
  var cfImg = document.createElement("img");
  cfImg.setAttribute("src", imgCfsrc);
  cfImg.setAttribute("height", "auto");
  cfImg.setAttribute("width", "100%");
  cfImg.classList.add("mt-3", "mb-3", "rounded");
  const xButton = document.createElement("i");
  xButton.className = 'fa-sharp fa-solid fa-xmark'
  cfOpen.append(cfDiv);
  cfDiv.append(cfImg);
  cfDiv.prepend(xButton);
  xButton.addEventListener('click', ()=>{
    cfDiv.remove()
    for (ir = 0; ir < cfChilds.length; ir++) {
        if (cfChilds[ir].nodeName.toLowerCase() == "div") {
          cfChilds[ir].style.display = "inline-block";
        }
      }
  })
}
for (ec = 0; ec < eachCard.length; ec++) {
  eachCard[ec].addEventListener("click", openCf, false);
}
