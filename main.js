const categories = document.querySelector('.container-cards-category');
const categoriesList = document.querySelectorAll('.category');
const renderFood = document.querySelector('.container-cards-comida');

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
    console.log(carta)
    console.log(foodList)
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
    console.log(e.dataset)
    if (!e.target.classList.contains("category")) return;
    changeFilterState(e);
    if (!e.target.dataset.category) {
      renderFood.innerHTML = "";
      renderFilteredFood();
    } else {
      renderFilteredFood(0, e.target.dataset.category);
    }
};

const init = () => {
    renderFilteredFood();
    categories.addEventListener('click', applyFilter);
}

init();