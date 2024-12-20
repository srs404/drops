if (!window.cartStorage) {
    window.cartStorage = [];
}
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

function renderOptionsPage() {
    const mainContent = document.querySelector('main');
    mainContent.innerHTML = `
        <div class="container mx-auto px-4 max-w-lg">
            <!-- Header -->
            <div class="flex items-center space-x-2 mb-6">
                <button onclick="selectCategory('all')" class="text-gray-600 hover:text-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h2 class="text-2xl font-semibold text-gray-800">Options</h2>
            </div>

            <!-- Options List -->
            <div class="space-y-3">
                <!-- Menu Items -->
                <button onclick="handleOptionClick('ratings')" class="w-full bg-white shadow-md hover:shadow-lg rounded-xl p-4 flex items-center justify-between transition-shadow">
                    <span class="text-gray-800 font-medium">Ratings & Reviews</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                </button>

                <button onclick="handleOptionClick('contact')" class="w-full bg-white shadow-md hover:shadow-lg rounded-xl p-4 flex items-center justify-between transition-shadow">
                    <span class="text-gray-800 font-medium">Contact</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                </button>

                <button onclick="handleOptionClick('about')" class="w-full bg-white shadow-md hover:shadow-lg rounded-xl p-4 flex items-center justify-between transition-shadow">
                    <span class="text-gray-800 font-medium">About Us</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                </button>

                <button onclick="handleOptionClick('terms')" class="w-full bg-white shadow-md hover:shadow-lg rounded-xl p-4 flex items-center justify-between transition-shadow">
                    <span class="text-gray-800 font-medium">Terms & Conditions</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                </button>

                <button onclick="handleOptionClick('privacy')" class="w-full bg-white shadow-md hover:shadow-lg rounded-xl p-4 flex items-center justify-between transition-shadow">
                    <span class="text-gray-800 font-medium">Privacy Policy</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                </button>

                <button onclick="handleOptionClick('refund')" class="w-full bg-white shadow-md hover:shadow-lg rounded-xl p-4 flex items-center justify-between transition-shadow">
                    <span class="text-gray-800 font-medium">Refund Policy</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                </button>

                <!-- Logout Button -->
                <button onclick="handleLogout()" class="w-full mt-6 mb-24 py-4 rounded-xl text-white font-medium transition-all duration-300 relative overflow-hidden group"
                    style="background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(10px);">
                    <div class="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span class="relative z-10">Sign Out</span>
                </button>
            </div>
        </div>
    `;
}

// Handle option clicks
function handleOptionClick(option) {
    // You can implement specific actions for each option
    switch (option) {
        case 'ratings':
            // Handle ratings & reviews
            break;
        case 'contact':
            // Handle contact
            break;
        case 'about':
            // Handle about us
            break;
        case 'terms':
            // Handle terms & conditions
            break;
        case 'privacy':
            // Handle privacy policy
            break;
        case 'refund':
            // Handle refund policy
            break;
    }
}

// Handle logout
function handleLogout() {
    // Show confirmation dialog
    const shouldLogout = confirm('Are you sure you want to sign out?');

    if (shouldLogout) {
        // Create loading overlay
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        overlay.innerHTML = `
            <div class="bg-white rounded-lg p-6 text-center">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                <p class="text-gray-800">Signing out...</p>
            </div>
        `;
        document.body.appendChild(overlay);

        // Simulate logout process
        setTimeout(() => {
            // Clear local storage
            localStorage.clear();

            // Redirect to login page
            window.location.href = 'index.php?action=logout';
        }, 1500);
    }
}

// Function to render products based on category
function renderProducts(category = 'all') {
    const productGrid = document.getElementById('productGrid');
    const filteredProducts = category === 'all' ?
        coffeeProducts :
        coffeeProducts.filter(product => product.category === category);

    productGrid.innerHTML = filteredProducts.map(createProductCard).join('');

    // Update counters and size selections for existing items
    Object.keys(counterValues).forEach(productId => {
        updateCounter(parseInt(productId));
    });
    Object.keys(sizeSelections).forEach(productId => {
        updateSizeButton(parseInt(productId));
    });

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
    checkAndShowFloatingButton();
}

// Function to decrement counters
function decrementCounter(productId) {
    if (counterValues[productId] > 1) {
        counterValues[productId]--;
    } else {
        delete counterValues[productId];
    }
    updateCounter(productId);
    checkAndShowFloatingButton();
}

