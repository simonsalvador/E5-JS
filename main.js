// Contenedor categorias
const categories = document.querySelector('.container-cards-category');
// Categoria
const categoriesList = document.querySelectorAll('.category');
// Titulo de las cards
const title = document.getElementById('title');
// Contenedor donde se renderiza las cards
const renderFood = document.querySelector('.container-cards-comida');
// Contenedor de las cards (Hoy te recomendamos)
const renderRecom = document.querySelector('.cards-recom');
// Carrito
const cartMenu = document.querySelector(".cart");
// Botón para abrir y cerrar carrito
const cartBtn = document.querySelector(".cart-menu");
// Contenedor del carrito donde se renderizan las cards
const productsCart = document.querySelector('.cart-container');
// Se renderiza precio total (carrito)
const total = document.querySelector('.total');
// Botón comprar (carrito)
const buyBtn = document.querySelector('.btn-buy');
// Vaciar carrito
const deleteBtn = document.querySelector('.btn-delete');
// Botón para abrir y cerrar menú hamburguesa
const barsMenu = document.querySelector(".nav-toggle");
// Menu hamburguesa//
const navMenu = document.querySelector(".nav-menu")
// Botón de cerrar carrito
const closeBtn = document.getElementById('close');
const overlay = document.querySelector('.overlay');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

const saveLocalStorage = (cartList) => {
    localStorage.setItem('cart', JSON.stringify(cartList));
}

const renderCard = (food) => {
    const {name, description, prize, img} = food;
    return `
    <div class="cards-comida">
    <img src="${img}" alt="${name}">
    <h3>${name}</h3>
    <p>${description}</p>
    <div class="precio">
        <span class="color">${prize}</span>
        <button>Agregar</button>
    </div>
    </div>
    `
}

const renderDividedProducts = (index = 0) => {
    renderFood.innerHTML += productsController.dividedProducts[index]
      .map(renderCard) // .map((e) => renderProduct(e))
      .join("");
};

const renderFilteredFood = (category) => {
    const foodList = carta.filter(
      (food) => food.category === category
    );
    renderFood.innerHTML = foodList.map(renderCard).join("");
};

const renderCards = (index = 0, category = undefined) => {
    if (!category) {
      // !undefined === true
      renderDividedProducts(index);
      return;
    }
    renderFilteredFood(category);
};

const changeFilterState = (e) => {
    const selectedCategory = e.target.dataset.category;
    changeBtnActiveState(selectedCategory);
};

const changeBtnActiveState = (selectedCategory) => {
    const categories = [...categoriesList];
    categories.forEach((category) => {
      if (category.dataset.category !== selectedCategory) {
        category.classList.remove("active");
        return;
      }
      category.classList.add("active");
    });
};

const applyFilter = (e) => {
    if (!e.target.classList.contains("category")) return;
    changeFilterState(e);
    if (!e.target.dataset.category) {
      renderFood.innerHTML = "";
      title.innerHTML = 'Los más populares'
      renderCards();
    } else {
      renderCards(0, e.target.dataset.category);
      if (e.target.classList.contains("category")) {
        title.innerHTML = `${e.target.dataset.category}`
      } else if (!e.target.dataset.category) {
        title.innerHTML = '';
      }
    };
};

const renderCardRecom = (food) => {
 const {img, name, description, prize} = food;
  return ` 
  <div class="card">
  <img src="${img}" alt="${name}">
  <div class="card-text">
      <h3>${name}</h3>
      <p>${description}</p>
      <span class="color">${prize}</span>
  </div>
  <button>Agregar</button>
</div>
  `
};

const renderCardsRecom = () => {
   renderRecom.innerHTML += carta.slice(0, 3).map(renderCardRecom)
    .join("");
    // console.log(renderRecom.innerHTML)
};

const toggleMenu = () => {
  navMenu.classList.toggle("nav__menu-visible");
  if (cartMenu.classList.contains("open-cart")) {
    cartMenu.classList.remove("open-cart");
    return;
  }
  overlay.classList.toggle("show-overlay");
};

const toggleCart = () => {
  cartMenu.classList.toggle("open-cart");
  if (navMenu.classList.contains("nav__menu-visible")) {
    navMenu.classList.remove("nav__menu-visible");
    return;
  }
  barsMenu.classList.add("hidden");
  overlay.classList.toggle("show-overlay");
};

const closeOnClick = (e) => {
  if (!e.target.classList.contains("nav-menu-item")) return;
  navMenu.classList.remove("nav__menu-visible");
  overlay.classList.remove("show-overlay");
  barsMenu.classList.remove("hidden");
};

const closeOnClickButton = (e) => {
  if (!e.target.classList.contains('close')) return;
  cartMenu.classList.remove('open-cart');
  overlay.classList.remove('show-overlay');
  barsMenu.classList.remove("hidden");
}

const closeOnOverlayClick = () => {
  navMenu.classList.remove("nav__menu-visible");
  cartMenu.classList.remove("open-cart");
  overlay.classList.remove("show-overlay");
  barsMenu.classList.remove("hidden");

};

const closeOnScroll = () => {
  if (
    !navMenu.classList.contains("nav__menu-visible") &&
    !cartMenu.classList.contains("open-cart")
  )
    return;
  navMenu.classList.remove("nav__menu-visible");
  cartMenu.classList.remove("open-cart");
  overlay.classList.remove("show-overlay");
  barsMenu.classList.remove("hidden");
};

const init = () => {
    renderCardsRecom();
    renderCards();
    categories.addEventListener('click', applyFilter);
    barsMenu.addEventListener('click', toggleMenu);
    cartBtn.addEventListener('click', toggleCart);
    navMenu.addEventListener('click', closeOnClick);
    overlay.addEventListener('click', closeOnOverlayClick);
    window.addEventListener('scroll', closeOnScroll);
    closeBtn.addEventListener('click', closeOnClickButton);
}

init();