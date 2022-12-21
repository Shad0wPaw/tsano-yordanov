const cardsObject = document.getElementsByClassName("card-selector")

function goToProject(){
    location.replace("productCrystal.html")
}

for(a=0; a<cardsObject.length; a++){
 cardsObject[a].addEventListener('click', goToProject)
}