function checkAndShowFloatingButton() {
    const hasItems = Object.keys(counterValues).length > 0;
    if (hasItems) {
        showFloatingCartButton();
    } else {
        hideFloatingCartButton();
    }
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
function openSizePopup(productId, isCart = false) {
    const popup = document.getElementById('sizePopup');
    popup.dataset.productId = productId;
    popup.dataset.isCart = isCart; // Add this to track context
    popup.classList.add('active');
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
    const isCart = popup.dataset.isCart === 'true';

    if (isCart) {
        // Update size in cart
        const cartItem = window.cartStorage.find(item => item.productId === productId);
        if (cartItem) {
            cartItem.size = size;
            renderCartPage();
        }
    } else {
        // Update size in product grid
        sizeSelections[productId] = size;
        updateSizeButton(productId);
    }

    closeSizePopup();
}

// Function to update size button
function updateSizeButton(productId) {
    const sizeButton = document.getElementById(`size-btn-${productId}`);
    sizeButton.textContent = sizeSelections[productId];
}

// Handle option clicks
function handleOptionClick(option) {
    const mainContent = document.querySelector('main');

    switch (option) {
        case 'ratings':
            mainContent.innerHTML = `
                <div class="container mx-auto px-4 max-w-lg">
                    <!-- Back Button Header -->
                    <div class="flex items-center space-x-2 mb-6">
                        <button onclick="renderOptionsPage()" class="text-gray-600 hover:text-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h2 class="text-2xl font-semibold text-gray-800">Ratings & Reviews</h2>
                    </div>
                    <!-- Content -->
                    <div class="bg-white rounded-xl shadow-md p-4 mb-24">
                        <p>Ratings and reviews content coming soon...</p>
                    </div>
                </div>
            `;
            break;
        case 'contact':
            mainContent.innerHTML = `
                <div class="container mx-auto px-4 max-w-lg">
                    <!-- Back Button Header -->
                    <div class="flex items-center space-x-2 mb-6">
                        <button onclick="renderOptionsPage()" class="text-gray-600 hover:text-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h2 class="text-2xl font-semibold text-gray-800">Contact Us</h2>
                    </div>
                    <!-- Content -->
                    <div class="bg-white rounded-xl shadow-md p-4 mb-24">
                        <div class="space-y-4">
                            <p class="font-medium">Get in touch with us:</p>
                            <div class="flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                <span>+880 1677552128</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                <span>contact@drops.com</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                                </svg>
                                <span>Dhaka, Bangladesh</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'about':
            mainContent.innerHTML = `
                <div class="container mx-auto px-4 max-w-lg">
                    <!-- Back Button Header -->
                    <div class="flex items-center space-x-2 mb-6">
                        <button onclick="renderOptionsPage()" class="text-gray-600 hover:text-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h2 class="text-2xl font-semibold text-gray-800">About Us</h2>
                    </div>
                    <!-- Content -->
                    <div class="bg-white rounded-xl shadow-md p-4 mb-24">
                        <div class="space-y-4">
                            <p>Welcome to Drops - where every sip tells a story. Founded in 2024, we've been crafting exceptional coffee experiences for our valued customers.</p>
                            <p>Our mission is to deliver not just coffee, but moments of joy and connection right to your doorstep.</p>
                            <p>With carefully sourced beans and expert baristas, we ensure every cup meets our high standards of quality and taste.</p>
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'terms':
            mainContent.innerHTML = `
                <div class="container mx-auto px-4 max-w-lg">
                    <!-- Back Button Header -->
                    <div class="flex items-center space-x-2 mb-6">
                        <button onclick="renderOptionsPage()" class="text-gray-600 hover:text-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h2 class="text-2xl font-semibold text-gray-800">Terms & Conditions</h2>
                    </div>
                    <!-- Content -->
                    <div class="bg-white rounded-xl shadow-md p-4 mb-24">
                        <div class="space-y-4">
                            <h3 class="font-medium">1. Orders</h3>
                            <p>All orders are subject to availability and confirmation of the order price.</p>
                            
                            <h3 class="font-medium">2. Delivery</h3>
                            <p>We aim to deliver within the specified time frame. Delays may occur due to unforeseen circumstances.</p>
                            
                            <h3 class="font-medium">3. Payment</h3>
                            <p>Payments are processed securely through our authorized payment partners.</p>
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'privacy':
            mainContent.innerHTML = `
                <div class="container mx-auto px-4 max-w-lg">
                    <!-- Back Button Header -->
                    <div class="flex items-center space-x-2 mb-6">
                        <button onclick="renderOptionsPage()" class="text-gray-600 hover:text-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h2 class="text-2xl font-semibold text-gray-800">Privacy Policy</h2>
                    </div>
                    <!-- Content -->
                    <div class="bg-white rounded-xl shadow-md p-4 mb-24">
                        <div class="space-y-4">
                            <h3 class="font-medium">Data Collection</h3>
                            <p>We collect only necessary information to process your orders and improve our services.</p>
                            
                            <h3 class="font-medium">Data Usage</h3>
                            <p>Your data is used solely for order processing and service improvement purposes.</p>
                            
                            <h3 class="font-medium">Data Protection</h3>
                            <p>We implement robust security measures to protect your personal information.</p>
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'refund':
            mainContent.innerHTML = `
                <div class="container mx-auto px-4 max-w-lg">
                    <!-- Back Button Header -->
                    <div class="flex items-center space-x-2 mb-6">
                        <button onclick="renderOptionsPage()" class="text-gray-600 hover:text-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h2 class="text-2xl font-semibold text-gray-800">Refund Policy</h2>
                    </div>
                    <!-- Content -->
                    <div class="bg-white rounded-xl shadow-md p-4 mb-24">
                        <div class="space-y-4">
                            <h3 class="font-medium">Order Cancellation</h3>
                            <p>Orders can be cancelled and refunded before delivery is initiated.</p>
                            
                            <h3 class="font-medium">Quality Issues</h3>
                            <p>Full refunds are provided for quality-related issues if reported within 30 minutes of delivery.</p>
                            
                            <h3 class="font-medium">Refund Process</h3>
                            <p>Refunds are processed within 5-7 business days after approval.</p>
                        </div>
                    </div>
                </div>
            `;
            break;
    }
}

// Function to handle category selection
function selectCategory(category) {
    // Remove active class from all nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });

    // Add active class to selected nav item
    const selectedItem = document.querySelector(`[data-category="${category}"]`);
    if (selectedItem) {
        selectedItem.classList.add('active');
    }

    // Get the main content container
    const mainContent = document.querySelector('main');
    mainContent.style.opacity = '0';
    mainContent.style.transform = 'translateY(10px)';

    // Wait for fade out, then update content
    setTimeout(() => {
        mainContent.className = 'container mx-auto px-4 py-8 page-transition';

        // Handle page content based on category
        switch (category) {
            case 'all':
                mainContent.innerHTML = `
                    <h2 id="categoryTitle" class="text-2xl font-semibold mb-6 text-gray-800">All Items</h2>
                    <div id="productGrid" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"></div>
                `;
                renderProducts('all');
                break;
            case 'cart':
                renderCartPage();
                break;
            case 'clipboard':
                renderClipboardPage();
                break;
            case 'user':
                renderUserPage();
                break;
            case 'options':
                renderOptionsPage(); // This will now be properly called
                break;
            default:
                renderProducts(category);
        }

        // Fade in the new content
        mainContent.style.opacity = '1';
        mainContent.style.transform = 'translateY(0)';
    }, 300);
}

function updateProgressDisplay(completion) {
    const progressBar = document.querySelector('.progress-bar-fill');
    const progressText = document.querySelector('.profile-completion-text');

    if (progressBar && progressText) {
        progressBar.style.width = `${completion}%`;
        progressText.textContent = `Profile ${completion}% completed`;
    }
}

// Calculate order total
function calculateOrderTotal() {
    const subtotal = window.cartStorage.reduce((total, item) => {
        const product = coffeeProducts.find(p => p.id === item.productId);
        return total + (product.price * item.count);
    }, 0);

    const vat = Math.round(subtotal * 0.075);
    const discount = 45;
    const deliveryCharge = 60;

    return {
        subtotal,
        vat,
        discount,
        deliveryCharge,
        total: subtotal + vat - discount + deliveryCharge
    };
}


// Update progress bar
function updateProgressBar(completion) {
    const progressBar = document.querySelector('.bg-black');
    const progressText = document.querySelector('.text-gray-500');
    if (progressBar && progressText) {
        progressBar.style.width = `${completion}%`;
        progressText.textContent = `Profile ${completion}% completed`;
    }
}

// Function to apply coupon
function applyCoupon(couponCode) {
    // This could be expanded to handle different coupon codes
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg';
    notification.textContent = 'Invalid coupon code';
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add hover effect to nav items
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        if (!item.classList.contains('active')) {
            item.style.transform = 'translateY(-2px)';
        }
    });

    item.addEventListener('mouseleave', () => {
        if (!item.classList.contains('active')) {
            item.style.transform = 'translateY(0)';
        }
    });
});

