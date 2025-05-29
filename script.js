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
const mainmenu = document.getElementById("mainmenu");
const skilltree = document.getElementById("skilltree");
const openskilltree = document.getElementById("openskilltree");
const closeskilltree = document.getElementById("closeskilltree");
const xpamount = document.getElementById("xpamount");
const getxp = document.getElementById("getxp");
let priceupgrade1 = 10;
let priceupgrade2 = 100;
let priceupgrade3 = 1;
let marchewki = 0;
const marchewkifieldamt = []; 
let marchewkimulti = 1;
let money = 150000 ;
let marchewkibase = 1;
let fieldnumber = 0;
let marchewkiprice = 2;
let xp = 0;
let skill1amountbought = 0;
let skill1price = 1;

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
    xpamount.textContent = "You Have: " + xp + " XP";
    functional_shopsell();
    functional_upgradeshop();
    functional_skilltree();
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
    document.getElementById("skill1").textContent = "Doubles price of carrots Price: " + skill1price + `xp.    ` + skill1amountbought + "/10" + " bought";
        
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
        const amountxptoconvert = document.getElementById("amountxptoconvert");
        const convertmoneytoxp = document.getElementById("convertmoneytoxp");
        sellcarrotsbutton.addEventListener("click", () => { 
            if (marchewki > 0) {
              money += marchewki * marchewkiprice;
              marchewki = 0;       
            }
          });
          convertmoneytoxp.addEventListener("click", () => {
            if(amountxptoconvert.value > 0 && money >= parseInt(amountxptoconvert.value, 10)*10000){
                xp += parseInt(amountxptoconvert.value, 10);
                money -= parseInt(amountxptoconvert.value, 10)*10000;
                amountxptoconvert.value = "";
            }
            else{
                alert("You dont have enough money!!!");
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

function loadskilltree() {
    fetch("skilltree.html")
      .then(response => {
        if (!response.ok) throw new Error("Błąd ładowania");
        return response.text();
      })
      .then(html => {
        skilltree.innerHTML = html;
        skilltree.classList.remove("hide");
        skilltree.classList.add("show");
         if(mainmenu.classList.contains("show")) {
        mainmenu.classList.remove("show");
        mainmenu.classList.add("hide");
}

        const skill1 = document.getElementById("skill1");
        skill1.addEventListener("click", () => {
            if(skill1amountbought < 10 && xp >= skill1price){
                skill1amountbought += 1;
                xp -= skill1price;
                marchewkiprice *= 2;
                skill1price *= 5;
            }
            else {
                alert("You dont have enough XP or you reached max level of this skill!");
            }
    });



      })
      .catch(error => {
        skilltree.textContent = "Błąd: " + error.message;
      });

  }
function close_skilltree() {
    if(skilltree.classList.contains("show")) {
        skilltree.classList.remove("show");
        skilltree.classList.add("hide");
        
      }
    if(mainmenu.classList.contains("hide")) {
        mainmenu.classList.remove("hide");
        mainmenu.classList.add("show");
    }
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
function functional_skilltree(){
    if(skilltree.classList.contains("show")) {
        openskilltree.classList.add("hide");
    }
    else {
        openskilltree.classList.remove("hide");
    }
    if(skilltree.classList.contains("hide")) {
        closeskilltree.classList.add("hide");
    }
    else {
        closeskilltree.classList.remove("hide");
    }
    
   
}

updateui();
producecarrots();
