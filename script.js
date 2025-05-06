const carrotsamount = document.getElementById("carrotsamount");
const field = document.getElementById("fieldcarrot");
const marchewka = document.createElement("img");
const marchewkiamount = document.getElementById("marchewkifieldamount");
const sellshop = document.getElementById("sellshop");
const upgradeshop = document.getElementById("upgradeshop");
const closesellingshop = document.getElementById("closesellingshop");
const opensellingshop = document.getElementById("opensellingshop");
const closeupgradeshop = document.getElementById("closeupgradeshop");
const openupgradeshop = document.getElementById("openupgradeshop");
const moneyamount = document.getElementById("moneyamount");
marchewka.src = "marchewka.png";
let priceupgrade1 = 10;
let priceupgrade2 = 100;
let marchewki = 0;
let marchewkifieldamt = 0;
let marchewkimulti = 1;
let money = 0;
let marchewkibase = 1;
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
            marchewkifieldamt += marchewkibase*marchewkimulti;
          }, 1000);
    {
}}, 1000);
}

function updateui() {
    setInterval(() => {
    carrotsamount.textContent = "You Have: " + marchewki +" Carrots";
    marchewkiamount.textContent = "There are : "+marchewkifieldamt+" Carrots in this field";
    moneyamount.textContent = "You Have: " + money + " Money";
    functional_shopsell();
    functional_upgradeshop();
    document.getElementById("upgrade1").textContent = "Upgrade 1: " + priceupgrade1 + " Money";
    document.getElementById("upgrade2").textContent = "Upgrade 2: " + priceupgrade2 + " Money";
    
}, 10)}  ;

function loadsellshop() {
    fetch("sell.html")
      .then(response => {
        if (!response.ok) throw new Error("Błąd ładowania");
        return response.text();
      })
      .then(html => {
        sellshop.innerHTML = html;
        sellshop.classList.remove("hide");
        sellshop.classList.add("show");
        const sellcarrotsbutton = document.getElementById("sellcarrots");
        sellcarrotsbutton.addEventListener("click", () => { 
            if (marchewki > 0) {
              money += marchewki * 2;
              marchewki = 0;       
            }
          });

      })
      .catch(error => {
        sellshop.textContent = "Błąd: " + error.message;
      });

  }
function loadupgradeshop() {
    fetch("upgrades.html")
      .then(response => {
        if (!response.ok) throw new Error("Błąd ładowania");
        return response.text();
      })
      .then(html => {
        upgradeshop.innerHTML = html;
        upgradeshop.classList.remove("hide");
        upgradeshop.classList.add("show");
        const upgrade1 = document.getElementById("upgrade1");
        const upgrade2 = document.getElementById("upgrade2");
        
        upgrade1.addEventListener("click", () => {
            if (money >= priceupgrade1){
                money -= priceupgrade1;
                marchewkibase += 1;
                priceupgrade1 *= 10;
                
            }
      });
      upgrade2.addEventListener("click", () => {
        if (money >= priceupgrade2){
            money -= priceupgrade2;
            marchewkimulti *= 2;
            priceupgrade2 *= 10;
            
        }
  });
    })
      .catch(error => {
        upgradeshop.textContent = "Błąd: " + error.message;
      });

  }
function closesellshop() {
    if(sellshop.classList.contains("show")) {
        sellshop.classList.remove("show");
        sellshop.classList.add("hide");
        
      }
}
function close_upgradeshop() {
    if(upgradeshop.classList.contains("show")) {
        upgradeshop.classList.remove("show");
        upgradeshop.classList.add("hide");
        
      }
}
function functional_shopsell(){
    if(sellshop.classList.contains("show")) {
        opensellingshop.classList.add("hide");
    }
    else {
        opensellingshop.classList.remove("hide");
    }
    if(sellshop.classList.contains("hide")) {
        closesellingshop.classList.add("hide");
    }
    else {
        closesellingshop.classList.remove("hide");
    }
}
function functional_upgradeshop(){
    if(upgradeshop.classList.contains("show")) {
        openupgradeshop.classList.add("hide");
    }
    else {
        openupgradeshop.classList.remove("hide");
    }
    if(upgradeshop.classList.contains("hide")) {
        closeupgradeshop.classList.add("hide");
    }
    else {
        closeupgradeshop.classList.remove("hide");
    }
}

updateui();
producecarrots();
