// IMAGE SLIDER LOGIC
const wrapper = document.querySelector('.slider-wrapper');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const slides = document.querySelectorAll('.slide');

let index = 0;

nextBtn.addEventListener('click', () => {
    index = (index < slides.length - 1) ? index + 1 : 0;
    wrapper.style.transform = `translateX(-${index * 100}%)`;
});

prevBtn.addEventListener('click', () => {
    index = (index > 0) ? index - 1 : slides.length - 1;
    wrapper.style.transform = `translateX(-${index * 100}%)`;
});

// SCROLL REVEAL LOGIC
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

const hiddenElements = document.querySelectorAll('.reveal');
hiddenElements.forEach((el) => observer.observe(el));


// CART FUNCTIONALITY
let cart = [];

// DOM Elements
const cartPanel = document.getElementById('cart-panel');
const openCartBtn = document.getElementById('open-cart');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const clearCartBtn = document.getElementById('clear-cart');

// Open/Close Cart
openCartBtn.addEventListener('click', () => cartPanel.classList.add('open'));
closeCartBtn.addEventListener('click', () => cartPanel.classList.remove('open'));

// Add to Cart listener
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault(); // Stops the page from jumping or reloading!
        
        const card = e.target.closest('.menu-card');
        const name = card.getAttribute('data-name');
        const price = parseFloat(card.getAttribute('data-price'));

        addItemToCart(name, price);
        
        // Optional: Automatically open the cart so you see it working!
        document.getElementById('cart-panel').classList.add('open');
    });
});

function addItemToCart(name, price) {
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCartDisplay();
}

function updateCartDisplay() {
    // Clear display
    cartItemsContainer.innerHTML = '';
    
    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">Your cart is empty!</p>';
    } else {
        cart.forEach(item => {
            total += item.price * item.quantity;
            count += item.quantity;

            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>$${item.price} x ${item.quantity}</p>
                </div>
                <button class="remove-item" onclick="removeItem('${item.name}')">✖</button>
            `;
            cartItemsContainer.appendChild(itemDiv);
        });
    }

    // Update totals and badge
    cartTotal.innerText = `$${total.toFixed(2)}`;
    cartCount.innerText = count;
}

// Remove single item
window.removeItem = function(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartDisplay();
}

// Clear entire cart
clearCartBtn.addEventListener('click', () => {
    cart = [];
    updateCartDisplay();
});
