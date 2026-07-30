const categories = [
    "All",
    "Special Foods",
    "Mexican",
    "Italian",
    "Japanese",
    "Drinks"
];

const menufoods = [

    {
        name: "Mexican Rice",
        image: "images/Mexican Rice.png",
        price: 18,
        rating: 5,
        description: "Mexican Special",
        category: "Mexican"
    },
    {
        name: "Veg Thali",
        image: "images/vegThali.png",
        price: 20,
        rating: 4,
        description: "Healthy Lunch",
        category: "Special Foods"
    },
    {
        name: "Enchiladas",
        image: "images/Enchiladas.png",
        price: 22,
        rating: 4,
        description: "Mexican Special",
        category: "Mexican"
    },
    {
        name: "Nachos",
        image: "images/Nachos.png",
        price: 16,
        rating: 4,
        description: "Crispy & Cheesy",
        category: "Mexican"
    },
    {
        name: "Lasagna",
        image: "images/Lasagna.png",
        price: 28,
        rating: 5,
        description: "Italian Classic",
        category: "Italian"
    },
    {
        name: "Pepperoni Pizza",
        image: "images/pepperoniPizza.png",
        price: 32,
        rating: 5,
        description: "Italian Classic",
        category: "Italian"
    },
    {
        name: "Penne Pasta",
        image: "images/pasta.png",
        price: 24,
        rating: 4,
        description: "Creamy & Tasty",
        category: "Italian"
    },
    {
        name: "Chicken Biryani",
        image: "images/chickenBiryani.png",
        price: 34,
        rating: 5,
        description: "Famous for All Restaurant",
        category: "Special Foods"
    },
    {
        name: "Platter",
        image: "images/platter.png",
        price: 34,
        rating: 5,
        description: "Famous for All Restaurant",
        category: "Special Foods"
    },
    {
        name: "Chocolate Lava Cake",
        image: "images/ChocolateLavaCake.png",
        price: 38,
        rating: 5,
        description: "Famous for All Restaurant",
        category: "Special Foods"
    },
    {
        name: "Chocolate Shake",
        image: "images/chocolateShake.png",
        price: 14,
        rating: 5,
        description: "Rich Chocolate Flavor",
        category: "Drinks"
    },
    {
        name: "Sushi Rolls",
        image: "images/sushiRolls.png",
        price: 36,
        rating: 5,
        description: "Japanese Favorite",
        category: "Japanese"
    },
    {
        name: "Ramen",
        image: "images/ramen.png",
        price: 26,
        rating: 5,
        description: "Hot Japanese Noodles",
        category: "Japanese"
    },
    {
        name: "Mojito",
        image: "images/mojito.png",
        price: 12,
        rating: 4,
        description: "Fresh & Cool",
        category: "Drinks"
    },
    {
        name: "Paneer Biryani",
        image: "images/paneerBiryani.png",
        price: 30,
        rating: 4,
        description: "Famous for All Restaurant",
        category: "Special Foods"
    },
    {
        name: "Grilled Fish",
        image: "images/fish.png",
        price: 42,
        rating: 4,
        description: "Fresh & Delicious",
        category: "Special Foods"
    },
    {
        name: "Noodles",
        image: "images/Noodles.png",
        price: 24,
        rating: 4,
        description: "Creamy & Tasty",
        category: "Italian"
    },
    {
        name: "Dark Coffee",
        image: "images/drink.png",
        price: 12,
        rating: 4,
        description: "Fresh & Cool",
        category: "Drinks"
    }
];

const filterTabs = document.querySelector("#filterTabs");
const searchInput = document.querySelector("#searchInput");
const filterGrid = document.querySelector("#filterGrid");
const cartIcon = document.querySelector("#cartIcon");
const sidebar = document.querySelector("#sidebar");
const totalPrice = document.querySelector("#totalPrice");
const cartContent = document.querySelector("#cartContent");
const sidebarFooter = document.querySelector("#sidebarFooter");
const cartBadge = document.querySelector("#cartBadge");
const cartMessage = document.querySelector("#cartMessage");

