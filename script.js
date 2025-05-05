const carrotsamount = document.getElementById("carrotsamount");
const field = document.getElementById("fieldcarrot");
const marchewka = document.createElement("img");
const marchewkiamount = document.getElementById("marchewkifieldamount");
const sellshop = document.getElementById("sellshop");
const closeshop = document.getElementById("closeshop");
const openshop = document.getElementById("openshop");
marchewka.src = "marchewka.png";
let marchewki = 0;
let marchewkifieldamt = 0;
let marchewkimulti = 1;
marchewka.addEventListener("mouseover", collectmarchewka);

function collectmarchewka() {

    if(field.contains(marchewka)) {
        field.removeChild(marchewka);
        marchewki += marchewkifieldamt;
    }
    marchewkifieldamt = 0;
}

function producecarrots() {
    setInterval(() => {
        setTimeout(() => {

            field.appendChild(marchewka);
            marchewkifieldamt += 1*marchewkimulti;
          }, 1000);
    {
}}, 1000);
}

function updateui() {
    setInterval(() => {
    carrotsamount.textContent = "You Have: " + marchewki +" Carrots";
    marchewkiamount.textContent = "There are : "+marchewkifieldamt+" Carrots in this field";
    functional_shopsell();
}, 10)}  ;

updateui();
producecarrots();

function loadshop() {
    fetch("sell.html")
      .then(response => {
        if (!response.ok) throw new Error("Błąd ładowania");
        return response.text();
      })
      .then(html => {
        sellshop.innerHTML = html;
        sellshop.classList.remove("hide");
        sellshop.classList.add("show");
      })
      .catch(error => {
        sellshop.textContent = "Błąd: " + error.message;
      });
      
  }
function closesellshop() {
    if(sellshop.classList.contains("show")) {
        sellshop.classList.remove("show");
        sellshop.classList.add("hide");
        
      }
}
function functional_shopsell(){
    if(sellshop.classList.contains("show")) {
        openshop.classList.add("hide");
    }
    else {
        openshop.classList.remove("hide");
    }
    if(sellshop.classList.contains("hide")) {
        closeshop.classList.add("hide");
    }
    else {
        closeshop.classList.remove("hide");
    }
}