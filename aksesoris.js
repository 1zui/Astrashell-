const products = [
            { id: 15, name: "Logitech G502X plus", description: "Mouse gaming ultra-ringan dengan sensor HERO.", price: 2100000, originalPrice: 2300000, discount: 9, image: "asset/aksesories/g502x-plus-gallery-2-black.webp", tags: ['accessories', 'mouse', 'gaming'], isOutOfStock: false },
            { id: 16, name: "Razer DeathAdder V2", description: "Desain ergonomis yang legendaris untuk kenyamanan.", price: 1200000, originalPrice: null, discount: null, image: "asset/aksesories/razer mouse 1.jpg", tags: ['accessories', 'mouse', 'gaming'], isOutOfStock: false },
            { id: 17, name: "Fantech Atom Mori Series", description: "Keyboard mekanikal dengan blue switch yang clicki.", price: 350000, originalPrice: 3800000, discount: 8, image: "asset/aksesories/ATOM-MORI-SERIES-Keyboard-Mechanical-Gaming-ATOM-63.webp", tags: ['accessories', 'keyboard', 'gaming'], isOutOfStock: false },
            { id: 18, name: "Rexus K9G", description: "Keyboard nirkabel untuk Mac dan Windows.", price: 150000, originalPrice: null, discount: null, image: "asset/aksesories/KeyboardK9G_1.webp", tags: ['accessories', 'keyboard', 'work'], isOutOfStock: false },
            { id: 19, name: "Rexus Daxa Asteria AX1 Mikasa Edition", description: "Konsol generasi terbaru dengan grafis memukau.", price: 500000, originalPrice: null, discount: null, image: "asset/aksesories/mikasa.webp", tags: ['accessories', 'console', 'gaming'], isOutOfStock: false },
            { id: 20, name: "Fantech EOS PRO II Gamepad", description: "Performa gaming 4K yang powerful dan cepat.", price: 520000, originalPrice: null, discount: null, image: "asset/aksesories/Fantech-EOS-PRO-II-Gamepad-HALL-EFFECT-Wireless-Bluetooth-Joystick-PC-Android-IOS-for-Laptop-PC-WGP15V2.webp", tags: ['accessories', 'console', 'gaming'], isOutOfStock: false },
            { id: 21, name: "Logitech Headphone +", description: "Headphone peredam bising terbaik di kelasnya.", price: 2500000, originalPrice: 6000000, discount: 8, image: "asset/aksesories/logi headset.webp", tags: ['accessories', 'audio'], isOutOfStock: false },
            { id: 22, name: "Razer Headphone", description: "Headset gaming wirles dengan suara jernih.", price: 2800000, originalPrice: null, discount: null, image: "asset/aksesories/razer 3.png", tags: ['accessories', 'audio', 'gaming'], isOutOfStock: false },
            { id: 23, name: "Razer Gigantus V2", description: "Permukaan kain mikro untuk kecepatan dan kontrol.", price: 450000, originalPrice: 500000, discount: 10, image: "asset/aksesories/razer mousepad.png", tags: ['accessories', 'mousepad', 'gaming'], isOutOfStock: false },
            { id: 24, name: "Rexus Kvlar Deskmate", description: "Mousepad besar untuk melindungi meja kerja Anda.", price: 350000, originalPrice: null, discount: null, image: "asset/aksesories/KVLAR_TR2_1_56f3759b-24c4-4454-810e-342e3e6cf70a.webp", tags: ['accessories', 'mousepad', 'work'], isOutOfStock: false },
        ];
        
        const originalProducts = [...products];
        let currentProducts = [...originalProducts];

        function getCart() { return JSON.parse(localStorage.getItem('cartItems')) || []; }
        function saveCart(cart) { localStorage.setItem('cartItems', JSON.stringify(cart)); updateCartIcon(); }
        function updateCartIcon() {
            // Fungsi ini tidak lagi relevan karena ikon keranjang telah dihapus
            const cartCountEl = document.getElementById('cartCount');
            if (cartCountEl) {
                cartCountEl.textContent = getCart().reduce((sum, item) => sum + item.quantity, 0);
            }
        }
        function formatPrice(price) { return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price); }
        function showNotification(message, isError = false) {
            const notification = document.getElementById('notification');
            const notificationMessage = document.getElementById('notificationMessage');
            if (notification && notificationMessage) {
                notificationMessage.textContent = message;
                notification.style.backgroundColor = isError ? '#d9534f' : '#28a745';
                notification.classList.add('show');
                setTimeout(() => notification.classList.remove('show'), 3000);
            }
        }
        
        function handleActionClick(event, productId) {
            event.preventDefault(); 
            event.stopPropagation();
            addToCart(productId);
        }

        function renderProducts(productsToRender) {
            const container = document.getElementById('product-list-container');
            if (!container) return;
            container.innerHTML = '';
            productsToRender.forEach(p => {
                const discountBadge = p.discount ? `<span class="discount-badge">-${p.discount}%</span>` : '';
                const priceHTML = p.originalPrice ? `<span class="original-price">${formatPrice(p.originalPrice)}</span><span class="final-price">${formatPrice(p.price)}</span>` : `<span class="final-price">${formatPrice(p.price)}</span>`;
                const hoverOverlay = `<div class="card-hover-overlay"><div class="hover-label">Lihat Produk</div></div>`;
                const productLink = `product-detail.html?id=${p.id}`;

                container.innerHTML += `
                <a href="${productLink}" class="product-card-link">
                    <article class="product-card">
                        ${discountBadge}
                        <div class="card-image-container">
                            <img src="${p.image}" alt="${p.name}">
                            ${hoverOverlay}
                        </div>
                        <div class="card-content">
                            <h3 class="card-title">${p.name}</h3>
                            <p class="card-description">${p.description}</p>
                            <div class="card-price">${priceHTML}</div>
                            <div class="card-actions">
                                <button class="cart-btn" aria-label="Tambah ke Keranjang" onclick="handleActionClick(event, ${p.id})"><i class="fas fa-shopping-cart"></i></button>
                                <button class="buy-btn" onclick="handleActionClick(event, ${p.id})">BELI</button>
                            </div>
                        </div>
                    </article>
                </a>`;
            });
        }

        function renderSidebar() {
            const sidebarContainer = document.getElementById('sidebar-container');
            if (!sidebarContainer) return;
            // [MODIFIKASI] Kategori sidebar disesuaikan dengan data produk baru
            const categories = [
                { name: 'Mouse', tag: 'mouse' },
                { name: 'Keyboard', tag: 'keyboard' },
                { name: 'Konsol', tag: 'console' },
                { name: 'Audio', tag: 'audio' },
                { name: 'Mousepad', tag: 'mousepad' },
            ];
            const totalProducts = originalProducts.length;
            const categoryCounts = categories.map(cat => ({ ...cat, count: originalProducts.filter(p => p.tags && p.tags.includes(cat.tag)).length }));
            let sidebarHTML = `
                <div class="filter-header">Filter results: ${totalProducts} Produk</div>
                <div class="filter-info"><i class="fas fa-info-circle"></i><span>Pilih filter untuk melihat produk yang sesuai.</span></div>
                <ul class="category-list">
                    <li class="category-item active" id="filter-all"><a href="#" onclick="applyFilter('all', this.parentElement)"><span>All Products</span><span class="category-count">(${totalProducts})</span></a></li>
            `;
            categoryCounts.forEach(cat => {
                if (cat.count > 0) { sidebarHTML += `<li class="category-item" id="filter-${cat.tag}"><a href="#" onclick="applyFilter('${cat.tag}', this.parentElement)"><span>${cat.name}</span><span class="category-count">(${cat.count})</span></a></li>`; }
            });
            sidebarHTML += '</ul>';
            sidebarContainer.innerHTML = sidebarHTML;
        }

        function applyFilter(tag, activeElement) {
            document.querySelectorAll('.category-item').forEach(li => li.classList.remove('active'));
            if(activeElement) activeElement.classList.add('active');
            
            if (tag === 'all') {
                currentProducts = [...originalProducts];
                document.getElementById('page-title').textContent = 'Semua Produk';
            } else {
                currentProducts = originalProducts.filter(p => p.tags && p.tags.includes(tag));
                const categoryName = activeElement.querySelector('a > span:first-child').textContent;
                document.getElementById('page-title').textContent = categoryName;
            }
            document.getElementById('sort-select').value = 'default';
            updateProductView();
        }

        function updateProductView() {
            let productsToShow = [...currentProducts];
            const sortBy = document.getElementById('sort-select').value;
            switch (sortBy) {
                case 'price-asc': productsToShow.sort((a, b) => a.price - b.price); break;
                case 'price-desc': productsToShow.sort((a, b) => b.price - a.price); break;
                case 'name-asc': productsToShow.sort((a, b) => a.name.localeCompare(b.name)); break;
            }
            renderProducts(productsToShow);
        }

        function addToCart(productId) {
            const productToAdd = products.find(p => p.id === productId);
            if (!productToAdd) return;
            let cart = getCart();
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) { existingItem.quantity++; }
            else { cart.push({ ...productToAdd, quantity: 1, selected: true }); }
            saveCart(cart);
            showNotification(`${productToAdd.name} berhasil ditambahkan!`);
        }

        document.addEventListener('DOMContentLoaded', () => {
            updateCartIcon(); 
            renderSidebar(); 
            applyFilter('all', document.getElementById('filter-all'));
        });