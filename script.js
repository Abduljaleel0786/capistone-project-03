let cart = {};

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