// Add this function to handle smooth scrolling to top when switching pages
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add event listeners to navbar items
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function (event) {
        event.preventDefault();
        const category = this.dataset.category;
        selectCategory(category);
        scrollToTop();
    });
});

// Add event listeners to size options
document.querySelectorAll('.size-option').forEach(option => {
    option.addEventListener('click', (event) => {
        const size = event.currentTarget.dataset.size;
        selectSize(size);
    });
});

// Function to render clipboard page
// Function to render clipboard page
function renderClipboardPage() {
    const orders = initializeOrders();
    const mainContent = document.querySelector('main');

    mainContent.innerHTML = `
<div class="container mx-auto px-4 max-w-lg">
    ${orders.current ? `
        <!-- Current Order Section -->
        <h2 class="text-xl font-semibold mb-4">Current Order</h2>
        <div class="bg-white rounded-lg shadow-md p-4 mb-6">
            <div class="space-y-3">
                <p class="font-medium">Order number: ${orders.current.orderNumber}</p>
                <p class="text-gray-600">${orders.current.status}</p>
                
                <!-- Status Steps -->
                <div class="space-y-2 my-4">
                    <div class="flex items-center space-x-3">
                        <div class="w-4 h-4 ${orders.current.status === 'Processing' ? 'bg-black' : 'bg-gray-300'} rounded-full"></div>
                        <span class="${orders.current.status === 'Processing' ? 'text-black' : 'text-gray-600'}">Processing</span>
                    </div>
                    <div class="flex items-center space-x-3">
                        <div class="w-4 h-4 ${orders.current.status === 'On the way' ? 'bg-black' : 'border-2 border-gray-300'} rounded-full"></div>
                        <span class="${orders.current.status === 'On the way' ? 'text-black' : 'text-gray-600'}">On the way</span>
                    </div>
                    <div class="flex items-center space-x-3">
                        <div class="w-4 h-4 ${orders.current.status === 'Delivered' ? 'bg-black' : 'border-2 border-gray-300'} rounded-full"></div>
                        <span class="${orders.current.status === 'Delivered' ? 'text-black' : 'text-gray-600'}">Delivered</span>
                    </div>
                </div>

                <p class="font-medium">Total due: ${orders.current.totals.total} Taka</p>
                <p class="text-gray-600">Phone: ${orders.current.phone}</p>
                
                <!-- Action Buttons -->
                <div class="flex space-x-4 mt-4">
                    <button onclick="cancelOrder()" class="flex-1 py-2 px-4 border border-black rounded-full hover:bg-gray-100 transition-colors">
                        Cancel
                    </button>
                    <button class="flex-1 py-2 px-4 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                        Invoice
                    </button>
                </div>
            </div>
        </div>
    ` : ''}

    <!-- Previous Orders Section -->
    <h2 class="text-xl font-semibold mb-4">Previous Orders</h2>
    <div class="space-y-4">
        ${orders.previous.map(order => `
            <div class="bg-white rounded-lg shadow-md p-4">
                <div class="space-y-2">
                    <p class="font-medium">Order number: ${order.orderNumber}</p>
                    <p class="text-gray-600">Status: ${order.status}</p>
                    <p class="font-medium">Total bill: ${order.totals.total} Taka</p>
                    
                    <!-- Action Buttons -->
                    <div class="flex space-x-4 mt-4">
                        <button onclick="orderAgain(${order.orderNumber})" class="flex-1 py-2 px-4 border border-black rounded-full hover:bg-gray-100 transition-colors">
                            Order Again
                        </button>
                        <button class="flex-1 py-2 px-4 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                            Receipt
                        </button>
                    </div>
                </div>
            </div>
        `).join('')}
    </div>
</div>
`;
}

