<?php 

if (isset($_GET['action']) && $_GET['action'] === 'logout') {
    unset($_SESSION['user_token']);
    // Reload the page
    header('Location: login.php');
    exit;
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Drops Coffee App</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="App/Frontend/CSS/style.css">
</head>

<body class="bg-gray-100">
    <div class="content-wrapper">
        <!-- Header -->
        <header class="bg-white shadow-md">
            <div class="container mx-auto px-4 py-6 flex items-center justify-between">
                <h1 class="text-2xl font-bold text-gray-800">drops</h1>
                <!-- <div class="flex items-center space-x-4">
                    <button class="text-gray-600 hover:text-gray-800 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                    <button class="text-gray-600 hover:text-gray-800 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </button>
                </div> -->
            </div>
        </header>

        <!-- Main Content -->
        <main class="container mx-auto px-4 py-8">
            <h2 id="categoryTitle" class="text-2xl font-semibold mb-6 text-gray-800">All Items</h2>
            <div id="productGrid" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                <!-- Products will be dynamically inserted here -->
            </div>
        </main>
    </div>

    <!-- Floating Footer Navigation -->
    <!-- Floating Footer Navigation -->
    <footer class="floating-navbar">
        <nav class="flex justify-around items-center py-4">
            <button class="nav-item text-white hover:text-gray-300 transition-colors" data-category="clipboard">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fill-rule="evenodd"
                        d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                        clip-rule="evenodd" />
                </svg>
            </button>
            <button class="nav-item text-white hover:text-gray-300 transition-colors" data-category="user">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clip-rule="evenodd" />
                </svg>
            </button>
            <button class="nav-item text-white hover:text-gray-300 transition-colors active" data-category="all">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
            </button>
            <button class="nav-item text-white hover:text-gray-300 transition-colors" data-category="cart">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
            </button>
            <button class="nav-item text-white hover:text-gray-300 transition-colors" data-category="options">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                        clip-rule="evenodd" />
                </svg>
            </button>
        </nav>
    </footer>

    <!-- Size Selection Popup -->
    <div id="sizePopup" class="size-popup">
        <div class="size-popup-content">
            <h3 class="text-xl font-semibold mb-4">Select Size</h3>
            <button class="size-option" data-size="S">Small</button>
            <button class="size-option" data-size="M">Medium</button>
            <button class="size-option" data-size="L">Large</button>
        </div>
    </div>

    <!-- Address Edit Modal -->
    <div id="addressModal" class="address-modal">
        <div class="address-modal-content">
            <button class="modal-close-btn" onclick="closeAddressModal()">&times;</button>
            <h3 class="text-xl font-semibold mb-4">Edit Delivery Address</h3>
            <textarea id="addressInput"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black resize-none h-32 mb-4"></textarea>
            <div class="flex justify-end space-x-3">
                <button onclick="closeAddressModal()"
                    class="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50">
                    Cancel
                </button>
                <button onclick="saveAddress()" class="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800">
                    Save Address
                </button>
            </div>
        </div>
    </div>

    <script src="App/Frontend/JS/main.js"></script>
</body>

</html>