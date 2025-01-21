class Cart {
    cartProducts;
    #localStorageKey;

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.cartProducts = JSON.parse(localStorage.getItem(this.#localStorageKey));
        if (this.cartProducts === null) this.cartProducts = [];
    }


    removeProductFromCart(productId) {
        for (let i = 0; i < this.cartProducts.length; i++) {
            if (this.cartProducts[i].productId === productId) {
                this.cartProducts.splice(i, 1);   
                break;
            }
        }
    
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartProducts));
    }
    
    updateProductQuantity(productId, quantity) {
        for (let i = 0; i < this.cartProducts.length; i++) {
            if (this.cartProducts[i].productId === productId) {
                this.cartProducts[i].quantity = quantity;
                break;
            }
        }
    
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartProducts));
    }
    
    getNumberOfItems() {
        let count = 0;
        this.cartProducts.forEach(product => {
            count += Number(product.quantity);
        });
    
        return count;
    }
    
    addProductToCart(product) {
        let added = false;
        for (let i = 0; i < this.cartProducts.length; i++) {
            if (this.cartProducts[i].productId === product.productId) {
                this.cartProducts[i].quantity = Number(this.cartProducts[i].quantity) + Number(product.quantity);
                added = true;
                break;
            }
        }
    
        if (!added) this.cartProducts.push(product);
        
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartProducts));
    }
};

export const normalCart = new Cart('cartProduct');