// Function to calculate order total
function calculateOrderTotal() {
    const subtotal = window.cartStorage.reduce((total, item) => {
        const product = coffeeProducts.find(p => p.id === item.productId);
        return total + (product.price * item.count);
    }, 0);

    const vat = Math.round(subtotal * 0.075);
    const discount = 45;
    const deliveryCharge = 60;

    return {
        subtotal,
        vat,
        discount,
        deliveryCharge,
        total: subtotal + vat - discount + deliveryCharge
    };
}

// Optional: Function to order again
function orderAgain(orderNumber) {
    const orders = initializeOrders();
    const order = orders.previous.find(o => o.orderNumber === orderNumber);

    if (order) {
        // Reset cart
        counterValues = {};
        sizeSelections = {};

        // Add items back to cart
        order.items.forEach(item => {
            counterValues[item.product.id] = item.quantity;
            sizeSelections[item.product.id] = item.size;
        });

        // Navigate to cart
        selectCategory('cart');
    }
}


// Add click handlers for the buttons
document.addEventListener('click', function (e) {
    if (e.target.matches('.order-again-btn')) {
        // Handle Order Again click
        console.log('Order Again clicked');
    } else if (e.target.matches('.receipt-btn')) {
        // Handle Receipt click
        console.log('Receipt clicked');
    } else if (e.target.matches('.cancel-btn')) {
        // Handle Cancel click
        console.log('Cancel clicked');
    } else if (e.target.matches('.invoice-btn')) {
        // Handle Invoice click
        console.log('Invoice clicked');
    }
});


// Function to render user profile page

// Initialize user profile in local storage if it doesn't exist
function initializeUserProfile() {
    if (!localStorage.getItem('userProfile')) {
        const defaultProfile = {
            name: 'Saad Rahman',
            mobile: '01677552128',
            email: '',
            dateOfBirth: '',
            gender: '',
            addresses: {
                home: 'Apartment A/9, Teachers\' quarter, Dhaka commerce college, Mirpur, Dhaka 1216.',
                work: '',
                other: ''
            }
        };
        localStorage.setItem('userProfile', JSON.stringify(defaultProfile));
    }
    return JSON.parse(localStorage.getItem('userProfile'));
}

// Function to calculate profile completion percentage
function calculateProfileCompletion(userProfile) {
    const fields = {
        mobile: userProfile.mobile,
        email: userProfile.email,
        dateOfBirth: userProfile.dateOfBirth,
        gender: userProfile.gender,
        homeAddress: userProfile.addresses.home,
        workAddress: userProfile.addresses.work,
        otherAddress: userProfile.addresses.other
    };

    let filledFields = 0;
    const totalFields = Object.keys(fields).length;

    for (const [key, value] of Object.entries(fields)) {
        if (value && value.trim() !== '') {
            filledFields++;
        }
    }

    return Math.round((filledFields / totalFields) * 100);
}

