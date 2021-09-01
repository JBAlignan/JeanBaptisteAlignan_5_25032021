// Sélection de l'élément <main> dans le DOM.
// Création des variables dans le scope global.
const myContainer = document.getElementById("myContainer");
let storageManagement;
let counter;
let quantity = 1;
let selectedProduct;
let optionValue;

// Obtention de l'URL du produit consulté.
const searchUrl = new URL(window.location.href);
// Obtention de l'id du produit.
const searchId = searchUrl.searchParams.get('id');

// Recherche des données de l'ourson consulté via fetch.
// Création et insertion du code html de l'ourson consulté.
function loadProduct() {
  fetch(`http://localhost:3000/api/teddies/${searchId}`)
    .then(response => response.json())
    .then((teddy) => {
      selectedProduct = teddy;
      const price = teddy.price / 100 + ".00";
      const productCart =
        `
          <section class="card mb-3">
          <div class="col-7">
              <img src="${teddy.imageUrl}" id="img-teddy" class="card-img-top" alt="Photographie du produit">
          </div>
              <div class="card-body">
                  <h5 class="card-title" id="name" value="${teddy.name}">${teddy.name}</h5>
                      <p class="card-text">${teddy.description}</p>
                      <p class="card-text">Prix: ${price} &#128</p>
                          <div id="quantityLayout" class="mb-3">
                              <p>Quantité:</p>             
                                  <button onclick="removeQuantity(event)" id="subtractBtn" type="button" class="btn-sm btn-dark">-</button>
                                  <span id="counter"></span>
                                  <button onclick="addQuantity(event)" id="addBtn" type="button" class="btn-sm btn-dark">+</button>
                          </div>
                      <label for="color-select" id="color-select" class="mb-4">Couleur</label>
                          <select name="colorSelection" id="colorSelection">
                          </select>
                          <div id="buttonsLayout">
                              <button onclick="command(event)" class="btn btn-dark" type="button" id="command">Ajouter</button>
                              <a href="#" onclick="clickBasketLink()" id="basketLink" class="btn btn-dark" type="button">Aller au panier</a>
                          </div>
                  </div>
          </section>
          `;
      myContainer.innerHTML = productCart;
      counter = document.getElementById("counter");
      counter.innerHTML = quantity;

      //-------------------------------------------------------------------------

      //Fonction créant les options de couleurs selon les données envoyées par l'API.
      optionValue = document.getElementById("colorSelection");
      teddy.colors.forEach(function (choice) {
        const option = document.createElement("option");
        option.textContent = `${choice}`;
        option.setAttribute("value", `${choice}`)
        optionValue.add(option);
      });
    }).catch(error => console.log('error', error));
};

//-------------------------------------------------------------------------

//Initialisation des autres fonctions.

//Fonction d'envoi de produit au localStorage.
function command(event) {

  event.preventDefault();
  if (selectedProduct) {
    storageManagement = getLocalStorage();
    if (storageManagement.length === 0) {
      storageManagement.push({
        name: selectedProduct.name,
        description: selectedProduct.description,
        image: selectedProduct.imageUrl,
        id: selectedProduct._id,
        quantity: quantity,
        price: quantity * selectedProduct.price,
        color: optionValue.value
      });
      window.location.reload();
    } else {
      //Vérification si array contient le produit.
      let existingProduct = storageManagement.find(product => product.id === selectedProduct._id);
      if (existingProduct) {
        existingProduct.quantity += quantity;
        existingProduct.price += quantity * selectedProduct.price;
      } else {
        storageManagement.push({
          name: selectedProduct.name,
          description: selectedProduct.description,
          image: selectedProduct.imageUrl,
          id: selectedProduct._id,
          quantity: quantity,
          price: quantity * selectedProduct.price,
          color: optionValue.value
        });
      }
    }
    localStorage.setItem("basketShop", JSON.stringify(storageManagement));
  }
}

//Gestion du bouton Aller au panier.
// function clickButton(event) {
//   event.preventDefault();
//   let basketLink = document.getElementById("basketLink");
//   storageManagement = getLocalStorage();
//   if (storageManagement.length !== 0) {
//     basketLink.setAttribute("href", "/pages/basket.html");
//   }
// }

//Obtention du localStorage.
function getLocalStorage() {
  return JSON.parse(localStorage.getItem("basketShop")) || [];
}

//Gestion des boutons des quantités.
function addQuantity(event) {
  event.preventDefault();
  quantity++;
  counter.innerHTML = quantity;
}

function removeQuantity(event) {
  event.preventDefault();
  quantity--;
  if (quantity < 1) {
    quantity = 1;
  }
  counter.innerHTML = quantity;
}