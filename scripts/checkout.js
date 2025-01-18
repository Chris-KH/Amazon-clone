import { cartProducts } from "../data/cart.js";

//localStorage.clear();

export function getNumberOfItems() {
    let count = 0;
    cartProducts.forEach(product => {
        count += Number(product.quantity);
    });

    return count;
}

export function addProductToCart(product) {
    let added = false;
    for (let i = 0; i < cartProducts.length; i++) {
        if (cartProducts[i].productId === product.productId) {
            cartProducts[i].quantity = Number(cartProducts[i].quantity) + Number(product.quantity);
            added = true;
            break;
        }
    }

    if (!added) cartProducts.push(product);

    localStorage.setItem('cartProduct', JSON.stringify(cartProducts));
}

if (window.location.pathname === '/checkout.html') {
    generateCheckOut();
}


function generateCheckOut() {
    let html = `        <div class="order-summary">`;
    let cnt = 1;
    cartProducts.forEach(product => {
        html += `
            <div class="cart-item-container">
                <div class="delivery-date">
                    Delivery date: Tuesday, June 21
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image" src="${product.productImage}">

                    <div class="cart-item-details">
                        <div class="product-name">
                            ${product.productName}
                        </div>
                        <div class="product-price">
                            $${(Number(product.quantity) * Number(product.priceCents) / 100).toFixed(2)}
                        </div>
                        <div class="product-quantity">
                            <span>Quantity: <span class="quantity-label">${product.quantity}</span></span>
                            <span class="update-quantity-link link-primary">Update</span>
                            <span class="delete-quantity-link link-primary">Delete</span>
                        </div>
                    </div>

                    <div class="delivery-options">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        <div class="delivery-option">
                            <input type="radio" checked class="delivery-option-input" name="delivery-option-${cnt}">
                            <div>
                                <div class="delivery-option-date">
                                    Tuesday, June 21
                                </div>
                                <div class="delivery-option-price">
                                    FREE Shipping
                                </div>
                            </div>
                        </div>
                        <div class="delivery-option">
                            <input type="radio" class="delivery-option-input" name="delivery-option-${cnt}">
                            <div>
                                <div class="delivery-option-date">
                                    Wednesday, June 15
                                </div>
                                <div class="delivery-option-price">
                                    $4.99 - Shipping
                                </div>
                            </div>
                        </div>
                        <div class="delivery-option">
                            <input type="radio" class="delivery-option-input" name="delivery-option-${cnt}">
                            <div>
                                <div class="delivery-option-date">
                                    Monday, June 13
                                </div>
                                <div class="delivery-option-price">
                                    $9.99 - Shipping
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;


        cnt++;
    });
    html += '</div>';

    //Update grid
    const checkoutGrid = document.querySelector('.checkout-grid');
    checkoutGrid.innerHTML = html + checkoutGrid.innerHTML;

    //Update header
    const numItems = getNumberOfItems();
    const middleHeader = document.querySelector('.return-to-home-link');
    if (numItems <= 1) middleHeader.innerText = `${numItems} item`;
    else middleHeader.innerText = `${numItems} items`;
}