// Function to render user profile page
function renderUserPage(highlightAddress = '') {
    const userProfile = initializeUserProfile();
    const completion = calculateProfileCompletion(userProfile);
    const mainContent = document.querySelector('main');

    mainContent.innerHTML = `
<div class="container mx-auto px-4 max-w-lg">
    <!-- Profile Section -->
    <div class="flex flex-col items-center mb-8">
        <!-- Profile Picture with Edit Button -->
        <div class="relative w-32 h-32 group">
            <div class="w-32 h-32 rounded-full overflow-hidden mb-4">
                <img src="${userProfile.image || 'https://scontent-ord5-1.xx.fbcdn.net/v/t39.30808-6/369683372_10223279696361413_5507658032399956143_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=Ds7qR0HwIVsQ7kNvgGmUyqg&_nc_ht=scontent-ord5-1.xx&_nc_gid=A5dk0SoWLRww1_dqRFc2NE8&oh=00_AYDyVSB182nxcXnBfad1qjUKIRyP-NwV85nIn0QGbXl5cw&oe=6722E48F'}" 
                     alt="Profile Picture" 
                     class="w-full h-full object-cover">
            </div>
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 rounded-full cursor-pointer"
                 onclick="openImageUpload()">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </div>
            <input type="file" 
                   id="profileImageInput" 
                   accept="image/*" 
                   class="hidden" 
                   onchange="handleImageUpload(event)">
        </div>

        <!-- Editable Name -->
        <div class="flex items-center space-x-2 mb-2">
            <input type="text" 
                   value="${userProfile.name}"
                   class="text-xl font-semibold text-center bg-transparent border-b border-transparent hover:border-gray-300 focus:border-black focus:outline-none transition-colors"
                   onchange="updateProfileName(event)">
        </div>
        
        <!-- Progress Bar -->
<div class="w-full max-w-xs mb-1">
<div class="w-full h-1.5 bg-gray-200 rounded-full">
<div class="progress-bar-fill h-full bg-black rounded-full transition-all duration-300" style="width: ${completion}%"></div>
</div>
</div>
<p class="text-gray-500 text-sm profile-completion-text">Profile ${completion}% completed</p>
    </div>

    <!-- Profile Form -->
    <form id="profileForm" class="space-y-6">
        <div class="space-y-2">
            <label class="block text-gray-700">Mobile Number</label>
            <input type="tel" name="mobile" value="${userProfile.mobile}" 
                class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-black"
                placeholder="Enter mobile number">
        </div>

        <div class="space-y-2">
            <label class="block text-gray-700">Email</label>
            <input type="email" name="email" value="${userProfile.email}"
                class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-black"
                placeholder="Enter email">
        </div>

        <div class="space-y-2">
            <label class="block text-gray-700">Date of Birth</label>
            <input type="date" name="dateOfBirth" value="${userProfile.dateOfBirth}"
                class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-black">
        </div>

        <div class="space-y-2">
            <label class="block text-gray-700">Gender</label>
            <div class="flex space-x-4">
                <label class="flex items-center">
                    <input type="radio" name="gender" value="male" ${userProfile.gender === 'male' ? 'checked' : ''} class="mr-2">
                    <span>Male</span>
                </label>
                <label class="flex items-center">
                    <input type="radio" name="gender" value="female" ${userProfile.gender === 'female' ? 'checked' : ''} class="mr-2">
                    <span>Female</span>
                </label>
                <label class="flex items-center">
                    <input type="radio" name="gender" value="other" ${userProfile.gender === 'other' ? 'checked' : ''} class="mr-2">
                    <span>Other</span>
                </label>
            </div>
        </div>

        <div class="space-y-2 ${highlightAddress === 'home' ? 'bg-yellow-50 p-4 rounded-lg' : ''}">
            <label class="block text-gray-700">Address (Home)</label>
            <input type="text" name="homeAddress" value="${userProfile.addresses.home}"
                class="w-full px-4 py-2 rounded-lg border ${highlightAddress === 'home' ? 'border-yellow-400' : 'border-gray-300'} focus:outline-none focus:border-black"
                placeholder="Enter home address">
        </div>

        <div class="space-y-2 ${highlightAddress === 'work' ? 'bg-yellow-50 p-4 rounded-lg' : ''}">
            <label class="block text-gray-700">Address (Work)</label>
            <input type="text" name="workAddress" value="${userProfile.addresses.work}"
                class="w-full px-4 py-2 rounded-lg border ${highlightAddress === 'work' ? 'border-yellow-400' : 'border-gray-300'} focus:outline-none focus:border-black"
                placeholder="Enter work address">
        </div>

        <div class="space-y-2 ${highlightAddress === 'other' ? 'bg-yellow-50 p-4 rounded-lg' : ''}">
            <label class="block text-gray-700">Address (Other)</label>
            <input type="text" name="otherAddress" value="${userProfile.addresses.other}"
                class="w-full px-4 py-2 rounded-lg border ${highlightAddress === 'other' ? 'border-yellow-400' : 'border-gray-300'} focus:outline-none focus:border-black"
                placeholder="Enter other address">
        </div>

        <button type="submit" class="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition-colors">
            Save Changes
        </button>

        <!-- Add some padding at the bottom for the floating navbar -->
        <div class="h-24"></div>
    </form>
</div>
`;

    // Add form submission handler
    const form = document.getElementById('profileForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const userProfile = initializeUserProfile();

        // Update the profile with form data
        userProfile.mobile = formData.get('mobile');
        userProfile.email = formData.get('email');
        userProfile.dateOfBirth = formData.get('dateOfBirth');
        userProfile.gender = formData.get('gender');
        userProfile.addresses = {
            home: formData.get('homeAddress'),
            work: formData.get('workAddress'),
            other: formData.get('otherAddress')
        };

        // Save to localStorage
        localStorage.setItem('userProfile', JSON.stringify(userProfile));

        // Update progress display
        const newCompletion = calculateProfileCompletion(userProfile);
        updateProgressDisplay(newCompletion);

        // Show success message
        const notification = document.createElement('div');
        notification.className =
            'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg';
        notification.textContent = 'Profile updated successfully!';
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    });

    // Add input event listeners for real-time progress updates
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const formData = new FormData(form);
            const tempProfile = {
                ...userProfile,
                mobile: formData.get('mobile'),
                email: formData.get('email'),
                dateOfBirth: formData.get('dateOfBirth'),
                gender: formData.get('gender'),
                addresses: {
                    home: formData.get('homeAddress'),
                    work: formData.get('workAddress'),
                    other: formData.get('otherAddress')
                }
            };

            const newCompletion = calculateProfileCompletion(tempProfile);
            updateProgressDisplay(newCompletion);
        });
    });
}

