import { products } from '../data/products.js'

const productGrid = document.querySelector('.products-grid');

function generateProductContainer() {
    products.forEach(product => {
        //Container
        const container = document.createElement('div');
        container.classList.add('product-container');
        productGrid.appendChild(container);

        //Image container
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('product-image-container');
        const productImage = document.createElement('img');
        productImage.classList.add('product-image');
        productImage.src = product.image;
        imageContainer.appendChild(productImage);

        //Name
        const productName = document.createElement('div');
        productName.classList = 'product-name limit-text-to-2-lines';
        productName.innerHTML = product.name;

        //Rating
        const productRatingContainer = document.createElement('div');
        productRatingContainer.classList = 'product-rating-container';
        const ratingImg = document.createElement('img');
        ratingImg.classList = 'product-rating-stars';
        {
            let star = Number(product.rating.stars);
            star *= 10;
            Math.round(star);
            console.log(star);

            let src = 'images/ratings/rating-' + star + '.png';
            ratingImg.src = src;
        }
        const ratingCount = document.createElement('div');
        ratingCount.classList = 'product-rating-count link-primary';
        ratingCount.innerHTML = product.rating.count;

        productRatingContainer.appendChild(ratingImg);
        productRatingContainer.appendChild(ratingCount);

        //Price
        const productPrice = document.createElement('div');
        productPrice.classList = 'product-price';
        productPrice.innerHTML = '$' + (product.priceCents / 100);

        //Option
        const productQuantityContainer = document.createElement('div');
        const select = document.createElement('select');
        for (let i = 1; i <= 10; i++) {
            const option = document.createElement('option');
            option.value = i; 
            option.textContent = i; 
            if (i === 1) {
                option.selected = true; 
            }
            select.appendChild(option); 
        }
        productQuantityContainer.appendChild(select);

        //Spacer
        const spacer = document.createElement('div');
        spacer.classList = 'product-spacer';

        //Add to cart
        const addContainer = document.createElement('div');
        addContainer.classList = 'added-to-cart';
        const addImage = document.createElement('img');
        addImage.src = 'images/icons/checkmark.png';
        addImage.innerText = 'Added';
        addContainer.appendChild(addImage);

        //Add button
        const addButton = document.createElement('button');
        addButton.classList = 'add-to-cart-button button-primary';
        addButton.textContent = 'Add to Cart';

        container.appendChild(imageContainer);
        container.appendChild(productName);
        container.appendChild(productRatingContainer);
        container.appendChild(productPrice);
        container.appendChild(productQuantityContainer);
        container.appendChild(spacer);
        container.appendChild(addContainer);
        container.appendChild(addButton);
    });
}

generateProductContainer();