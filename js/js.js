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
let activeCategory = "all";


function renderCards(){

    filterGrid.innerHTML = '';

    const searchText = searchInput.value.toLocaleLowerCase();

    const filteredProducts = menufoods.filter(product=>{

        const matchesCategory = activeCategory === "all" || activeCategory === product.category.toLocaleLowerCase();

        const matchesSearch = product.name.toLocaleLowerCase().includes(searchText);

        return matchesCategory && matchesSearch;
    });

    filteredProducts.forEach(product=>{
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
        filterGrid.append(card);
    })
}


function renderCategories(){
    categories.forEach(category=>{
        const button = document.createElement("button");
        button.className = "tab";
        button.setAttribute("data-category", category.toLocaleLowerCase());
        button.innerText = category;

        if(button.dataset.category === "all"){
            button.classList.add("active");
        }

        filterTabs.append(button);
    });

    const buttons = document.querySelectorAll(".tab");

    buttons.forEach(btn=>{
        btn.addEventListener("click", ()=>{

            activeCategory = btn.dataset.category;

            buttons.forEach(btn => btn.classList.remove("active"));

            btn.classList.add("active");
            renderCards();
        })
    })
}

searchInput.addEventListener("input", renderCards);

renderCategories();
renderCards();