// Initialize orders in localStorage if they don't exist
function initializeOrders() {
    if (!localStorage.getItem('orders')) {
        localStorage.setItem('orders', JSON.stringify({
            current: null,
            previous: []
        }));
    }
    return JSON.parse(localStorage.getItem('orders'));
}

// Function to generate order number
function generateOrderNumber() {
    return Math.floor(100000000 + Math.random() * 900000000);
}

// Function to open file input when clicking the camera icon
function openImageUpload() {
    document.getElementById('profileImageInput').click();
}

// Function to handle image upload
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const userProfile = initializeUserProfile();
            userProfile.image = e.target.result;
            localStorage.setItem('userProfile', JSON.stringify(userProfile));

            // Refresh the profile page
            renderUserPage();

            // Show success notification
            const notification = document.createElement('div');
            notification.className =
                'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg';
            notification.textContent = 'Profile picture updated successfully!';
            document.body.appendChild(notification);
            setTimeout(() => notification.remove(), 3000);
        };
        reader.readAsDataURL(file);
    }
}

// Function to update profile name
function updateProfileName(event) {
    const newName = event.target.value;
    const userProfile = initializeUserProfile();
    userProfile.name = newName;
    localStorage.setItem('userProfile', JSON.stringify(userProfile));

    // Show success notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg';
    notification.textContent = 'Name updated successfully!';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Function to focus the name input
function focusNameInput() {
    const nameInput = document.querySelector('input[type="text"]');
    nameInput.focus();
}

// Update the initializeUserProfile function to include image
function initializeUserProfile() {
    if (!localStorage.getItem('userProfile')) {
        const defaultProfile = {
            name: 'Saad Rahman',
            image: 'https://scontent-ord5-1.xx.fbcdn.net/v/t39.30808-6/369683372_10223279696361413_5507658032399956143_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=Ds7qR0HwIVsQ7kNvgGmUyqg&_nc_ht=scontent-ord5-1.xx&_nc_gid=A5dk0SoWLRww1_dqRFc2NE8&oh=00_AYDyVSB182nxcXnBfad1qjUKIRyP-NwV85nIn0QGbXl5cw&oe=6722E48F',
            mobile: '01677552128',
            email: '',
            dateOfBirth: '',
            gender: '',
            addresses: {
                home: 'Apartment A/9, Teachers\' quarter, Dhaka commerce college, Mirpur, Dhaka 1216.',
                work: '',
                other: ''
            }
        };
        localStorage.setItem('userProfile', JSON.stringify(defaultProfile));
    }
    return JSON.parse(localStorage.getItem('userProfile'));
}

// Function to cancel order
function cancelOrder() {
    const orders = initializeOrders();
    if (orders.current) {
        // Move current order to previous orders with cancelled status
        orders.current.status = 'Cancelled';
        orders.previous.unshift(orders.current);
        orders.current = null;

        // Save to localStorage
        localStorage.setItem('orders', JSON.stringify(orders));

        // Show cancellation message
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg';
        notification.textContent = 'Order cancelled successfully';
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
            // Refresh clipboard page
            renderClipboardPage();
        }, 2000);
    }
}

function renderCartPage() {
    const mainContent = document.querySelector('main');
    mainContent.innerHTML = `
<div class="container mx-auto px-4 max-w-lg">
    <!-- Cart Items -->
    <div class="space-y-4 mb-6">
        ${window.cartStorage.map(item => {
            const product = coffeeProducts.find(p => p.id === item.productId);
            if (!product) return '';
            
            return `
<div class="bg-white rounded-lg cart-item">
<!-- Remove button (X) -->
<button class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg z-10"
        onclick="removeFromCart(${item.productId}, '${item.size}')">
    ×
</button>

<img src="${product.image}" 
     alt="${product.name}" 
     class="cart-item-image rounded-l-lg">
<div class="cart-item-content">
    <div>
        <div class="flex justify-between items-start mb-2">
<span class="text-base">${product.name}</span>
<span class="text-base font-bold whitespace-nowrap ml-2">${product.price * item.count} <br>Taka</span>
</div>
        <span class="text-gray-600 block mb-3">350 ml</span>
    </div>
    <div class="flex justify-between items-center">
<button onclick="openSizePopup(${item.productId}, true)" 
class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-sm hover:bg-gray-300 transition-colors">
${item.size || 'L'}
</button>
        <div class="flex items-center space-x-3 bg-gray-100 rounded-full px-2">
            <button class="text-black p-1" onclick="updateCartQuantity(${item.productId}, ${item.count - 1}, '${item.size}')">-</button>
            <span class="w-8 text-center">${item.count}</span>
            <button class="text-black p-1" onclick="updateCartQuantity(${item.productId}, ${item.count + 1}, '${item.size}')">+</button>
        </div>
    </div>
</div>
</div>
`;
        }).join('')}
    </div>

    <!-- Address Section -->
    <div class="mb-6">
        <div class="flex items-center justify-between mb-2">
            <h2 class="font-semibold">Address:</h2>
            <button onclick="editAddress()">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
            </button>
        </div>
        <p class="text-gray-600">${initializeUserProfile().addresses.home || 'No address set'}</p>
    </div>

    <!-- Coupon Section -->
    <div class="mb-6">
        <p class="mb-2">Do you have a coupon?</p>
        <div class="flex flex-col sm:flex-row gap-2">
            <input type="text" placeholder="Coupon" 
                class="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-black">
            <button class="px-6 py-2 border border-gray-300 rounded-full hover:bg-gray-50 whitespace-nowrap">
                Apply
            </button>
        </div>
    </div>

    <!-- Order Summary -->
    <div class="space-y-2 mb-6">
        ${calculateOrderSummaryHTML()}
    </div>

    <!-- Place Order Button -->
    <button onclick="placeOrder()" class="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition-colors mb-24">
        Place Order
    </button>
</div>
`;
}


