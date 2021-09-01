//Calcul et insertion de la somme totale des produits.
let productOrdered = JSON.parse(localStorage.getItem("basketShop"));
let total = 0;

productOrdered.forEach(function (teddiesOrdered) {
    let price = teddiesOrdered.price / 100;
    total += price;
});

let priceDisplay = document.getElementById("commandPrice");
priceDisplay.innerText = total + " " + "\u20AC";

//-------------------------------------------------------------------------

//Récupération et insertion du numéro d'id de la commande.
let commandNum = document.getElementById("commandNum");
let stringRandomNum = localStorage.getItem("orderId");
commandNum.innerText = stringRandomNum;

//localStorage vidé après la commande validée.
localStorage.clear();