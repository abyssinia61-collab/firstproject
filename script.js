document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const mainNav = document.getElementById('mainNav');

    mobileToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });

    // Filter Functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            productCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Shopping Cart State
    let cart = [];
    const cartBtn = document.getElementById('cartBtn');
    const cartDrawer = document.getElementById('cartDrawer');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cartBadge = document.getElementById('cartBadge');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    // Toggle Cart Drawer
    const openCart = () => {
        cartDrawer.classList.add('open');
        cartOverlay.classList.add('active');
    };

    const closeCart = () => {
        cartDrawer.classList.remove('open');
        cartOverlay.classList.remove('active');
    };

    cartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    // Add To Cart Logic
    const addToCartBtns = document.querySelectorAll('.btn-add-cart');

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const title = btn.getAttribute('data-title');
            const price = parseFloat(btn.getAttribute('data-price'));
            const img = btn.getAttribute('data-img');

            const existingItem = cart.find(item => item.id === id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ id, title, price, img, quantity: 1 });
            }

            updateCartUI();
            openCart();
        });
    });

    // Render & Update Cart UI
    function updateCartUI() {
        // Total Items Badge
        const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartBadge.textContent = totalCount;

        // Clear Container
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-msg">Your cart is currently empty.</p>';
            cartTotal.textContent = '$0.00';
            return;
        }

        let totalPrice = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;

            const itemEl = document.createElement('div');
            itemEl.classList.add('cart-item');
            itemEl.innerHTML = `
        <img src="${item.img}" alt="${item.title}">
        <div class="cart-item-details">
          <h4>${item.title}</h4>
          <p>Qty: ${item.quantity} × $${item.price.toFixed(2)}</p>
        </div>
      `;
            cartItemsContainer.appendChild(itemEl);
        });

        cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
    }
});