function initializeSizeOptions() {
    document.querySelectorAll('.size-option').forEach(option => {
        option.addEventListener('click', (event) => {
            const size = event.currentTarget.dataset.size;
            selectSize(size);
        });
    });
}

function removeFromCart(productId, size) {
    window.cartStorage = window.cartStorage.filter(
        item => !(item.productId === productId && item.size === size)
    );
    renderCartPage();
}

function updateCartQuantity(productId, newCount, size) {
    if (newCount <= 0) {
        removeFromCart(productId, size);
        return;
    }

    const item = window.cartStorage.find(
        item => item.productId === productId && item.size === size
    );

    if (item) {
        item.count = newCount;
        renderCartPage();
    }
}

// Helper function to check if cart is empty
function isCartEmpty() {
    return !window.cartStorage || window.cartStorage.length === 0;
}



function attachCartEventListeners() {
    // Remove button handlers
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.productId);
            const size = e.target.dataset.size;

            window.cartStorage = window.cartStorage.filter(item =>
                !(item.productId === productId && item.size === size)
            );

            renderCartPage();
        });
    });

    // Coupon button handler
    const applyButton = document.querySelector('.apply-coupon');
    if (applyButton) {
        applyButton.addEventListener('click', () => {
            const couponInput = document.querySelector('input[placeholder="Coupon"]');
            applyCoupon(couponInput.value);
        });
    }

    // Place order button handler
    const placeOrderButton = document.querySelector('.place-order-btn');
    if (placeOrderButton) {
        placeOrderButton.addEventListener('click', placeOrder);
    }
}


// Add this new function for calculating order summary
function calculateOrderSummaryHTML() {
    const totals = calculateOrderTotal();
    return `
<div class="flex justify-between">
    <span class="text-gray-600">Sub total</span>
    <span class="font-medium">${totals.subtotal} Taka</span>
</div>
<div class="flex justify-between">
    <span class="text-gray-600">VAT (7.5%)</span>
    <span class="font-medium">${totals.vat} Taka</span>
</div>
<div class="flex justify-between">
    <span class="text-gray-600">Discount</span>
    <span class="font-medium">${totals.discount} Taka</span>
</div>
<div class="flex justify-between">
    <span class="text-gray-600">Delivery Charge</span>
    <span class="font-medium">${totals.deliveryCharge} Taka</span>
</div>
<div class="flex justify-between pt-2 border-t">
    <span class="font-semibold">Total</span>
    <span class="font-semibold">${totals.total} Taka</span>
</div>
`;
}

// Function to place order
function placeOrder() {
    if (isCartEmpty()) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg';
        notification.textContent = 'Your cart is empty!';
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
        return;
    }

    const userProfile = initializeUserProfile();
    if (!userProfile.addresses.home) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg';
        notification.textContent = 'Please add a delivery address before placing order';
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
        return;
    }

    // Create order
    const totals = calculateOrderTotal();
    const orderNumber = generateOrderNumber();
    const orderDate = new Date().toISOString();
    const newOrder = {
        orderNumber: orderNumber,
        date: orderDate,
        status: 'Processing',
        items: window.cartStorage.map(item => ({
            product: coffeeProducts.find(p => p.id === item.productId),
            quantity: item.count,
            size: item.size
        })),
        address: userProfile.addresses.home,
        phone: userProfile.mobile,
        totals: totals
    };

    // Save order
    const orders = initializeOrders();
    if (orders.current) {
        orders.previous.unshift(orders.current);
    }
    orders.current = newOrder;
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart
    window.cartStorage = [];

    // Create and animate success overlay
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    overlay.innerHTML = `
<div class="bg-white rounded-lg p-6 transform scale-0 transition-transform duration-300 ease-out">
    <svg class="w-16 h-16 mx-auto text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
    </svg>
    <p class="text-xl font-semibold text-center">Order Placed Successfully!</p>
    <p class="text-gray-600 text-center mt-2">Order #${orderNumber}</p>
</div>
`;
    document.body.appendChild(overlay);

    // Animate the success message
    setTimeout(() => {
        const messageBox = overlay.querySelector('div');
        messageBox.classList.remove('scale-0');
        messageBox.classList.add('scale-100');
    }, 100);

    // After animation, redirect to clipboard page
    setTimeout(() => {
        overlay.classList.add('opacity-0');
        setTimeout(() => {
            overlay.remove();
            selectCategory('clipboard');

            // Highlight the new order
            const orderElement = document.querySelector('.current-order');
            if (orderElement) {
                orderElement.classList.add('animate-pulse');
                setTimeout(() => {
                    orderElement.classList.remove('animate-pulse');
                }, 2000);
            }
        }, 300);
    }, 2000);
}



