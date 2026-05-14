// PSBC E-Commerce Application
// Enterprise-grade luxury streetwear platform

class PSBCStore {
    constructor() {
        this.products = [];
        this.cart = [];
        this.orders = [];
        this.currentHeroSlide = 0;
        this.currentFilter = 'all';
        this.currentPaymentMethod = 'stitch';
        this.isAdmin = false;
        
        this.init();
    }

    init() {
        // Load data from localStorage
        this.loadFromStorage();
        
        // Initialize default products if none exist
        if (this.products.length === 0) {
            this.initializeDefaultProducts();
        }
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Render initial state
        this.renderProducts();
        this.updateCart();
        
        // Start hero slider
        this.startHeroSlider();
        
        // Hide loading screen
        setTimeout(() => {
            document.getElementById('loadingScreen').classList.add('hidden');
        }, 1000);
    }

    initializeDefaultProducts() {
        const defaultProducts = [
            {
                id: this.generateId(),
                name: "Signature Hoodie",
                category: "apparel",
                price: 1299,
                stock: 50,
                badge: "new",
                colors: ['#000000', '#FFFFFF', '#00D4AA'],
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Crect fill='%23f5f5f5' width='400' height='500'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='80' font-weight='bold' fill='%2300D4AA' opacity='0.2'%3EPSBC%3C/text%3E%3C/svg%3E",
                sold: 0,
                comingSoon: false
            },
            {
                id: this.generateId(),
                name: "Premium Joggers",
                category: "apparel",
                price: 899,
                stock: 75,
                badge: "bestseller",
                colors: ['#1a1a1a', '#757575'],
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Cdefs%3E%3ClinearGradient id='g1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23667eea'/%3E%3Cstop offset='100%25' style='stop-color:%23764ba2'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23g1)' width='400' height='500'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='60' font-weight='bold' fill='%23ffffff' opacity='0.3'%3EAPPAREL%3C/text%3E%3C/svg%3E",
                sold: 0,
                comingSoon: false
            },
            {
                id: this.generateId(),
                name: "Embossed Dome Bag",
                category: "accessories",
                price: 1899,
                stock: 30,
                badge: null,
                colors: ['#000000', '#8B7355', '#FFFFFF'],
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Cdefs%3E%3ClinearGradient id='g2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23f093fb'/%3E%3Cstop offset='100%25' style='stop-color:%23f5576c'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23g2)' width='400' height='500'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='50' font-weight='bold' fill='%23ffffff' opacity='0.3'%3ELUXURY%3C/text%3E%3C/svg%3E",
                sold: 0,
                comingSoon: false
            },
            {
                id: this.generateId(),
                name: "Classic T-Shirt",
                category: "apparel",
                price: 499,
                stock: 100,
                badge: null,
                colors: ['#000000', '#FFFFFF', '#00D4AA', '#757575'],
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Crect fill='%23e8e8e8' width='400' height='500'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='70' font-weight='bold' fill='%23000000' opacity='0.1'%3EESSENTIAL%3C/text%3E%3C/svg%3E",
                sold: 0,
                comingSoon: false
            },
            {
                id: this.generateId(),
                name: "Leather Crossbody",
                category: "accessories",
                price: 1599,
                stock: 25,
                badge: "limited",
                colors: ['#000000', '#8B7355'],
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Cdefs%3E%3ClinearGradient id='g3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%234facfe'/%3E%3Cstop offset='100%25' style='stop-color:%2300f2fe'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23g3)' width='400' height='500'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='60' font-weight='bold' fill='%23ffffff' opacity='0.3'%3EACCESSORY%3C/text%3E%3C/svg%3E",
                sold: 0,
                comingSoon: false
            },
            {
                id: this.generateId(),
                name: "Reflective Jacket",
                category: "apparel",
                price: 2499,
                stock: 0,
                badge: "coming-soon",
                colors: ['#000000', '#00D4AA'],
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Crect fill='%231a1a1a' width='400' height='500'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='50' font-weight='bold' fill='%2300D4AA' opacity='0.5'%3ECOMING SOON%3C/text%3E%3C/svg%3E",
                sold: 0,
                comingSoon: true
            }
        ];
        
        this.products = defaultProducts;
        this.saveToStorage();
    }

    generateId() {
        return 'PSBC' + Date.now() + Math.random().toString(36).substr(2, 9);
    }

    loadFromStorage() {
        const stored = localStorage.getItem('psbc_store_data');
        if (stored) {
            const data = JSON.parse(stored);
            this.products = data.products || [];
            this.orders = data.orders || [];
        }
    }

    saveToStorage() {
        const data = {
            products: this.products,
            orders: this.orders
        };
        localStorage.setItem('psbc_store_data', JSON.stringify(data));
    }

    setupEventListeners() {
        // Cart
        document.getElementById('cartBtn').addEventListener('click', () => this.toggleCart(true));
        document.getElementById('closeCart').addEventListener('click', () => this.toggleCart(false));
        
        // Checkout
        document.getElementById('checkoutBtn').addEventListener('click', () => this.openCheckout());
        document.getElementById('closeCheckout').addEventListener('click', () => this.closeCheckout());
        
        // Form
        document.getElementById('checkoutForm').addEventListener('submit', (e) => this.processOrder(e));
        
        // Success modal
        document.getElementById('continueShopping').addEventListener('click', () => this.closeSuccess());
        
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.filterProducts(e.target.dataset.category));
        });
        
        // Payment methods
        document.querySelectorAll('.payment-method').forEach(method => {
            method.addEventListener('click', (e) => this.selectPaymentMethod(e.currentTarget.dataset.method));
        });
        
        // Modal overlay clicks
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    overlay.classList.remove('active');
                }
            });
        });
        
        // Admin form
        if (document.getElementById('addProductForm')) {
            document.getElementById('addProductForm').addEventListener('submit', (e) => this.addProduct(e));
            document.getElementById('productImages').addEventListener('change', (e) => this.previewImages(e));
        }
    }

    startHeroSlider() {
        setInterval(() => {
            this.currentHeroSlide = (this.currentHeroSlide + 1) % 3;
            this.updateHeroSlide();
        }, 6000);
    }

    updateHeroSlide() {
        const slides = document.querySelectorAll('.hero-slide');
        const dots = document.querySelectorAll('.hero-dot');
        
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentHeroSlide);
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentHeroSlide);
        });
    }

    renderProducts() {
        const grid = document.getElementById('productsGrid');
        const filteredProducts = this.currentFilter === 'all' 
            ? this.products 
            : this.products.filter(p => p.category === this.currentFilter);
        
        grid.innerHTML = filteredProducts.map(product => `
            <div class="product-card ${product.comingSoon ? 'coming-soon' : ''}">
                <div class="product-image-wrapper">
                    <img src="${product.image}" alt="${product.name}">
                    ${product.badge ? `<div class="product-badge ${product.badge === 'sold-out' ? 'sold-out' : product.badge === 'limited' ? 'limited' : ''}">${product.badge.replace('-', ' ').toUpperCase()}</div>` : ''}
                    ${!product.comingSoon ? '<button class="product-quick-view">Quick View</button>' : ''}
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-price">R${product.price.toLocaleString()}</div>
                    <div class="product-colors">
                        ${product.colors.map(color => `<div class="color-swatch" style="background: ${color}"></div>`).join('')}
                    </div>
                    <button class="add-to-bag" onclick="store.addToCart('${product.id}')" ${product.comingSoon || product.stock === 0 ? 'disabled' : ''}>
                        ${product.comingSoon ? 'Coming Soon' : product.stock === 0 ? 'Sold Out' : 'Add to Bag'}
                    </button>
                </div>
            </div>
        `).join('');
    }

    filterProducts(category) {
        this.currentFilter = category;
        
        // Update button states
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });
        
        this.renderProducts();
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product || product.comingSoon || product.stock === 0) return;
        
        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            if (existingItem.quantity < product.stock) {
                existingItem.quantity++;
            } else {
                alert('Sorry, we only have ' + product.stock + ' items in stock.');
                return;
            }
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
        
        this.updateCart();
        this.toggleCart(true);
    }

    updateCart() {
        const cartCount = document.getElementById('cartCount');
        const cartItems = document.getElementById('cartItems');
        const cartFooter = document.getElementById('cartFooter');
        const cartSubtotal = document.getElementById('cartSubtotal');
        const cartTotal = document.getElementById('cartTotal');
        
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 1500 ? 0 : 150;
        const total = subtotal + shipping;
        
        cartCount.textContent = totalItems;
        
        if (this.cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <div class="empty-cart-icon">
                        <svg viewBox="0 0 24 24"><path d="M9 2L7 6m10-4 2 4M6 6h12l1 14H5L6 6z"/></svg>
                    </div>
                    <p>Your bag is empty</p>
                </div>
            `;
            cartFooter.style.display = 'none';
        } else {
            cartItems.innerHTML = this.cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-meta">${item.category}</div>
                        <div class="cart-item-price">R${item.price.toLocaleString()}</div>
                        <div class="quantity-control">
                            <button class="qty-btn" onclick="store.updateQuantity('${item.id}', -1)">−</button>
                            <span>${item.quantity}</span>
                            <button class="qty-btn" onclick="store.updateQuantity('${item.id}', 1)">+</button>
                        </div>
                        <button class="remove-item" onclick="store.removeFromCart('${item.id}')">Remove</button>
                    </div>
                </div>
            `).join('');
            cartFooter.style.display = 'block';
            cartSubtotal.textContent = `R${subtotal.toLocaleString()}`;
            cartTotal.textContent = `R${total.toLocaleString()}`;
        }
    }

    updateQuantity(productId, change) {
        const item = this.cart.find(item => item.id === productId);
        const product = this.products.find(p => p.id === productId);
        
        if (item) {
            const newQuantity = item.quantity + change;
            
            if (newQuantity <= 0) {
                this.removeFromCart(productId);
            } else if (newQuantity <= product.stock) {
                item.quantity = newQuantity;
                this.updateCart();
            } else {
                alert('Sorry, we only have ' + product.stock + ' items in stock.');
            }
        }
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.updateCart();
    }

    toggleCart(show) {
        document.getElementById('cartSidebar').classList.toggle('active', show);
    }

    openCheckout() {
        if (this.cart.length === 0) return;
        
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 1500 ? 0 : 150;
        const tax = subtotal * 0.15;
        const total = subtotal + shipping + tax;
        
        document.getElementById('summarySubtotal').textContent = `R${subtotal.toLocaleString()}`;
        document.getElementById('summaryShipping').textContent = shipping === 0 ? 'FREE' : `R${shipping}`;
        document.getElementById('summaryTax').textContent = `R${tax.toFixed(2)}`;
        document.getElementById('summaryTotal').textContent = `R${total.toLocaleString()}`;
        
        document.getElementById('checkoutModal').classList.add('active');
        this.toggleCart(false);
    }

    closeCheckout() {
        document.getElementById('checkoutModal').classList.remove('active');
    }

    selectPaymentMethod(method) {
        this.currentPaymentMethod = method;
        
        document.querySelectorAll('.payment-method').forEach(m => {
            m.classList.toggle('active', m.dataset.method === method);
        });
        
        // Show/hide card fields
        const cardPayment = document.getElementById('cardPayment');
        cardPayment.style.display = method === 'card' ? 'block' : 'none';
    }

    processOrder(e) {
        e.preventDefault();
        
        // In production, this would integrate with Stitch API
        // For now, we'll simulate the process
        
        const orderNumber = this.generateId();
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 1500 ? 0 : 150;
        const tax = subtotal * 0.15;
        const total = subtotal + shipping + tax;
        
        const order = {
            id: orderNumber,
            date: new Date().toISOString(),
            items: [...this.cart],
            subtotal,
            shipping,
            tax,
            total,
            paymentMethod: this.currentPaymentMethod,
            status: 'confirmed'
        };
        
        // Update inventory
        this.cart.forEach(item => {
            const product = this.products.find(p => p.id === item.id);
            if (product) {
                product.stock -= item.quantity;
                product.sold += item.quantity;
                if (product.stock === 0) {
                    product.badge = 'sold-out';
                }
            }
        });
        
        this.orders.push(order);
        this.saveToStorage();
        
        // Show success modal
        document.getElementById('orderNumber').textContent = '#' + orderNumber.substr(0, 15);
        document.getElementById('checkoutModal').classList.remove('active');
        document.getElementById('successModal').classList.add('active');
        
        // Clear cart
        this.cart = [];
        this.updateCart();
        this.renderProducts();
    }

    closeSuccess() {
        document.getElementById('successModal').classList.remove('active');
    }

    // Admin Functions
    showAdminPanel() {
        this.isAdmin = true;
        document.getElementById('adminPortal').classList.add('active');
        this.renderAdminProducts();
        this.renderAdminOrders();
        this.renderAdminInventory();
    }

    closeAdmin() {
        this.isAdmin = false;
        document.getElementById('adminPortal').classList.remove('active');
    }

    showAdminTab(tab) {
        document.querySelectorAll('.admin-tab').forEach(t => {
            t.classList.toggle('active', t.textContent.toLowerCase() === tab);
        });
        
        document.querySelectorAll('.admin-panel').forEach(p => {
            p.classList.remove('active');
        });
        
        document.getElementById('admin-' + tab).classList.add('active');
    }

    previewImages(e) {
        const preview = document.getElementById('imagePreview');
        preview.innerHTML = '';
        
        const files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const div = document.createElement('div');
                div.className = 'image-preview-item';
                div.innerHTML = `
                    <img src="${event.target.result}" alt="Preview">
                    <button type="button" class="remove-image" onclick="this.parentElement.remove()">×</button>
                `;
                preview.appendChild(div);
            };
            reader.readAsDataURL(files[i]);
        }
    }

    addProduct(e) {
        e.preventDefault();
        
        const imagePreview = document.getElementById('imagePreview');
        const firstImage = imagePreview.querySelector('img');
        const imageUrl = firstImage ? firstImage.src : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Crect fill='%23f5f5f5' width='400' height='500'/%3E%3C/svg%3E";
        
        const product = {
            id: this.generateId(),
            name: document.getElementById('productName').value,
            category: document.getElementById('productCategory').value,
            price: parseFloat(document.getElementById('productPrice').value),
            stock: parseInt(document.getElementById('productStock').value),
            badge: document.getElementById('productBadge').value || null,
            colors: ['#000000', '#FFFFFF', '#00D4AA'],
            image: imageUrl,
            sold: 0,
            comingSoon: document.getElementById('productBadge').value === 'coming-soon'
        };
        
        this.products.push(product);
        this.saveToStorage();
        
        // Reset form
        e.target.reset();
        document.getElementById('imagePreview').innerHTML = '';
        
        // Update displays
        this.renderProducts();
        this.renderAdminProducts();
        this.renderAdminInventory();
        
        alert('Product added successfully!');
    }

    renderAdminProducts() {
        const tbody = document.getElementById('productsTableBody');
        if (!tbody) return;
        
        tbody.innerHTML = this.products.map(product => `
            <tr>
                <td>${product.id.substr(0, 12)}...</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>R${product.price.toLocaleString()}</td>
                <td>${product.stock}</td>
                <td>${product.badge ? product.badge.toUpperCase() : '-'}</td>
                <td>
                    <button class="action-btn btn-edit" onclick="store.editProduct('${product.id}')">Edit</button>
                    <button class="action-btn btn-delete" onclick="store.deleteProduct('${product.id}')">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    renderAdminOrders() {
        const tbody = document.getElementById('ordersTableBody');
        if (!tbody) return;
        
        if (this.orders.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 3rem; color: var(--text-light);">No orders yet</td></tr>';
        } else {
            tbody.innerHTML = this.orders.map(order => `
                <tr>
                    <td>${order.id.substr(0, 12)}...</td>
                    <td>Customer</td>
                    <td>${new Date(order.date).toLocaleDateString()}</td>
                    <td>R${order.total.toLocaleString()}</td>
                    <td>${order.status}</td>
                    <td>
                        <button class="action-btn btn-edit">View</button>
                    </td>
                </tr>
            `).join('');
        }
    }

    renderAdminInventory() {
        const tbody = document.getElementById('inventoryTableBody');
        if (!tbody) return;
        
        tbody.innerHTML = this.products.map(product => `
            <tr>
                <td>${product.name}</td>
                <td>${product.stock}</td>
                <td>${product.sold}</td>
                <td>${product.stock === 0 ? 'Out of Stock' : product.stock < 10 ? 'Low Stock' : 'In Stock'}</td>
                <td>
                    <button class="action-btn btn-edit" onclick="store.restockProduct('${product.id}')">Restock</button>
                </td>
            </tr>
        `).join('');
    }

    deleteProduct(id) {
        if (confirm('Are you sure you want to delete this product?')) {
            this.products = this.products.filter(p => p.id !== id);
            this.saveToStorage();
            this.renderProducts();
            this.renderAdminProducts();
            this.renderAdminInventory();
        }
    }

    restockProduct(id) {
        const quantity = prompt('Enter quantity to add to stock:');
        if (quantity && !isNaN(quantity)) {
            const product = this.products.find(p => p.id === id);
            if (product) {
                product.stock += parseInt(quantity);
                if (product.stock > 0 && product.badge === 'sold-out') {
                    product.badge = null;
                }
                this.saveToStorage();
                this.renderProducts();
                this.renderAdminProducts();
                this.renderAdminInventory();
            }
        }
    }
}

// Global functions for onclick handlers
function showAdminLogin() {
    const password = prompt('Enter admin password:');
    if (password === 'admin123') {
        store.showAdminPanel();
    }
}

function setHeroSlide(index) {
    store.currentHeroSlide = index;
    store.updateHeroSlide();
}

// Initialize the store
const store = new PSBCStore();
