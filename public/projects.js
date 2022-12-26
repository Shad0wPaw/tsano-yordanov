const cardsObject = document.getElementsByClassName("bg-card")


function addEvent(el, event, callback) {
    if('addEventListener' in el){
      el.addEventListener(event, callback, false);
    } else {
      el['e' + event + callback] = callback;
      el[event + callback] = function() {
        el['e' + event + callback](window.event);
      };
      el.attachEvent('on' + event, el[event + callback])
    }
  }

function goToProject(){
    location.replace("productCrystal.html")
}

for(a=0; a<cardsObject.length; a++){
addEvent(cardsObject[a], 'click', goToProject)
}