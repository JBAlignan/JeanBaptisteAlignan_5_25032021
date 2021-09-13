//Fonction qui charge la liste des produits sur la page index.

function loadProducts() {
    // Sélection de l'élément <main> dans le DOM.
    // Création d'une variable vide de type string.
    const mainContainer = document.getElementById('myContainer');
    let teddyCart = '';

    // Recherche des données des oursons via l'API par la méthode fetch().
    // Création et insertion du code HTML pour chaque cart.
    fetch('http://localhost:3000/api/teddies')
        .then(response => response.json())
        .then((teddies) => {
            teddies.forEach(function (teddy) {
                const teddyPrice = teddy.price / 100 + ".00";
                teddyCart +=
                    `
            <article class="col-lg-6">
                <a href="../pages/product.html?id=${teddy._id}" class="text-decoration-none text-dark">
                    <div class="card mb-3 max-width">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="${teddy.imageUrl}" alt="${teddy.name}">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                <h5 class="card-title pb-1">${teddy.name}</h5>
                                <p class="card-text">${teddy.description}</p>
                                <p class="card-text">Prix: ${teddyPrice} &#128</p>
                            </div>
                        </div>
                    </div>
                </a>
            </article>
             `;
            });
            mainContainer.innerHTML = teddyCart;
        })
        .catch(error => console.log('error', error));
}

//-------------------------------------------------------------------------

//Réception du contenu du localStorage.
//Comportement des liens vers le panier si le localStorage est vide.
let basketShop = JSON.parse(localStorage.getItem("basketShop"));

function clickBasketLink() {
    if (basketShop === null || basketShop.length === 0) {
        window.alert("Votre panier est vide");
    } else {
        basketIcon.setAttribute("href", "/pages/basket.html");
        basketLink.setAttribute("href", "/pages/basket.html");
    }
};