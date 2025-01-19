import { cartProducts, removeProductFromCart, deliveryOptions, getNumberOfItems, updateProductQuantity } from "../data/cart.js";
import { getDate } from "./day.js";

generateOrderSummary();
generatePaymentSummary();
addEventForDeleteProduct();
addEventForUpdateProduct();
addEventForDeliveryOption();


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
                            <span>Quantity: 
                                <span class="update-quantity-input"></span>
                                <span class="quantity-label">
                                    ${product.quantity}
                                </span>
                            </span>
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

function generatePaymentSummary() {
    let cost = 0;
    cartProducts.forEach(product => {
        cost += Number(product.quantity) * Number(product.priceCents);
    });

    let shippingCost = 0;
    cartProducts.forEach(product => {
        deliveryOptions.forEach(option => {
            if (product.deliveryOption === option.optionId) {
                shippingCost += (option.priceCents === 'FREE' ? 0 : Number(option.priceCents));
            }
        });
    });

    let beforeTax = (cost + shippingCost);
    let tax = beforeTax * 0.1;

    let html = `
        <div class="payment-summary-title">
            Payment Summary
        </div>

        <div class="payment-summary-row">
            <div>Items ($${getNumberOfItems()}):</div>
            <div class="payment-summary-money">$${(cost / 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${(shippingCost / 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${(beforeTax / 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${(tax / 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${((beforeTax + tax) / 100).toFixed(2)}</div>
        </div>

        <button class="place-order-button button-primary">
            Place your order
        </button>
    `;

    //Update grid
    const paymentSumary = document.querySelector('.payment-summary');
    paymentSumary.innerHTML = html;
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
                        ${option.priceCents === `FREE` ? `FREE - Shipping` : `$${(Number(option.priceCents) / 100).toFixed(2)} - Shipping`}
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
            generatePaymentSummary();
            updateCheckoutHeader();
        });
    });
}

function addEventForUpdateProduct() {
    const allProductQuantitys = document.querySelectorAll('.product-quantity');

    allProductQuantitys.forEach(productQuantity => {
        const quantityInput = productQuantity.querySelector('.update-quantity-input');
        const quantityLabel = productQuantity.querySelector('.quantity-label');
        const updateButton = productQuantity.querySelector('.update-quantity-link');
        const productId = updateButton.dataset.productId;
        
        updateButton.addEventListener('click', () => {
            if (updateButton.innerText === 'Update') {
                updateButton.innerHTML = `Save`;
                let inputTagQuantity = document.createElement('input');
                inputTagQuantity.type = "number";
                inputTagQuantity.classList = "quantity-input";
                inputTagQuantity.value = Number(quantityLabel.innerText);
                inputTagQuantity.min = 0;
                inputTagQuantity.addEventListener('keypress', (event) => {
                    if (event.key === 'Enter') {
                        let quantityValue = quantityInput.querySelector('.quantity-input').value;
                        if (quantityValue === '') quantityValue = '1'; 

                        if (Number(quantityValue) < 0) {
                            alert('Invalid quantity!!!');
                            return;
                        }

                        updateButton.innerHTML = 'Update';
                        quantityLabel.innerHTML = `${quantityValue}`;
                        quantityInput.innerHTML = ``;

                        if (Number(quantityValue) === 0) {
                            removeProductFromCart(productId);
                            productQuantity.closest('.cart-item-container').remove();
                        }
                        else {
                            updateProductQuantity(productId, Number(quantityValue));
                        }

                        generatePaymentSummary();
                        updateCheckoutHeader();
                    }
                });
                
                quantityInput.appendChild(inputTagQuantity);
                quantityLabel.innerHTML = '';
            }
            else {
                let quantityValue = quantityInput.querySelector('.quantity-input').value;
                if (quantityValue === '') quantityValue = '1'; 

                if (Number(quantityValue) < 0) {
                    alert('Invalid quantity!!!');
                    return;
                }

                updateButton.innerHTML = 'Update';
                quantityLabel.innerHTML = `${quantityValue}`;
                quantityInput.innerHTML = ``;

                if (Number(quantityValue) === 0) {
                    removeProductFromCart(productId);
                    productQuantity.closest('.cart-item-container').remove();
                }
                else {
                    updateProductQuantity(productId, Number(quantityValue));
                }

                generatePaymentSummary();
                updateCheckoutHeader();
            }
        });
    });
}

function addEventForDeliveryOption() {
    const allDeliveryOptions = document.querySelectorAll('.delivery-options');
    allDeliveryOptions.forEach((options, index) => {
        const allOption = options.querySelectorAll('.delivery-option');
        allOption.forEach(option => {
            option.addEventListener('click', () => {
                const inputOption = option.querySelector('.delivery-option-input');
                inputOption.checked = true;

                cartProducts[index].deliveryOption = Number(option.dataset.optionId);
                updateDeliveryDate(option);
                generatePaymentSummary();
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

