export let cartProducts = JSON.parse(localStorage.getItem('cartProduct'));
if (cartProducts === null) cartProducts = [];

//localStorage.clear();

export function removeProductFromCart(productId) {
    for (let i = 0; i < cartProducts.length; i++) {
        if (cartProducts[i].productId === productId) {
            cartProducts.splice(i, 1);
            break;
        }
    }

    localStorage.setItem('cartProduct', JSON.stringify(cartProducts));
}

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

export const deliveryOptions = [
    {
        optionId: 1,
        numberOfDay: 10,
        priceCents: "FREE"
    },
    {
        optionId: 2,
        numberOfDay: 7,
        priceCents: "499"
    },
    {
        optionId: 3,
        numberOfDay: 3,
        priceCents: "999"
    }
];