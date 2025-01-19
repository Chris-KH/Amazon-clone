import { cartProducts, removeProductFromCart, deliveryOptions } from "../data/cart.js";
import { getDate } from "./day.js";


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
    generateOrderSummary();
    addEventForDeleteProduct();
    addEventForUpdateProduct();
    addEventForDeliveryOption();
}


function generateOrderSummary() {
    let html = ``;
    cartProducts.forEach(product => {
        let option = null;
        deliveryOptions.forEach(deliveryOption => {
            if (product.deliveryOption === deliveryOption.optionId) {
                option = deliveryOption;
            }
        });

        html += `
            <div class="cart-item-container">
                <div class="delivery-date">
                    Delivery date: ${getDate(option.numberOfDay)}
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
                            <span class="update-quantity-link link-primary" data-product-id="${product.productId}">Update</span>
                            <span class="delete-quantity-link link-primary" data-product-id="${product.productId}">Delete</span>
                        </div>
                    </div>

                    <div class="delivery-options">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        ${generateDeliveryOption(product)}
                    </div>
                </div>
            </div>
        `;
    });

    //Update grid
    const orderSumary = document.querySelector('.order-summary');
    orderSumary.innerHTML = html;

    //Update header
    updateCheckoutHeader();
}

function generateDeliveryOption(product) {
    let html = '';
    
    deliveryOptions.forEach(option => {
        html += `
            <div class="delivery-option" data-option-id="${option.optionId}">
                <input type="radio" ${product.deliveryOption === option.optionId ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${product.productId}">
                <div>
                    <div class="delivery-option-date">
                        ${getDate(option.numberOfDay)}
                    </div>
                    <div class="delivery-option-price">
                        FREE Shipping
                    </div>
                </div>
            </div>
        `;
    });

    return html;
}

function updateCheckoutHeader() {
    const numItems = getNumberOfItems();
    const middleHeader = document.querySelector('.return-to-home-link');
    if (numItems <= 1) middleHeader.innerText = `${numItems} item`;
    else middleHeader.innerText = `${numItems} items`;
}

function addEventForDeleteProduct() {
    const deleteButtons = document.querySelectorAll('.delete-quantity-link');

    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productContainer = button.closest('.cart-item-container');
            
            removeProductFromCart(button.dataset.productId);
            productContainer.remove();
            updateCheckoutHeader();
        });
    });
}

function addEventForUpdateProduct() {

}

function addEventForDeliveryOption() {
    const allDeliveryOptions = document.querySelectorAll('.delivery-options');
    allDeliveryOptions.forEach((options, index) => {
        console.log(index);
        const allOption = options.querySelectorAll('.delivery-option');
        allOption.forEach(option => {
            option.addEventListener('click', () => {
                const inputOption = option.querySelector('.delivery-option-input');
                inputOption.checked = true;

                cartProducts[index].deliveryOption = Number(option.dataset.optionId);
                updateDeliveryDate(option);
                localStorage.setItem('cartProduct', JSON.stringify(cartProducts));
            });
        });
    });
}

function updateDeliveryDate(deliveryOption) {
    const deliveryDate = deliveryOption.querySelector('.delivery-option-date').innerHTML;
    const deliveryDateElement = deliveryOption.closest('.cart-item-container').querySelector('.delivery-date');
    deliveryDateElement.innerHTML = `Delivery date: ${deliveryDate}`;
}