// JSON data for coffee products
const coffeeProducts = [{
        id: 1,
        name: "Caramel Macchiato",
        price: 150,
        image: "https://png.pngtree.com/png-vector/20240205/ourlarge/pngtree-the-strawberry-milkshake-png-image_11654489.png",
        category: "hot"
    },
    {
        id: 2,
        name: "Latte",
        price: 140,
        image: "https://png.pngtree.com/png-vector/20240205/ourlarge/pngtree-the-strawberry-milkshake-png-image_11654489.png",
        category: "hot"
    },
    {
        id: 3,
        name: "Cappuccino",
        price: 130,
        image: "https://png.pngtree.com/png-vector/20240205/ourlarge/pngtree-the-strawberry-milkshake-png-image_11654489.png",
        category: "hot"
    },
    {
        id: 4,
        name: "Iced Americano",
        price: 120,
        image: "https://png.pngtree.com/png-vector/20240205/ourlarge/pngtree-the-strawberry-milkshake-png-image_11654489.png",
        category: "cold"
    },
    {
        id: 5,
        name: "Espresso",
        price: 110,
        image: "https://png.pngtree.com/png-vector/20240205/ourlarge/pngtree-the-strawberry-milkshake-png-image_11654489.png",
        category: "hot"
    },
    {
        id: 6,
        name: "Iced Mocha",
        price: 160,
        image: "https://png.pngtree.com/png-vector/20240205/ourlarge/pngtree-the-strawberry-milkshake-png-image_11654489.png",
        category: "cold"
    },
    {
        id: 7,
        name: "Croissant",
        price: 80,
        image: "https://png.pngtree.com/png-vector/20240205/ourlarge/pngtree-the-strawberry-milkshake-png-image_11654489.png",
        category: "food"
    },
    {
        id: 8,
        name: "Cheesecake",
        price: 135,
        image: "https://png.pngtree.com/png-vector/20240205/ourlarge/pngtree-the-strawberry-milkshake-png-image_11654489.png",
        category: "dessert"
    }
];

// Object to store counter values
const counterValues = {};

// Object to store size selections
const sizeSelections = {};

// Function to create a product card
function createProductCard(product) {
    const count = counterValues[product.id] || 0;
    const isExpanded = count > 0;
    const size = sizeSelections[product.id] || 'S';
    return `
                <div class="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 relative pb-16">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
                    <div class="p-4">
                        <h3 class="font-semibold text-lg mb-2">${product.name}</h3>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-600 font-medium">${product.price} Taka</span>
                        </div>
                    </div>
                    <button id="size-btn-${product.id}" class="size-button text-white w-8 h-8 rounded-full" onclick="openSizePopup(${product.id})">
                        ${size}
                    </button>
                    <div id="cart-btn-${product.id}" class="cart-button text-white w-8 h-8 rounded-full ${isExpanded ? 'expanded' : ''}">
                        <button class="plus-icon w-full h-full flex items-center justify-center" onclick="addToCart(${product.id})">
                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </button>
                        <span class="counter">${count}</span>
                        <button class="minus-icon w-8 h-8 flex items-center justify-center" onclick="decrementCounter(${product.id})">
                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                            </svg>
                        </button>
                        <button class="plus-icon-small w-8 h-8 flex items-center justify-center" onclick="incrementCounter(${product.id})">
                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </button>
                    </div>
                </div>
            `;
}

// Function to render products based on category
function renderProducts(category = 'all') {
    const productGrid = document.getElementById('productGrid');
    const filteredProducts = category === 'all' ?
        coffeeProducts :
        coffeeProducts.filter(product => product.category === category);
    productGrid.innerHTML = filteredProducts.map(createProductCard).join('');

    // Update category title
    const categoryTitle = document.getElementById('categoryTitle');
    categoryTitle.textContent = category === 'all' ? 'All Items' :
        `${category.charAt(0).toUpperCase() + category.slice(1)} Menu`;
}

// Function to add to cart
function addToCart(productId) {
    incrementCounter(productId);
}

// Function to increment counter
function incrementCounter(productId) {
    counterValues[productId] = (counterValues[productId] || 0) + 1;
    updateCounter(productId);
}

// Function to decrement counters
function decrementCounter(productId) {
    if (counterValues[productId] > 1) {
        counterValues[productId]--;
    } else {
        delete counterValues[productId];
    }
    updateCounter(productId);
}

// Function to update counter display
function updateCounter(productId) {
    const button = document.getElementById(`cart-btn-${productId}`);
    const counter = button.querySelector('.counter');
    const count = counterValues[productId] || 0;

    counter.textContent = count;

    if (count > 0) {
        button.classList.add('expanded');
    } else {
        button.classList.remove('expanded');
    }
}

// Function to open size selection popup
function openSizePopup(productId) {
    const popup = document.getElementById('sizePopup');
    popup.classList.add('active');
    popup.dataset.productId = productId;
}

// Function to close size selection popup
function closeSizePopup() {
    const popup = document.getElementById('sizePopup');
    popup.classList.remove('active');
}

// Function to select size
function selectSize(size) {
    const popup = document.getElementById('sizePopup');
    const productId = parseInt(popup.dataset.productId);
    sizeSelections[productId] = size;
    updateSizeButton(productId);
    closeSizePopup();
}

// Function to update size button
function updateSizeButton(productId) {
    const sizeButton = document.getElementById(`size-btn-${productId}`);
    sizeButton.textContent = sizeSelections[productId];
}

// Function to handle category selection
function selectCategory(category) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    event.currentTarget.classList.add('active');
    renderProducts(category);
}

// Add event listeners to navbar items
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (event) => {
        const category = event.currentTarget.dataset.category;
        selectCategory(category);
    });
});

// Add event listeners to size options
document.querySelectorAll('.size-option').forEach(option => {
    option.addEventListener('click', (event) => {
        const size = event.currentTarget.dataset.size;
        selectSize(size);
    });
});

// Initial render
window.onload = () => renderProducts('all');