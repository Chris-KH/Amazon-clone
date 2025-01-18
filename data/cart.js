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
