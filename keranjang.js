const products = [
    // KATEGORI GAMING
    { id: 1, name: "Lenovo Legion", description: "Performa tinggi untuk pengalaman gaming maksimal.", price: 25000000, originalPrice: 27500000, discount: 9, image: "asset/laptop/01_Legion_9i_Hero_Front_Facing_JD-1024x872.webp", tags: ['gaming', 'creators'], isOutOfStock: false },
    { id: 2, name: "Lenovo LOQ", description: "Kekuatan pendingin terbaik di kelasnya untuk sesi panjang.", price: 22000000, originalPrice: 24000000, discount: 8, image: "asset/laptop/laptop loq.jpg", tags: ['gaming'], isOutOfStock: false },
    { id: 3, name: "Lenovo Legion", description: "Performa tinggi untuk pengalaman gaming maksimal.", price: 25000000, originalPrice: 27500000, discount: 9, image: "asset/laptop/01_Legion_9i_Hero_Front_Facing_JD-1024x872.webp", tags: ['gaming', 'creators'], isOutOfStock: false },

    { id: 4, name: "MSI Katana", description: "Kombinasi sempurna antara kecepatan dan ketajaman.", price: 18000000, originalPrice: 20000000, discount: 10, image: "asset/laptop/msi.png", tags: ['gaming'], isOutOfStock: false },
    // KATEGORI PELAJAR (STUDENT)
    { id: 5, name: "Lenovo IdeaPad Slim 5", description: "Ringan, andal, dan pas untuk kebutuhan belajar.", price: 9500000, originalPrice: 11000000, discount: 14, image: "asset/laptop/lenovo ideapad.jpg", tags: ['students', 'home'], isOutOfStock: false },
    { id: 6, name: "ASUS VivoBook", description: "Tampil penuh warna dengan performa solid.", price: 8900000, originalPrice: null, discount: null, image: "asset/laptop/Asus-Vivobook-GO-E1504FAb.png", tags: ['students', 'home'], isOutOfStock: false },
    // KATEGORI KREATOR (CREATOR)
    { id: 9, name: "ASUS ZenBook", description: "Layar OLED presisi tinggi untuk para profesional kreatif.", price: 19800000, originalPrice: 21000000, discount: 6, image: "asset/laptop/zenbook_s_14_ux5406sa_product_photo_3w_scandinavian_white__03.1_1_2.jpg", tags: ['creators', 'work'], isOutOfStock: false },
    { id: 10, name: "Lenovo Yoga Pro", description: "Fleksibilitas dan tenaga untuk wujudkan semua ide.", price: 23000000, originalPrice: null, discount: null, image: "asset/laptop/lenovo_yoga_pro_9i_transparent_bgxda-jpg.avif", tags: ['creators', 'work'], isOutOfStock: false },
    // KATEGORI BEKERJA (WORK)
    { id: 11, name: "Lenovo ThinkPad X1", description: "Keamanan dan ketahanan premium untuk para pebisnis.", price: 30000000, originalPrice: null, discount: null, image: "asset/laptop/thinkpad-x13-gen5-text-420x420.jpg", tags: ['work'], isOutOfStock: false },
    // KATEGORI RUMAHAN (HOME)
    { id: 13, name: "Acer Aspire 3", description: "Pilihan tepat untuk tugas harian keluarga.", price: 6500000, originalPrice: 7200000, discount: 10, image: "asset/laptop/acer-aspire-3-a314-36m-non-fingerprint-non-backlit-wallpaper-win11-pure-silver-metal-01-1.avif", tags: ['home', 'students'], isOutOfStock: false },
    { id: 14, name: "HP 14", description: "Andal dan terjangkau untuk Browse dan streaming.", price: 5900000, originalPrice: null, discount: null, image: "asset/laptop/hp.jpg", tags: ['home'], isOutOfStock: false },
];

const originalProducts = [...products];
let currentProducts = [...originalProducts];

// Fungsi cart tidak memerlukan icon cart di navbar, jadi dibiarkan saja
function getCart() { return JSON.parse(localStorage.getItem('cartItems')) || []; }
function saveCart(cart) { localStorage.setItem('cartItems', JSON.stringify(cart)); }
function updateCartIcon() {
    // Karena navbar dan cart icon tidak ada, fungsi ini bisa dikosongkan 
    // atau dibiarkan untuk penggunaan di masa depan jika ada icon cart di tempat lain.
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = getCart().reduce((sum, item) => sum + item.quantity, 0);
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
    const categories = [{ name: 'For Home', tag: 'home' }, { name: 'For Work', tag: 'work' }, { name: 'For Creators', tag: 'creators' }, { name: 'For Students', tag: 'students' }, { name: 'For Gaming', tag: 'gaming' }];
    const totalProducts = originalProducts.length;
    const categoryCounts = categories.map(cat => ({ ...cat, count: originalProducts.filter(p => p.tags && p.tags.includes(cat.tag)).length }));
    let sidebarHTML = `
                <div class="filter-header">Filter results: ${totalProducts} Perangkat</div>
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
    if (activeElement) activeElement.classList.add('active');

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