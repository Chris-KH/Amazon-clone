export let cartProducts = JSON.parse(localStorage.getItem('cartProduct'));
if (cartProducts === null) cartProducts = [];

//localStorage.clear();