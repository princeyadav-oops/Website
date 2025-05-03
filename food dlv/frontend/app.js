// Sample food menu (you could load this dynamically from a server or database)
const menu = [
    { id: 1, name: 'Pizza', price: 10 },
    { id: 2, name: 'Burger', price: 8 },
    { id: 3, name: 'Pasta', price: 12 },
    { id: 4, name: 'Sushi', price: 15 }
];

// Cart to store selected items
let cart = [];

// Function to display the menu dynamically on the menu page
function displayMenu() {
    const menuSection = document.querySelector('.menu');
    menu.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.innerHTML = `
            <h2>${item.name}</h2>
            <p>Price: $${item.price}</p>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        menuSection.appendChild(menuItem);
    });
}

// Function to add items to the cart
function addToCart(itemId) {
    const item = menu.find(menuItem => menuItem.id === itemId);
    const cartItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    
    displayCart();
}

// Function to display the cart
function displayCart() {
    const cartSection = document.querySelector('.cart');
    cartSection.innerHTML = ''; // Clear the current cart

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>Quantity: ${item.quantity}</p>
            <p>Total: $${item.price * item.quantity}</p>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartSection.appendChild(cartItem);
    });

    const total = calculateTotal();
    const totalElement = document.createElement('h3');
    totalElement.innerText = `Total Price: $${total}`;
    cartSection.appendChild(totalElement);

    if (cart.length > 0) {
        const orderButton = document.createElement('button');
        orderButton.innerText = 'Place Order';
        orderButton.onclick = submitOrder;
        cartSection.appendChild(orderButton);
    }
}

// Function to remove items from the cart
function removeFromCart(itemId) {
    const itemIndex = cart.findIndex(cartItem => cartItem.id === itemId);
    if (itemIndex > -1) {
        cart.splice(itemIndex, 1);
    }

    displayCart();
}

// Function to calculate the total price
function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Function to submit the order (this can be connected to a backend API)
function submitOrder() {
    const name = prompt('Enter your name');
    const address = prompt('Enter your delivery address');

    if (name && address) {
        const order = {
            customerName: name,
            deliveryAddress: address,
            items: cart,
            total: calculateTotal()
        };
        
        // Simulate sending the order to the server
        console.log('Order submitted:', order);
        alert('Thank you for your order!');

        // Clear the cart after placing the order
        cart = [];
        displayCart();
    } else {
        alert('Please enter valid information.');
    }
}

// Call displayMenu when the page loads
window.onload = displayMenu;
