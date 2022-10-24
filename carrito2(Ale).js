const renderCartProduct = (cartProduct) => {
  const { id, name, description, prize, img, quantity } = cartProduct;
  return `    
      <div class="cart-card">
            <img src="${img}" alt="${name}">
            <div class="cart-info">
                <h3>${name}</h3>
                <p>${description}</p>
                <span class="color">${prize}</span>
            </div>
            <div class="buttons">
                <span class="quantity-handler down" data-id=${id}><div class="menos"></div></span>
                <span class="item-quantity">${quantity}</span>
                <span class="quantity-handler up" data-id=${id}>+</span>
            </div>
        </div>`;
};

const renderCart = () => {
  if (!cart.length) {
    productsCart.innerHTML = `<p class="empty-msg"> No hay productos en el carrito. </p>`;
    return;
  }
  productsCart.innerHTML = cart.map(renderCartProduct).join('');
};

const getCartTotal = () => {
  return cart.reduce(
    (acc, cur) => acc + Number(cur.prize) * Number(cur.quantity),
    0
  );
};

const showTotal = () => {
  total.innerHTML = `$${getCartTotal().toFixed(2)}`;
  subTotal.innerHTML = `$${getCartTotal().toFixed(2)}`;
};

const disableBtn = (btn) => {
  if (!cart.length) {
    btn.classList.add('disabled');
    return;
  }
  btn.classList.remove('disabled');
};

// Funcion para manipular el añadido de productos

const addUnitToProduct = (product) => {
  cart = cart.map((cartProduct) => {
    return cartProduct.id === product.id
      ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
      : cartProduct;
  });
};

const createCartProduct = (product) => {
  cart = [...cart, { ...product, quantity: 1 }];
};

const isExistingCartProduct = (product) => {
  return cart.find((item) => item.id === product.id);
};

const createProductData = (id, name, description, prize, img) => {
  return { id, name, description, prize, img };
};

const checkCartState = () => {
  saveLocalStorage(cart);
  renderCart(cart);
  showTotal(cart);
  disableBtn(buyBtn);
  disableBtn(deleteBtn);
};

const showSuccessModal = (msg) => {
  showSuccesModal.classList.add('active-modal');
  showSuccesModal.textContent = msg;
  setTimeout(() => {
    showSuccesModal.classList.remove('active-modal');
  }, 1500);
};

const addProduct = (e) => {
  if (!e.target.classList.contains('btn-add')) return;
  const { id, name, description, prize, img } = e.target.dataset;

  const product = createProductData(id, name, description, prize, img);
  if (isExistingCartProduct(product)) {
    addUnitToProduct(product);
    showSuccessModal('Se agregó una unidad del producto al carrito');
  } else {
    createCartProduct(product);
    showSuccessModal('El producto se ha agregado al carrito');
  }
  checkCartState();
};

const substractProductUnit = (existingProduct) => {
  cart = cart.map((cartProduct) => {
    return cartProduct.id === existingProduct.id
      ? { ...cartProduct, quantity: cartProduct.quantity - 1 }
      : cartProduct;
  });
};

const removeProductFromCart = (existingProduct) => {
  cart = cart.filter((product) => product.id !== existingProduct.id);
  checkCartState();
};

const handleMinusBtnEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id);

  if (existingCartProduct.quantity === 1) {
    if (window.confirm('¿Desea Eliminar el producto del carrito?')) {
      removeProductFromCart(existingCartProduct);
    }
    return;
  }
  substractProductUnit(existingCartProduct);
};

const handlePlusBtnEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id);
  addUnitToProduct(existingCartProduct);
};

const handleQuantity = (e) => {
  if (e.target.classList.contains('down')) {
    handleMinusBtnEvent(e.target.dataset.id);
  } else if (e.target.classList.contains('up')) {
    handlePlusBtnEvent(e.target.dataset.id);
  }
  checkCartState();
};

const resetCartItems = () => {
  cart = [];
  checkCartState();
};

const completeCartAction = (confirmMsg, successMsg) => {
  if (!cart.length) return;
  if (window.confirm(confirmMsg)) {
    resetCartItems();
    alert(successMsg);
  }
};
//
//
const completeBuy = () => {
  completeCartAction(
    '¿Desea completar su compra?',
    'La compra se ha realizado correctamente'
  );
};

const deleteCart = () => {
  completeCartAction(
    '¿Está seguro de que desea vaciar el carrito?',
    'No hay productos en el carrito'
  );
};