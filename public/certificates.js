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
  cfImg.setAttribute("height", "760px");
  cfImg.setAttribute("width", "100%");
  cfImg.classList.add("mt-3", "mb-3", "rounded");
  const xButton = document.createElement("i");
  xButton.classList.add(
    "fa-solid",
    "fa-xmark-large",
    "position-absolute",
    "top-0",
    "end-0"
  );
  cfOpen.append(cfDiv);
  cfDiv.append(xButton);
  cfDiv.append(cfImg);
}
for (ec = 0; ec < eachCard.length; ec++) {
  eachCard[ec].addEventListener("click", openCf, false);
}
