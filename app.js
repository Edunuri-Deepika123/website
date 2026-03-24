document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navigation Logic ---
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinksList = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-item');

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        navLinksList.classList.toggle('show');
    });

    // Handle view routing
    function handleRouting() {
        // Get hash without the #
        let hash = window.location.hash.substring(1);
        
        // Default to home if empty or invalid route
        const validRoutes = ['home', 'products', 'product-detail', 'about', 'contact'];
        if (!hash || !validRoutes.includes(hash)) {
            hash = 'home';
            window.location.hash = hash;
            return;
        }

        // Hide all views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });

        // Show active view
        const activeView = document.getElementById(hash);
        if (activeView) {
            activeView.classList.add('active');
        }

        // Update Nav Link Active State
        navItems.forEach(item => {
            item.classList.remove('active');
            // special check: if we are in product-detail, highlight 'products'
            if (hash.startsWith('product-detail')) {
                if (item.getAttribute('href') === '#products') item.classList.add('active');
            } else {
                if (item.getAttribute('href') === `#${hash}`) {
                    item.classList.add('active');
                }
            }
        });

        // Close mobile menu on navigate
        if (navLinksList.classList.contains('show')) {
            navLinksList.classList.remove('show');
        }

        // Handle specific route logic (e.g. details)
        if (hash === 'products') {
            renderProducts();
        } else if (hash.startsWith('product-detail')) {
            const params = new URLSearchParams(window.location.hash.split('?')[1]);
            const productId = params.get('id');
            if (productId) {
                renderProductDetail(parseInt(productId));
            } else {
                window.location.hash = 'products'; // fallback
            }
        }

        // Scroll to top
        window.scrollTo(0, 0);
    }

    // Listen to hash changes
    window.addEventListener('hashchange', handleRouting);
    
    // --- Products Data & Logic ---
    const products = [
        {
            id: 1,
            title: "Premium Wheat Seeds",
            category: "Seeds",
            price: "$45.00 / 50lb",
            image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400",
            description: "High-yield wheat seeds bred for drought resistance and optimal germination rates.",
            benefits: ["99% Germination guarantee", "Drought tolerant", "Disease resistant"],
            usage: "Plant 1-2 inches deep in well-drained soil. Space rows 6-8 inches apart."
        },
        {
            id: 2,
            title: "Organic Nitrogen Fertilizer",
            category: "Fertilizers",
            price: "$32.50 / 20lb",
            image: "https://images.unsplash.com/photo-1628163539097-9e473bfacb47?auto=format&fit=crop&q=80&w=400",
            description: "A slow-release fully organic fertilizer packed with vital nutrients for leafy green growth.",
            benefits: ["Slow-release formula", "Improves soil health", "100% Organic"],
            usage: "Apply 2 lbs per 100 sq ft near the plant base. Water deeply after application."
        },
        {
            id: 3,
            title: "Heavy-Duty Garden Hoe",
            category: "Tools",
            price: "$28.00",
            image: "https://images.unsplash.com/photo-1416879598555-66774619969f?auto=format&fit=crop&q=80&w=400",
            description: "Durable carbon steel hoe with a reinforced fiberglass handle. Perfect for cultivating tough soil.",
            benefits: ["Rust-resistant carbon steel", "Lightweight fiberglass handle", "Ergonomic grip"],
            usage: "Use for weeding, soil cultivation, and shaping rows. Clean and dry after each use."
        },
        {
            id: 4,
            title: "Tomato 'Ruby Red' Seeds",
            category: "Seeds",
            price: "$4.99 / pkt",
            image: "https://images.unsplash.com/photo-1592841200221-a6898f307ba7?auto=format&fit=crop&q=80&w=400",
            description: "Classic heirloom tomato seeds producing large, juicy fruits perfect for slicing.",
            benefits: ["Heirloom variety", "Indeterminate growth", "Excellent flavor"],
            usage: "Start indoors 6-8 weeks before last frost. Transplant outdoors when soil has warmed."
        },
        {
            id: 5,
            title: "Phosphorus Root Booster",
            category: "Fertilizers",
            price: "$29.00 / 15lb",
            image: "https://images.unsplash.com/photo-1587334274328-64186a80aaea?auto=format&fit=crop&q=80&w=400",
            description: "Targeted phosphorus blend to encourage strong root development and early blooms.",
            benefits: ["Promotes deep root systems", "Enhances disease resistance", "Fast-acting"],
            usage: "Mix into the top 2 inches of soil before planting, or side-dress established plants."
        },
        {
            id: 6,
            title: "Professional Pruning Shears",
            category: "Tools",
            price: "$35.00",
            image: "https://images.unsplash.com/photo-1589139265261-2495b68df417?auto=format&fit=crop&q=80&w=400",
            description: "Bypass pruning shears with titanium-coated blades for clean, healthy cuts.",
            benefits: ["Titanium coated blades", "Shock-absorbing bumper", "Sap groove"],
            usage: "Ideal for cutting live stems and branches up to 1 inch thick. Keep blades oiled."
        }
    ];

    const productGrid = document.getElementById('productGrid');
    const detailContainer = document.getElementById('detailContainer');

    function renderProducts() {
        if (!productGrid) return;
        productGrid.innerHTML = '';
        products.forEach(prod => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.onclick = () => window.location.hash = `product-detail?id=${prod.id}`;
            card.innerHTML = `
                <img src="${prod.image}" alt="${prod.title}">
                <div class="product-card-body">
                    <div class="product-title">${prod.title}</div>
                    <p style="color: var(--text-light); font-size: 0.9rem; margin-bottom: 1rem;">${prod.category}</p>
                    <div class="product-price">${prod.price}</div>
                    <button class="btn btn-primary" style="width:100%; margin-top:auto;">View Details</button>
                </div>
            `;
            productGrid.appendChild(card);
        });
    }

    function renderProductDetail(id) {
        if (!detailContainer) return;
        const prod = products.find(p => p.id === id);
        if (!prod) {
            detailContainer.innerHTML = '<p>Product not found.</p>';
            return;
        }

        const benefitsList = prod.benefits.map(b => `<li>${b}</li>`).join('');

        detailContainer.innerHTML = `
            <div class="detail-image">
                <img src="${prod.image}" alt="${prod.title}">
            </div>
            <div class="detail-content">
                <span style="color: var(--accent); font-weight: 600; text-transform: uppercase; font-size: 0.85rem;">${prod.category}</span>
                <h1>${prod.title}</h1>
                <div class="price">${prod.price}</div>
                <p>${prod.description}</p>
                
                <h3>Key Benefits</h3>
                <ul>${benefitsList}</ul>

                <h3>Usage Instructions</h3>
                <p>${prod.usage}</p>

                <button class="btn btn-primary btn-large" style="margin-top: 2rem; width: 100%;" id="btnOrderNow" data-product-title="${prod.title}">
                    <i class="fa-solid fa-cart-shopping"></i> Order Now
                </button>
            </div>
        `;
        
        // Wire up order button
        const btnOrderNow = document.getElementById('btnOrderNow');
        if (btnOrderNow) {
            btnOrderNow.addEventListener('click', () => {
                openOrderModal(prod.title);
            });
        }
    }

    // --- Order Flow Logic ---
    const orderModal = document.getElementById('orderModal');
    const successPopup = document.getElementById('successPopup');
    const closeModalBtn = document.getElementById('closeModal');
    const closePopupBtn = document.getElementById('closePopup');
    const orderForm = document.getElementById('orderForm');
    const orderProductName = document.getElementById('orderProductName');

    function openOrderModal(productName) {
        if (orderProductName) orderProductName.textContent = `Ordering: ${productName}`;
        if (orderModal) orderModal.classList.add('active');
    }

    function closeOrderModal() {
        if (orderModal) orderModal.classList.remove('active');
        if (orderForm) orderForm.reset();
    }

    function showSuccessPopup() {
        if (successPopup) successPopup.classList.add('active');
    }

    function hideSuccessPopup() {
        if (successPopup) {
            successPopup.classList.remove('active');
            window.location.hash = 'products'; // Redirect to products
        }
    }

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeOrderModal);
    if (closePopupBtn) closePopupBtn.addEventListener('click', hideSuccessPopup);

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === orderModal) closeOrderModal();
        if (e.target === successPopup) hideSuccessPopup();
    });

    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload
            // In a real app, send data to server here
            closeOrderModal();
            showSuccessPopup();
        });
    }

    // Initial route handling
    handleRouting();

});
