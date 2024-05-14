document.addEventListener("DOMContentLoaded", function () {
    const maindiv = document.getElementById('main');
    const addcart = document.getElementById('cart');
    const pcart = document.getElementById('cartp');
    const modal = document.getElementById('description');
    const desc = document.getElementById("descp");
    const clsdesc = document.getElementById('clsdesc');
    const header = document.getElementById('header');

    function fetchData() {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => displayData(data))
            .catch(error => console.log(error));
    }

    fetchData();

    function displayData(products) {
        products.forEach(product => {
            const card = createCard(product);
            maindiv.appendChild(card);
        });
    }

    function createCard(product) {
        const card = document.createElement('div');
        card.classList.add('procard');

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.title;
        img.classList.add('product_img');
        card.appendChild(img);

        const title = document.createElement('p');
        title.textContent = product.title;
        title.classList.add('title');
        card.appendChild(title);

        const price = document.createElement('p');
        price.textContent = `$${product.price}`;
        price.classList.add('price');
        card.appendChild(price);

        const showDescBtn = document.createElement('button'); // Create button to show description
        showDescBtn.textContent = 'Show Description'; // Button text
        showDescBtn.classList.add('btn', 'show-desc'); // Add button class
        showDescBtn.addEventListener('click', () => openModal(product.description)); // Show description on click
        card.appendChild(showDescBtn); // Append button to the card

        const addToCartBtn = document.createElement('button'); // Create button to add to cart
        addToCartBtn.textContent = 'Add to Cart'; // Button text
        addToCartBtn.classList.add('btn'); // Add button class
        addToCartBtn.addEventListener('click', () => addToCart(product)); // Add to cart on click
        card.appendChild(addToCartBtn); // Append button to the card

        return card;
    }

    function openModal(description) {
        desc.textContent = description;
        modal.style.visibility = "visible";
    }

    function closeModal() {
        modal.style.visibility = "hidden";
    }

    function addToCart(product) {
        addcart.style.visibility = "visible";
        pcart.textContent = `Added to cart: ${product.title}`; // Update the cart message with product title
        setTimeout(() => {
            addcart.style.visibility = "hidden";
        }, 2000); // Hide after 2 seconds
    }

    clsdesc.addEventListener('click', closeModal);

    // Hide shopping bar initially
    addcart.style.visibility = "hidden";

    // Prevent display of shopping bar when an image is clicked
    maindiv.addEventListener('click', (event) => {
        if (event.target.tagName.toLowerCase() === 'img') {
            addcart.style.visibility = "hidden";
        }
    });

    // Show shopping bar on scroll down
    let lastScrollTop = 0;
    window.addEventListener("scroll", function(){
        let st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop){
            // downscroll code
            header.style.top = "-50px";
        } else {
            // upscroll code
            header.style.top = "0";
        }
        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    }, false);
});
