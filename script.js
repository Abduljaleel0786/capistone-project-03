let cart = {};

// Function to fetch meals from TheMealDB API
async function fetchMeals() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
    const data = await response.json();
    displayMeals(data.meals);
}

// Function to display meals on the page
function displayMeals(meals) {
    const mealItems = document.getElementById('mealItems');
    mealItems.innerHTML = '';

    meals.forEach(meal => {
        const price = (Math.random() * 20 + 5).toFixed(2); // Random price between $5 and $25
        mealItems.innerHTML += `
                    <div class="col-md-3 ">
                        <div class="text-center ">
                            <img src="${meal.strMealThumb}" class="card-img-top " alt="${meal.strMeal}" style="width: 150px",style="height: 200px>
                            <div class="card-body">
                                <h5 class="card-title">${meal.strMeal}</h5>
                                <p class="card-text">$${price}</p>
                                <button class="btn btn-primary" onclick="addToCart(${meal.idMeal}, '${meal.strMeal}', ${price}, '${meal.strMealThumb}')">+</button>
                            </div>
                        </div>
                    </div>
                `;
    });
}

// Function to add products to the cart
function addToCart(id, name, price, image) {
    if (!cart[id]) {
        cart[id] = { id, name, price, image, quantity: 1 };
    } else {
        cart[id].quantity++;
    }
    updateCart();
}

// Function to remove products from the cart
function removeFromCart(id) {
    delete cart[id];
    updateCart();
}

// Function to update the cart UI
function updateCart() {
    const cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = '';
    let totalPrice = 0;
    let totalItems = 0;

    Object.values(cart).forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        totalItems += item.quantity;

        cartItems.innerHTML += `
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <img src="${item.image}" alt="${item.name}" height="50">
                        <div>
                            <strong>${item.name}</strong><br>$${item.price.toFixed(2)}
                        </div>
                        <div class="d-flex">
                            <button class="btn btn-sm btn-outline-secondary" onclick="changeQuantity(${item.id}, -1)">-</button>
                            <span class="mx-2">${item.quantity}</span>
                            <button class="btn btn-sm btn-outline-secondary" onclick="changeQuantity(${item.id}, 1)">+</button>
                        </div>
                         <strong>$${itemTotal.toFixed(2)}</strong>
                        <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                `;
    });

    document.getElementById("totalPrice").innerText = `$${totalPrice.toFixed(2)}`;
    document.getElementById("cart-count").innerText = totalItems;
    if (totalItems === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    }
}

// Function to change product quantity
function changeQuantity(id, change) {
    if (cart[id].quantity + change > 0) {
        cart[id].quantity += change;
    } else {
        removeFromCart(id);
    }
    updateCart();
}

// Fetch and display meals when the page loads
fetchMeals();


