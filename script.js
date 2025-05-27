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
const carrotfieldarea = document.getElementById("carrotfieldplace");
const allCarrotFields = document.querySelectorAll('.field');
marchewka.src = "marchewka.png";
let priceupgrade1 = 10;
let priceupgrade2 = 100;
let priceupgrade3 = 1;
let marchewki = 0;
const marchewkifieldamt = []; 
let marchewkimulti = 1;
let money = 15 ;
let marchewkibase = 1;
let fieldnumber = 0;


function collectmarchewka(event) {
    const index = parseInt(event.currentTarget.dataset.index, 10);
    if (marchewkifieldamt[index] > 0) {
        marchewki += marchewkifieldamt[index];
        marchewkifieldamt[index] = 0;
        console.log(`Zebrano marchewki z pola ${index}`);
    }
}

function producecarrots() {
    setInterval(() => {
        for (let i = 0; i < marchewkifieldamt.length; i++) {
            if (typeof marchewkifieldamt[i] !== 'number') {
                marchewkifieldamt[i] = 0;
            }
            marchewkifieldamt[i] += marchewkibase * marchewkimulti;
            ;
        }
        
    }, 1000);
}

function updateui() {
    setInterval(() => {
    carrotsamount.textContent = "You Have: " + marchewki +" Carrots";
    moneyamount.textContent = "You Have: " + money + " Money";
    functional_shopsell();
    functional_upgradeshop();
    document.querySelectorAll(".carrotamountinfield").forEach((elem, index) => {
  elem.textContent = `Carrots in field: ${marchewkifieldamt[index]}`;
});
    if (upgradeshop.classList.contains("show")!=true){

    }
    else{
        document.getElementById("upgrade1").textContent = "Upgrade 1: " + priceupgrade1 + " Money";
        document.getElementById("upgrade2").textContent = "Upgrade 2: " + priceupgrade2 + " Money";
         document.getElementById("upgrade3").textContent = "Buy new Plots!: " + priceupgrade3 + " Money";
    }
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
        const upgrade3 = document.getElementById("upgrade3");
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
    upgrade3.addEventListener("click", () => {
          if (money >= priceupgrade3){
              money -= priceupgrade3;
              marchewkifieldamt.push(0);
              const carrotfield = document.createElement("div");
              const carrotfieldcarrotsamt = document.createElement("p");
              carrotfield.id = `fieldcarrot${fieldnumber}`;
              carrotfield.className = `field`;
              carrotfield.dataset.index = fieldnumber;
              carrotfieldarea.appendChild(carrotfield);
               carrotfield.addEventListener("mouseover", collectmarchewka);
              priceupgrade3 *= 1000;
              carrotfieldcarrotsamt.id =`marchewkifieldamount${fieldnumber}`;
              carrotfieldcarrotsamt.className = `carrotamountinfield`;
              
              carrotfield.appendChild(carrotfieldcarrotsamt);
              fieldnumber++;
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
