document.addEventListener('DOMContentLoaded', () => {
    const productsData = [
        { id: 1, name: "F1 Hoodie", price: 1200, images: ["f1.hoodie.jpg", "f1.hoodie.b.jpg"], description: "A stylish hoodie with a Ferrari design for all-day comfort.", hasSize: true, sizes: ["S", "L", "XL"], type: "hoodie" },
        { id: 2, name: "F1 T-Shirt", price: 500, images: ["f1.t-shirt.jpg", "f1.t-shirt.b.jpg"], description: "A light and trendy t-shirt, perfect for daily wear.", hasSize: true, sizes: ["S", "L", "XL"], type: "t-shirt" },
        { id: 3, name: "F1 Water Bottle", price: 350, images: ["f1.bottle.jpg"], description: "A high-quality sports water bottle with the Ferrari logo.", hasSize: false, type: "accessory" },
        { id: 4, name: "McLaren Polo T-Shirt", price: 500, images: ["mclaren.polo.jpg", "111.jpg"], description: "A polo t-shirt with a distinctive McLaren design, combining elegance and comfort.", hasSize: true, sizes: ["S", "L", "XL"], type: "t-shirt" },
        { id: 5, name: "McLaren Cap (Lando Norris)", price: 250, images: ["mclaren.cap.l.jpg", "mclaren.cap.l.b.jpg"], description: "A modern cap with the McLaren logo, suitable for all occasions.", hasSize: false, type: "accessory" },
        { id: 6, name: "McLaren Car Model", price: 2200, images: ["mclaren.car.jpg", "mclaren.car.b.jpg"], description: "A miniature model of the McLaren F1 car, a great addition to your collection.", hasSize: false, type: "decor" },
        { id: 7, name: "McLaren Helmet (Lando Norris)", price: 10000, images: ["mclaren.f1.helmet.jpg", "mclaren.f1.helmet.b.jpg"], description: "An exact replica of the McLaren team helmet.", hasSize: false, type: "decor" },
        { id: 8, name: "Black McLaren Cap", price: 250, images: ["mclaren.cap.jpg", "mclaren.cap.b.jpg"], description: "A McLaren cap in classic black.", hasSize: false, type: "accessory" },
        { id: 9, name: "Ferrari Lewis Hamilton Cap (44)", price: 250, images: ["scuderia-ferrari.cap.1.jpg", "scuderia-ferrari.cap.1.b.jpg"], description: "A sporty Ferrari cap with a unique design.", hasSize: false, type: "accessory" },
        { id: 10, name: "Red Ferrari T-Shirt", price: 500, images: ["scuderia-ferrari.t-shirt.jpg", "scuderia-ferrari.t-shirt.b.jpg"], description: "A classic red t-shirt with the Scuderia Ferrari logo.", hasSize: true, sizes: ["S", "L", "XL"], type: "t-shirt" },
        { id: 11, name: "White Ferrari T-Shirt", price: 500, images: ["scuderia-ferrari.t-shirt.1.jpg", "scuderia-ferrari.t-shirt.1.b.jpg"], description: "A Ferrari t-shirt with a modern and stylish design.", hasSize: true, sizes: ["S", "L", "XL"], type: "t-shirt" },
        { id: 12, name: "Ferrari Charles Leclerc Cap (16)", price: 250, images: ["5551.jpg", "3331.jpg"], description: "A stylish red cap.", hasSize: false, type: "accessory" },
        { id: 13, name: "Black Mercedes T-Shirt", price: 500, images: ["mercedes.t-shirt.jpg", "mercedes.t-shirt.b.jpg"], description: "A Mercedes team t-shirt, comfortable and elegant.", hasSize: true, sizes: ["S", "L", "XL"], type: "t-shirt" },
        { id: 14, name: "White Mercedes T-Shirt", price: 500, images: ["mercedes.t-shirt.1.jpg", "mercedes.t-shirt.1.b.jpg"], description: "A Mercedes t-shirt with a sporty design.", hasSize: true, sizes: ["S", "L", "XL"], type: "t-shirt" },
        { id: 15, name: "Mercedes Cap", price: 250, images: ["mercedes.cap.jpg", "mercedes.cap.b.jpg"], description: "A cap with the Mercedes logo.", hasSize: false, type: "accessory" },
        { id: 16, name: "Mercedes Car Model", price: 2200, images: ["mercedes.car.jpg", "mercedes.car.b.jpg"], description: "A miniature model of the Mercedes F1 car.", hasSize: false, type: "decor" },
        { id: 17, name: "Red Bull T-Shirt (Max Verstappen)", price: 500, images: ["red-bull.t-shirt.jpg", "red-bull.t-shirt.b.jpg"], description: "A Red Bull team t-shirt with a bold design.", hasSize: true, sizes: ["S", "L", "XL"], type: "t-shirt" },
        { id: 18, name: "Red Bull Hoodie", price: 1200, images: ["red-bull.hoodie.jpg", "red-bull.hoodie.b.jpg"], description: "A warm and practical hoodie with the Red Bull logo.", hasSize: true, sizes: ["S", "L", "XL"], type: "hoodie" },
        { id: 19, name: "F1 Cap", price: 250, images: ["f1.cap.jpg", "f1.cap.b.jpg"], description: "The official Red Bull cap.", hasSize: false, type: "accessory" },
        { id: 20, name: "Red Bull Car Model", price: 2200, images: ["red-bull.car.jpg", "red-bull.car.b.jpg"], description: "A miniature model of the Red Bull car.", hasSize: false, type: "decor" },
    ];
    const homeProductsIds = [1, 3, 5, 7, 9];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let currentProduct = null;
    let currentImageIndex = 0;

    // DOM Elements
    const homeProductsContainer = document.getElementById('home-products');
    const productsListContainer = document.getElementById('products-list');
    const navButtons = document.querySelectorAll('.nav-btn');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const backToProductsBtn = document.getElementById('back-to-products-btn');
    const cartCountEl = document.querySelector('.cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    const visaInfoSection = document.getElementById('visa-info-section');
    const checkoutForm = document.getElementById('checkout-form');
    const notificationEl = document.getElementById('notification');
    
    // Product Details Elements
    const detailImageEl = document.getElementById('detail-image');
    const detailNameEl = document.getElementById('detail-name');
    const detailDescriptionEl = document.getElementById('detail-description');
    const detailPriceEl = document.getElementById('detail-price');
    const sizeSection = document.getElementById('size-section');
    const sizeSelectEl = document.getElementById('size-select');
    const quantityInputEl = document.getElementById('quantity-input');
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const buyNowBtn = document.getElementById('buy-now-btn');

    // New DOM Elements for Search & Chat
    const searchInput = document.getElementById('search-input');
    const searchGoBtn = document.getElementById('search-go-btn');
    const searchResultsContainer = document.getElementById('search-results'); 
    const chatIcon = document.getElementById('chat-icon');
    const chatWindow = document.getElementById('chat-window');
    const closeChatBtn = document.getElementById('close-chat-btn');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatBody = document.getElementById('chat-body');

    // Functions
    const showPage = (id) => {
        document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
        document.getElementById(id).classList.add('active');
        navButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.nav-btn[data-section="${id}"]`)?.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const showNotification = (message) => {
        if (notificationEl) {
            notificationEl.textContent = message;
            notificationEl.classList.add('visible');
            setTimeout(() => {
                notificationEl.classList.remove('visible');
            }, 3000);
        }
    };

    const updateCartCount = () => {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountEl.textContent = totalItems > 0 ? totalItems : '';
    };

    const saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };
    
    const updateGalleryButtons = () => {
        if (currentProduct.images.length > 1) {
            prevBtn.classList.remove('hidden');
            nextBtn.classList.remove('hidden');
        } else {
            prevBtn.classList.add('hidden');
            nextBtn.classList.add('hidden');
        }
    };

    const changeImage = (step) => {
        let newIndex = currentImageIndex + step;
        const totalImages = currentProduct.images.length;
        if (newIndex >= totalImages) {
            newIndex = 0;
        } else if (newIndex < 0) {
            newIndex = totalImages - 1;
        }
        currentImageIndex = newIndex;
        detailImageEl.src = currentProduct.images[currentImageIndex];
    };

    const createProductCard = (product) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.images[0]}" alt="${product.name}">
            <div class="product-card-info">
                <p class="product-name">${product.name}</p>
                <p class="product-price">${product.price} EGP</p>
                <div class="product-actions">
                    <button class="btn-details">Details</button>
                    <button class="btn-add-cart">Add to Cart</button>
                </div>
            </div>
        `;
        card.querySelector('.btn-details').onclick = () => showProductDetails(product.id);
        card.querySelector('.btn-add-cart').onclick = () => {
            const size = product.hasSize ? product.sizes[0] : null;
            addToCart(product.id, 1, size);
            // New: Add animation to cart button
            const cartBtn = document.querySelector('.cart-btn');
            cartBtn.classList.add('added');
            setTimeout(() => {
                cartBtn.classList.remove('added');
            }, 500);
        };
        return card;
    };

    // The IntersectionObserver code
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    const renderProducts = (container, productList) => {
        container.innerHTML = '';
        productList.forEach(product => {
            const card = createProductCard(product);
            container.appendChild(card);
            observer.observe(card); // Now we observe each card after it's created
        });
    };

    const filterProducts = (type) => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.filter-btn[data-filter="${type}"]`).classList.add('active');
        
        const filteredProducts = type === 'all' ? productsData : productsData.filter(p => p.type === type);
        renderProducts(productsListContainer, filteredProducts);
    };

    const showProductDetails = (productId) => {
        const product = productsData.find(p => p.id === productId);
        if (!product) {
            console.error("Product not found.");
            showPage('products');
            return;
        }
        currentProduct = product;
        currentImageIndex = 0;
        detailImageEl.src = product.images[currentImageIndex];
        detailNameEl.textContent = product.name;
        detailDescriptionEl.textContent = product.description;
        detailPriceEl.textContent = product.price.toLocaleString();

        if (product.hasSize) {
            sizeSection.classList.remove('hidden');
            sizeSelectEl.innerHTML = product.sizes.map(size => `<option value="${size}">${size}</option>`).join('');
        } else {
            sizeSection.classList.add('hidden');
        }
        quantityInputEl.value = 1;
        updateGalleryButtons();
        showPage('product-details');
    };

    const addToCart = (productId, quantity, size = null) => {
        const product = productsData.find(p => p.id === productId);
        if (!product) return;
    
        if (product.hasSize && !size) {
            showNotification('Please select a size.');
            showProductDetails(productId);
            return;
        }

        const existingItem = cart.find(item => item.product.id === productId && item.size === size);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ product, quantity, size });
        }
        
        saveCart();
        updateCartCount();
    };

    const renderCart = () => {
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-center">Your cart is empty.</p>';
            cartTotalEl.textContent = '0';
            checkoutBtn.style.display = 'none';
            return;
        }

        let total = 0;
        cart.forEach((item, index) => {
            const itemTotal = item.product.price * item.quantity;
            total += itemTotal;
            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <img src="${item.product.images[0]}" alt="${item.product.name}">
                <div class="cart-item-info">
                    <p class="product-name">${item.product.name}</p>
                    ${item.size ? `<p class="item-size">Size: ${item.size}</p>` : ''}
                    <p class="item-price">${itemTotal.toLocaleString()} EGP</p>
                    <p class="item-quantity">Quantity: ${item.quantity}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="remove-btn" data-index="${index}">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemEl);
        });

        cartTotalEl.textContent = total.toLocaleString();
        checkoutBtn.style.display = 'block';
    };

    const renderSearchResults = (query) => {
        const filteredProducts = productsData.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
        );
        
        searchResultsContainer.innerHTML = '';
        
        if (filteredProducts.length > 0) {
            renderProducts(searchResultsContainer, filteredProducts);
        } else {
            searchResultsContainer.innerHTML = '<p style="text-align: center; width: 100%;">No products found matching your search.</p>';
        }
    };

    const addMessage = (message, sender) => {
        const messageEl = document.createElement('div');
        messageEl.classList.add('message', `${sender}-message`);
        messageEl.textContent = message;
        chatBody.appendChild(messageEl);
        chatBody.scrollTop = chatBody.scrollHeight;
    };

    const getBotResponse = (message) => {
        const lowerCaseMessage = message.toLowerCase().trim();

        if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
            return "Hello! How can I help you today? You can ask about products, shipping, or anything else.";
        } else if (lowerCaseMessage.includes('products') || lowerCaseMessage.includes('t-shirts') || lowerCaseMessage.includes('hoodies') || lowerCaseMessage.includes('accessories')) {
            showPage('products');
            return "Certainly! You can browse all our products on the products page.";
        } else if (lowerCaseMessage.includes('cart') || lowerCaseMessage.includes('shopping')) {
            showPage('cart');
            return "You've been directed to your shopping cart. I hope you find what you like.";
        } else if (lowerCaseMessage.includes('payment') || lowerCaseMessage.includes('order confirmation') || lowerCaseMessage.includes('payment methods')) {
            return "We offer convenient payment options: you can pay with cash on delivery or by Visa.";
        } else if (lowerCaseMessage.includes('shipping') || lowerCaseMessage.includes('delivery') || lowerCaseMessage.includes('delivery time')) {
            return "Our delivery service takes 3 to 5 business days, and we ship all over Egypt.";
        } else if (lowerCaseMessage.includes('location') || lowerCaseMessage.includes('where are you')) {
            return "Our headquarter is in Cairo, and we provide fast delivery service to all parts of Egypt.";
        } else if (lowerCaseMessage.includes('offers') || lowerCaseMessage.includes('discounts') || lowerCaseMessage.includes('promotions')) {
            return "Absolutely! We regularly launch special offers and discounts. Follow us on our Instagram and Facebook pages to stay informed about the latest deals.";
        } else if (lowerCaseMessage.includes('contact') || lowerCaseMessage.includes('reach out')) {
            return "You can find our contact details in the 'Contact' section of the website.";
        } else if (lowerCaseMessage.includes('about you') || lowerCaseMessage.includes('who are you')) {
            showPage('about');
            return "I am your personal assistant at the F1 Store. You can learn more about us on the 'About Us' page.";
        } else if (lowerCaseMessage.includes('reward') || lowerCaseMessage.includes('gift')) {
            return "We appreciate our loyal customers! You can join our mailing list to receive special rewards and exclusive gifts.";
        } else if (lowerCaseMessage.includes('sizes')) {
            return "Sizes S, L, and XL are available for most t-shirts and hoodies. If you're looking for a specific size, please check the product page.";
        } else {
            return "I apologize, I didn't understand your request. You can try words like: 'products', 'cart', 'delivery' for me to assist you. Or you can browse the sections from the top bar.";
        }
    };
    

    // Event Listeners
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const section = button.dataset.section;
            showPage(section);
            if (section === 'cart') {
                renderCart();
            } else if (section === 'products') {
                filterProducts('all'); 
            }
        });
    });

    paymentMethods.forEach(input => {
        input.addEventListener('change', (e) => {
            if (e.target.value === 'visa') {
                visaInfoSection.classList.remove('hidden');
            } else {
                visaInfoSection.classList.add('hidden');
            }
        });
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterProducts(button.dataset.filter);
        });
    });

    backToProductsBtn.addEventListener('click', () => showPage('products'));

    addToCartBtn.addEventListener('click', () => {
        const qty = parseInt(quantityInputEl.value);
        const size = sizeSelectEl.value || null;
        if (currentProduct) {
            addToCart(currentProduct.id, qty, size);
        }
    });

    buyNowBtn.addEventListener('click', () => {
        const qty = parseInt(quantityInputEl.value);
        const size = sizeSelectEl.value || null;
        if (currentProduct) {
            addToCart(currentProduct.id, qty, size);
            showPage('checkout');
        }
    });

    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            saveCart();
            updateCartCount();
            renderCart();
        }
    });

    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            showPage('checkout');
        } else {
            showNotification('Your cart is empty!');
        }
    });

    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (cart.length === 0) {
            showNotification('Your cart is empty!');
            return;
        }

        const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
        
        if (paymentMethod === 'visa') {
            const cardNumber = document.getElementById('card-number').value;
            const expiryDate = document.getElementById('expiry-date').value;
            const cvv = document.getElementById('cvv').value;

            if (!cardNumber || !expiryDate || !cvv) {
                showNotification('Please fill in all Visa card details.');
                return;
            }
        } else if (paymentMethod === 'cash') {
            // No additional validation needed for cash
        }

        //showNotification('Order placed successfully! Thank you for your purchase.');
        cart = [];
        saveCart();
        updateCartCount();
        
        setTimeout(() => {
            showPage('home');
            checkoutForm.reset();
        }, 500);
    });

    prevBtn.addEventListener('click', () => changeImage(-1));
    nextBtn.addEventListener('click', () => changeImage(1));


    searchGoBtn.addEventListener('click', () => {
        const query = searchInput.value;
        showPage('search');
        renderSearchResults(query);
    });

    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value;
            showPage('search');
            renderSearchResults(query);
        }
    });

    chatIcon.addEventListener('click', () => {
        chatWindow.classList.toggle('hidden');
    });

    closeChatBtn.addEventListener('click', () => {
        chatWindow.classList.add('hidden');
    });

    sendBtn.addEventListener('click', () => {
        const userMessage = chatInput.value.trim();
        if (userMessage) {
            addMessage(userMessage, 'user');
            chatInput.value = '';
            setTimeout(() => {
                const botResponse = getBotResponse(userMessage);
                addMessage(botResponse, 'bot');
            }, 500);
        }
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendBtn.click();
        }
    });

    // Initial page load
    const initialPage = window.location.hash.substring(1) || 'home';
    showPage(initialPage);
    renderProducts(homeProductsContainer, productsData.filter(p => homeProductsIds.includes(p.id)));
    renderProducts(productsListContainer, productsData);
    updateCartCount();
});

window.addEventListener('load', () => {
    const splashScreen = document.getElementById('splash-screen');
    setTimeout(() => {
        splashScreen.style.opacity = '0';
    }, 500);
    
    setTimeout(() => {
        splashScreen.style.display = 'none';
    }, 1000);
});

// New: Fade-in effect on body
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('fade-in');
});

// New: Scroll effect on header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
});