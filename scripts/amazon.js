import { products } from "../data/products.js";
import { getNumberOfItems, addProductToCart } from "./checkout.js"

generateProductContainer();
addEventForAddButton();
function generateProductContainer() {
    let cnt = 0;
    const productGrid = document.querySelector('.products-grid');

    products.forEach(product => {
        const html = `
            <div class="product-container">
                <div class="product-image-container">
                    <img class="product-image" src="${product.image}">
                </div>

                <div class="product-name limit-text-to-2-lines">${product.name}</div>

                <div class="product-rating-container">
                    <img class="product-rating-stars"
                        src="images/ratings/rating-${product.rating.stars * 10}.png">
                    <div class="product-rating-count link-primary">${product.rating.count}</div>
                </div>

                <div class="product-price">$${(product.priceCents / 100).toFixed(2)}</div>

                <div class="product-quantity-container">
                    <select class="quantity-selector">
                        <option selected value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>

                <div class="product-spacer"></div>

                <div class="added-to-cart">
                    <img src="images/icons/checkmark.png">
                    Added
                </div>

                <button class="add-to-cart-button button-primary" 
                    data-product-id="${product.id}"
                    data-product-name="${product.name}" 
                    data-product-image="${product.image}"
                    data-price-cents="${product.priceCents}">
                    Add to Cart
                </button>
            </div>
        `;

        productGrid.innerHTML += html;
    });

    const cartQuantity = document.querySelector('.cart-quantity');
    cartQuantity.innerHTML = getNumberOfItems();
}

let setTimeoutID = {};
function addEventForAddButton() {
    document.querySelectorAll('.add-to-cart-button').forEach(addBut => {
        addBut.addEventListener('click', () => {
            //Get quantity
            const productContainer = addBut.closest('.product-container');
            const quantity = productContainer.querySelector('.quantity-selector').value;

            //Add product to cart
            const cartQuantity = document.querySelector('.cart-quantity');
            let product = Object.assign({}, addBut.dataset);
            product.quantity = quantity;
            addProductToCart(product);
            cartQuantity.innerHTML = getNumberOfItems();

            //Set added
            const addedToCart = productContainer.querySelector('.added-to-cart');
            addedToCart.classList.add('is-added-to-cart');
            clearTimeout(setTimeoutID[product.productId]);
            setTimeoutID[product.productId] = setTimeout(() => {
                addedToCart.classList.remove('is-added-to-cart');
                delete setTimeoutID[product.productId];
            }, 2000);
        });
    });
}