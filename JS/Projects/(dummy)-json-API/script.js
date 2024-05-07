
const mainDiv = document.getElementById('recipes');
const cartNotification = document.getElementById('cart-notification');
const cartDiv = document.getElementById('cart');
const recipePopup = document.getElementById('recipe-popup');
const recipeTitle = document.getElementById('recipe-title');
const recipeDetails = document.getElementById('recipe-details');

let cartItems = [];

function fetchData() {
    fetch("https://dummyjson.com/recipes")
        .then(res => res.json())
        .then(data => displayData(data.recipes));
}

fetchData();

function displayData(data) {
    data.forEach(r => {
        const recipe = document.createElement('div');
        recipe.classList.add('recipe');
        const image = document.createElement('img');
        image.src = r.image;
        image.alt = r.name;
        const title = document.createElement('h3');
        title.textContent = r.name;

        const cartBtn = document.createElement('button');
        cartBtn.textContent = 'Add to Cart';
        cartBtn.addEventListener('click', () => addToCart(r));

        const viewRecipeBtn = document.createElement('button');
        viewRecipeBtn.textContent = 'View Recipe';
        viewRecipeBtn.addEventListener('click', () => openRecipePopup(r));

        recipe.append(image, title, cartBtn, viewRecipeBtn);
        mainDiv.appendChild(recipe);
    });
}

function addToCart(recipe) {
    cartItems.push(recipe);
    updateCart();
    showNotification(recipe);
}

function updateCart() {
    cartDiv.innerHTML = '';
    cartItems.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item'); // Add a class for styling purposes
        cartItem.textContent = item.name;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn'); // Apply the delete button styling
        deleteBtn.addEventListener('click', () => deleteFromCart(index));

        cartItem.appendChild(deleteBtn);
        cartDiv.appendChild(cartItem);
    });

    if (cartItems.length === 0) {
        const emptyCartMsg = document.createElement('p');
        emptyCartMsg.textContent = 'Your cart is empty.';
        cartDiv.appendChild(emptyCartMsg);
    }
}


function showNotification(recipe) {
    cartNotification.textContent = `${recipe.name} added to cart`;
    cartNotification.style.display = 'block';
    setTimeout(() => {
        cartNotification.style.display = 'none';
    }, 2000);
}

function deleteFromCart(index) {
    cartItems.splice(index, 1);
    updateCart();
}

function openRecipePopup(recipe) {
    recipeTitle.textContent = recipe.name;
    recipeDetails.textContent = `
        Ingredients: ${recipe.ingredients.join(', ')}
        Instructions: ${recipe.instructions}
        // Add other recipe details here
    `;
    recipePopup.style.display = 'block';
}

function closePopup() {
    recipePopup.style.display = 'none';
}