// Add these new functions
function createFloatingCartButton() {
    const existingButton = document.getElementById('floatingCartButton');
    if (existingButton) {
        existingButton.remove();
    }

    const button = document.createElement('div');
    button.innerHTML = `
<button id="floatingCartButton" class="floating-cart-button">
    Add to Cart
</button>
`;
    document.body.appendChild(button.firstElementChild);

    document.getElementById('floatingCartButton').addEventListener('click', handleAddToCart);
}

function showFloatingCartButton() {
    const button = document.getElementById('floatingCartButton');
    if (button) {
        button.classList.add('visible');
    } else {
        createFloatingCartButton();
        setTimeout(() => {
            document.getElementById('floatingCartButton').classList.add('visible');
        }, 100);
    }
}

function hideFloatingCartButton() {
    const button = document.getElementById('floatingCartButton');
    if (button) {
        button.classList.remove('visible');
    }
}

function handleAddToCart() {
    const currentSelections = Object.entries(counterValues);

    // Check if there are items to add
    if (currentSelections.length === 0) {
        return;
    }

    // Process each selected item
    currentSelections.forEach(([productId, count]) => {
        const numericId = parseInt(productId);
        const size = sizeSelections[productId] || 'L';
        const product = coffeeProducts.find(p => p.id === numericId);

        if (product) {
            // Check if item with same ID and size exists
            const existingItem = window.cartStorage.find(
                item => item.productId === numericId && item.size === size
            );

            if (existingItem) {
                // Update existing item quantity
                existingItem.count += count;
            } else {
                // Add new item
                window.cartStorage.push({
                    productId: numericId,
                    count: count,
                    size: size,
                    price: product.price
                });
            }
        }
    });

    // Clear current selections
    Object.keys(counterValues).forEach(key => delete counterValues[key]);
    Object.keys(sizeSelections).forEach(key => delete sizeSelections[key]);

    // Show success notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg';
    notification.textContent = 'Items added to cart!';
    document.body.appendChild(notification);

    // Update UI
    renderProducts('all');
    hideFloatingCartButton();

    // Log cart contents (for debugging)
    console.log('Cart contents:', window.cartStorage);

    setTimeout(() => notification.remove(), 2000);
}


// Function to generate order number
function generateOrderNumber() {
    return Math.floor(100000000 + Math.random() * 900000000);
}


// Function to handle address editing
function editAddress() {
    selectCategory('user');
    setTimeout(() => renderUserPage('home'), 300);
}

// Function to remove item from cart
function removeItem(productId) {
    delete counterValues[productId];
    delete sizeSelections[productId];
    renderCartPage();
}


// Add these functions to your existing JavaScript
function editAddress() {
    const modal = document.getElementById('addressModal');
    const addressInput = document.getElementById('addressInput');
    const userProfile = initializeUserProfile();

    // Set current address in textarea
    addressInput.value = userProfile.addresses.home || '';

    // Show modal
    modal.classList.add('active');
}

function closeAddressModal() {
    const modal = document.getElementById('addressModal');
    modal.classList.remove('active');
}

function saveAddress() {
    const addressInput = document.getElementById('addressInput');
    const userProfile = initializeUserProfile();

    // Update address
    userProfile.addresses.home = addressInput.value;
    localStorage.setItem('userProfile', JSON.stringify(userProfile));

    // Close modal and refresh cart page
    closeAddressModal();
    renderCartPage();

    // Show success notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg';
    notification.textContent = 'Address updated successfully!';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}


// Update window.onload to initialize orders and show them
window.onload = function () {
    // Initialize cart storage if it doesn't exist
    if (!window.cartStorage) {
        window.cartStorage = [];
    }

    // Create floating cart button
    createFloatingCartButton();

    // Initialize size option handlers
    initializeSizeOptions();

    // Initialize orders with demo data if needed
    if (!localStorage.getItem('orders')) {
        // Your existing demo orders initialization code
    }

    // Initial render
    renderProducts('all');

    // Add click handlers for size options
    document.querySelectorAll('.size-option').forEach(option => {
        option.addEventListener('click', (event) => {
            const size = event.currentTarget.dataset.size;
            selectSize(size);
        });
    });

    // Initialize navigation event listeners
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function (event) {
            event.preventDefault();
            const category = this.dataset.category;
            selectCategory(category);
            scrollToTop();
        });
    });
};


// Optional: Add a helper function to clear cart (can be used elsewhere if needed)
function clearCart() {
    counterValues = {};
    sizeSelections = {};
}