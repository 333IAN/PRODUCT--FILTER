document.addEventListener('DOMContentLoaded', function() {
    // Product data
    const products = [
        {id: 1, name: "iPhone 15", price: 799, brand: "Apple", rating: 5, img: "Img/iphone15.jpg", description: "High-quality and durable product, perfect for everyday use.", category: "Electronics", available: true},
        {id: 2, name: "Sony Noise Cancelling Headphones", price: 249, brand: "Sony", rating: 4, img: "Img/sonyHeadphones.jpg", description: "Premium noise-cancelling headphones for superior audio experience.", category: "Audio", available: false},
        {id: 3, name: "Dell XPS 13 Laptop", price: 1399, brand: "Dell", rating: 5, img: "Img/dellXPS13.jpg", description: "Powerful and sleek laptop with excellent battery life.", category: "Electronics", available: true},
        {id: 4, name: "Columbus Shoot Sports", price: 180, brand: "Columbus", rating: 5, img: "Img/Sports&Outdoors.jpg", description: "Highly rated product, offers great performance at competitive price.", category: "Sports & Outdoors", available: true},
        {id: 5, name: "iPhone 16", price: 950, brand: "Apple", rating: 2, img: "Img/iphone16.jpg", description: "Affordable but lacking some advanced features.", category: "Electronics", available: true},
        {id: 6, name: "Prestige Endura Pro", price: 120, brand: "Prestige", rating: 4, img: "Img/Home&Kitchen2.jpg", description: "Budget-friendly, high-quality product for value.", category: "Home & Kitchen", available: true},
        {id: 7, name: "Samsung Galaxy S23", price: 849, brand: "Samsung", rating: 5, img: "Img/samsungs23.jpg", description: "Latest Samsung smartphone with great camera.", category: "Electronics", available: true},
        {id: 8, name: "Canon EOS 80D Camera", price: 1049, brand: "Canon", rating: 4, img: "Img/canonCamera.jpg", description: "Perfect DSLR for amateur photographers.", category: "Photography", available: false},
        {id: 9, name: "iPhone 14", price: 899, brand: "Apple", rating: 3, img: "Img/iphone14.jpg", description: "Premium product with some areas for improvement.", category: "Electronics", available: false},
        {id: 10, name: "Apple Airpods Pro", price: 219, brand: "Apple", rating: 5, img: "Img/airpodsPro.jpg", description: "Wireless earbuds with active noise cancellation.", category: "Audio", available: true},
        {id: 11, name: "Canon EOS 90D Camera", price: 1200, brand: "Canon", rating: 5, img: "Img/canonCamera.jpg", description: "New Canon camera with advanced features.", category: "Photography", available: true},
        {id: 12, name: "Nike Running Shoes", price: 89, brand: "Nike", rating: 4, img: "Img/nikeShoes.jpg", description: "Comfortable and stylish running shoes.", category: "Sportswear", available: true}
    ];

    // DOM Elements
    const productList = document.getElementById('productList');
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    const categorySelect = document.getElementById('category');
    const ratingSelect = document.getElementById('rating');
    const searchInput = document.getElementById('searchInput');
    const inStockCheckbox = document.getElementById('inStock');
    const sortBy = document.getElementById('sortBy');
    const resetFilters = document.getElementById('resetFilters');
    const productCount = document.getElementById('productCount');
    const noResults = document.getElementById('noResults');

    // Display products
    const displayProducts = (products) => {
        productList.innerHTML = '';
        
        if (products.length === 0) {
            noResults.style.display = 'block';
            productCount.textContent = 'No products found';
            return;
        }
        
        noResults.style.display = 'none';
        productCount.textContent = `Showing ${products.length} ${products.length === 1 ? 'product' : 'products'}`;
        
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = `col-md-4 col-sm-6 mb-4 product-card ${!product.available ? 'out-of-stock' : ''}`;
            
            productCard.innerHTML = `
                <div class="card h-100">
                    <img src="${product.img}" class="card-img-top" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x200?text=Product+Image'">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text"><strong>Brand:</strong> ${product.brand}</p>
                        <p class="card-text"><strong>Price:</strong> $${product.price}</p>
                        <p class="card-text"><strong>Category:</strong> ${product.category}</p>
                        <div class="star-rating">${'★'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}</div>
                        <p class="card-text">${product.description}</p>
                    </div>
                    <div class="card-footer bg-transparent">
                        <button class="btn btn-primary w-100 ${!product.available ? 'disabled' : ''}">
                            ${product.available ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                    </div>
                </div>
            `;
            
            productList.appendChild(productCard);
        });
    };

    // Filter products
    const filterProducts = () => {
        const maxPrice = parseInt(priceRange.value);
        const selectedCategory = categorySelect.value;
        const selectedRating = parseInt(ratingSelect.value);
        const inStockOnly = inStockCheckbox.checked;
        const searchTerm = searchInput.value.toLowerCase();
        
        return products.filter(product => {
            const matchesPrice = product.price <= maxPrice;
            const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
            const matchesRating = selectedRating === 0 || product.rating >= selectedRating;
            const matchesAvailability = !inStockOnly || product.available;
            const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                                 product.description.toLowerCase().includes(searchTerm) || 
                                 product.brand.toLowerCase().includes(searchTerm);
            
            return matchesPrice && matchesCategory && matchesRating && matchesAvailability && matchesSearch;
        });
    };

    // Sort products
    const sortProducts = (products) => {
        const sortValue = sortBy.value;
        
        return [...products].sort((a, b) => {
            switch (sortValue) {
                case 'price-low': return a.price - b.price;
                case 'price-high': return b.price - a.price;
                case 'rating': return b.rating - a.rating;
                case 'name': return a.name.localeCompare(b.name);
                default: return 0;
            }
        });
    };

    // Update products display
    const updateProducts = () => {
        let filteredProducts = filterProducts();
        filteredProducts = sortProducts(filteredProducts);
        displayProducts(filteredProducts);
    };

    // Reset all filters
    const resetAllFilters = () => {
        priceRange.value = 1000;
        priceValue.textContent = '1000';
        categorySelect.value = 'All';
        ratingSelect.value = '0';
        inStockCheckbox.checked = false;
        searchInput.value = '';
        sortBy.value = 'default';
        updateProducts();
    };

    // Event listeners
    priceRange.addEventListener('input', () => {
        priceValue.textContent = priceRange.value;
        updateProducts();
    });

    categorySelect.addEventListener('change', updateProducts);
    ratingSelect.addEventListener('change', updateProducts);
    searchInput.addEventListener('input', updateProducts);
    inStockCheckbox.addEventListener('change', updateProducts);
    sortBy.addEventListener('change', updateProducts);
    resetFilters.addEventListener('click', resetAllFilters);

    // Initialize
    updateProducts();
});
