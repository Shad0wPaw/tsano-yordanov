const cardsObject = document.getElementsByClassName("card-selector")
const mainPagePr = document.getElementsByClassName("projects")[0]


for(a=0; a<cardsObject.length; a++){
 cardsObject[a].addEventListener('click', ()=>{
    location.replace("productCrystal.html")
})
}