cartIcon.addEventListener("click", toggleCart);
closeBtn.addEventListener("click", toggleCart);

function toggleCart() {
    sidebar.classList.toggle("open");
}

let activeCategory = "all";

let cart = [];

function renderCards() {

    filterGrid.innerHTML = '';

    const searchText = searchInput.value.toLocaleLowerCase();

    const filteredProducts = menufoods.filter(product => {

        const matchesCategory = activeCategory === "all" || activeCategory === product.category.toLocaleLowerCase();

        const matchesSearch = product.name.toLocaleLowerCase().includes(searchText);

        return matchesCategory && matchesSearch;
    });

    filteredProducts.forEach(product => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
               <div class="image-section">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="content">
                    <h2>${product.name}</h2>
                    <div class="rating">
                        ${'<i class="fa-solid fa-star"></i>'.repeat(product.rating)}
                    </div>
                    <p class="para">${product.description}</p>
                    <div class="price-box">
                        <span class="price">$${product.price}</span>
                        <button class="addbtn">Add To Cart</button>
                    </div>
                </div>
        `;
        const addBtn = card.querySelector(".addbtn");

        addBtn.addEventListener("click", () => {
            addToCart(product);
        })

        filterGrid.append(card);
    })
}

function addToCart(product) {
    const existingItem = cart.find(item => item.name.toLocaleLowerCase() === product.name.toLocaleLowerCase());

    if (existingItem) {
        existingItem.quantity++;
    }
    else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
    handleMessage("Food Added To Cart","green");
    
}

function updateCart() {

    cartContent.innerHTML = ``;

    cartBadge.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    if(cart.length === 0){
        cartContent.innerHTML = ' <div class="empty-cart">Your cart is empty</div>';
        sidebarFooter.style.display = "none";
        return;
    }

    let total = 0;

    cart.forEach((product, index) => {
        total += product.price * product.quantity;
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.setAttribute("data-index", index);

        cartItem.innerHTML = `
        <div class="cart-item-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="cart-item-details">
            <h3 class="cart-item-name">${product.name}</h3>
            <p class="cart-item-price">$${product.price}</p>
        <div class="quantity-controls">
            <button class="qty-btn decrease-btn">-</button>
            <div class="quantity">${product.quantity}</div>
            <button class="qty-btn increase-btn">+</button>
        </div>
         </div>
        <button class="remove-btn">&times;</button>`;

        cartContent.append(cartItem);
    });
    totalPrice.textContent = `$${total.toFixed(2)}`;
    sidebarFooter.style.display = "block";
}


function renderCategories() {
    categories.forEach(category => {
        const button = document.createElement("button");
        button.className = "tab";
        button.setAttribute("data-category", category.toLocaleLowerCase());
        button.innerText = category;

        if (button.dataset.category === "all") {
            button.classList.add("active");
        }

        filterTabs.append(button);
    });

    const buttons = document.querySelectorAll(".tab");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {

            activeCategory = btn.dataset.category;

            buttons.forEach(btn => btn.classList.remove("active"));

            btn.classList.add("active");
            renderCards();
        })
    })
}

cartContent.addEventListener("click", (e)=>{

    const itemDiv = e.target.closest(".cart-item");
    if(!itemDiv) return;

    const index = Number(itemDiv.dataset.index);
    
    if(e.target.classList.contains("increase-btn")){
        cart[index].quantity++;
    }

    if(e.target.classList.contains("decrease-btn")){
        if(cart[index].quantity > 1){
            cart[index].quantity--;
        }
        else{
            cart.splice(index, 1);
            handleMessage("Product removed from Cart", "red");
        }
    }

    if(e.target.classList.contains("remove-btn")){
        cart.splice(index, 1);
        handleMessage("Product removed from Cart", "red");
    }

    updateCart();
})


function handleMessage(message, color){
    cartMessage.classList.add("show");
    cartMessage.textContent = message;
    cartMessage.style.backgroundColor = color;

    setTimeout(()=>{
        cartMessage.classList.remove("show");
    }, 1200)
}

searchInput.addEventListener("input", renderCards);

renderCategories();
renderCards();
updateCart();