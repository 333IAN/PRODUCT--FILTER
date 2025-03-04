const products=[
    {id:1,name:"Iphone 15",price:799,brand:"Apple",rating:5,img:"Img/iphone15.jpg",description:"High-quality and durable product,perfect for everyday use.",category:"Electronics",available:true},
    {id:2,name:"Sony Noise Cancelling Headphones",price:249,brand:"Sony",rating:4,img:"Img/sonyHeadphones.jpg",description:"Premium noise-cancelling headphones for a superior audio experience.",category:"Audio",available:false},
    {id:3,name:"Dell XPS 13 Laptop",price:1399,brand:"Dell",rating:5,img:"Img/dellXPS13.jpg",description:"Powerful and sleek laptop with excellent battery life.",category:"Electronics",available:true},
    {id:4,name:"Columbus Shoot Sports",price:180,brand:"Columbus",rating:5,img:"Img/Sports&Outdoors.jpg",description:"Hihly rated product,offers great performaance at a competitive price.",category:"Sports & Outdoors",available:true},
    {id:5,name:"Iphone 16",price:950,brand:"Apple",rating:2,img:"Img/iphone16.jpg",description:"Affordable but lacking some advanced features,suitable for basic needs.",category:"Electronics",available:true},
    {id:6,name:"Presenting Prestige Endura Pro",price:120,brand:"Presenting",rating:4,img:"Img/Home&Kitchen2.jpg",description:"Budget-friendly,high-quality product for those who prioritize value.",category:"Home & Kitchen",available:true},
    {id:7,name:"Samsung Galaxy S23",price:849,brand:"Samsung",rating:5,img:"Img/samsungs23.jpg",description:"Latest Samsung smartphone with high perfomance and great camera.",category:"Electronics",available:true},
    {id:8,name:"Canon EOS 80D Camera",price:1049,brand:"Canon",rating:4,img:"Img/canonCamera.jpg",description:"Perfect DSLR camera for amateur photographers and hobbyists.",category:"Photography",available:false},
    {id:9,name:"Iphone 14",price:899,brand:"Apple",rating:3,img:"Img/iphone14.jpg",description:"Premium product with advanced features but some areas for improvement.",category:"Electronics",available:false},
    {id:10,name:"Apple Airpods Pro",price:219,brand:"Apple",rating:5,img:"Img/airpodsPro.jpg",description:"High quality wireless earbuds with active noise cancellation.",category:"Audio",available:true},
    {id:11,name:"Canon EOS 90D Camera",price:1200,brand:"Canon",rating:5,img:"Img/canonCamera.jpg",description:"New Canon camera with advanced features.",category:"Photography",available:true},
    {id:12,name:"Nike Running Shoes",price:89,brand:"Nike",rating:4,img:"Img/nikeShoes.jpg",description:"Comfortable and stylish running shoes with great support.",category:"Sportswear",available:true}
];
const productList=document.getElementById('productList');
const priceRange=document.getElementById('priceRange');
const priceValue=document.getElementById('priceValue');
const categorySelect=document.getElementById('category');
const ratingSelect=document.getElementById('rating');
const searchInput=document.getElementById('searchInput');
const inStockCheckbox=document.getElementById('inStock');
const displayProducts=(filteredProducts)=>{productList.innerHTML='';
    filteredProducts.forEach(product=>{
        const productcard=`<div class="col-md-4 product-card ${product.available?'':'out-of-stock'}">
        div class="card">
        <img src="${product.img}
        "class="card-img-top" alt="${product.name}">
        <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text">Category:${product.category}</p>
        <p class="card-text">Rating:${'⭐'.repeat(product.rating)}</p>
        ${!product.available?'<p class="card-text text-danger">Out of Stock</p>':''}
        </div>
        </div>
        </div>`;
        productList.innerHTML+=productcard;
    });
};
const filterProducts=()=>{
    const maxPrice=parseInt(priceRange.value);
    const selectedCategory=categorySelect.value;
    const selectedRating=ratingSelect.value;
    const inStockOnly=inStockCheckbox.checked;
    const filtered=products.filter(product=>{
        const matchesPrice=product.price<=maxPrice;
        const matchesCategory=selectedCategory==='ALL' || product.category===selectedCategory;
        const matchesRating=selectedRating==='ALL' ||product.rating>=selectedRating;
        const matchesAvailability=!inStockOnly || product.available;
        return matchesPrice && matchesCategory && matchesRating && matchesAvailability;
    });
    return filtered;
};
const searchProducts=(filteredProducts)=>{
    const searchTerm=searchInput.value.toLowerCase();
    return filteredProducts.filter(product=>product.name.toLowerCase().includes(searchTerm));
};
const updateProducts=()=>{
    let filteredProducts=filterProducts();
    filteredProducts=searchProducts(filteredProducts);
    displayProducts(filteredProducts);
};
priceRange.addEventListener('input',()=>{
    priceValue.textContent=priceRange.value;
    updateProducts();
});
categorySelect.addEventListener('change',updateProducts);
ratingSelect.addEventListener('change',updateProducts);
searchInput.addEventListener('keyup',updateProducts);
inStockCheckbox.addEventListener('change',updateProducts);
displayProducts(products);
