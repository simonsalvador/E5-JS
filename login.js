const form = document.getElementById("form");
const nameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");
const phoneInput = document.getElementById("phone");


const checkUsername = () => {
  let valid = false;
  const min = 3;
  const max = 25;
  const username = nameInput.value.trim();
  
  if(isEmpty(username)){
    showError(nameInput, "Nombre es obligatorio") 
  } else if(!isBetween(username.length, min, max)) {
    showError(nameInput, `Nombre debe tener entre ${min} y ${max} caracteres`)
  } else {
    showSuccess(nameInput); 
    valid = true;
  }
  return valid
}

const checkEmail = () => {
  let valid = false;
  const emailValue = emailInput.value.trim();
  if(isEmpty(emailValue)){
    showError(emailInput, 'Email es obligatorio');
  } else if(!isEmailValid(emailValue)){ 
    showError(emailInput, 'El email no es valido');
  } else {
    showSuccess(emailInput); 
    valid = true;
  }
  return valid
}

const checkPassword = () => {
  let valid = false;
  const password = passInput.value.trim();
  if(isEmpty(password)){
    showError(passInput, 'La contraseña es obligatoria')
  } else if(!isPassValid(password)){
    showError(passInput, 'La contraseña debe contener al menos 8 caracteres, una mayuscula, una minuscula y un caracter especial')
  } else {
    showSuccess(passInput);
    valid = true;
  }
  return valid;
}

const checkPhone = () => {
  let valid = false;
  const phoneValue = phoneInput.value.trim();
  if(!isPhoneValid(phoneValue)) {
    showError(phoneInput, 'El telefono ingresado es invalido')
  } else {
    showSuccess(phoneInput);
    valid = true;
  }
  return valid
}

const isEmailValid = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  
  return re.test(email)
}

const isPassValid = (pass) => {
  const re =  /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  return re.test(pass)
}

const isPhoneValid = (phone) => {
  const re = /^[0-9]{10}$/;
  return re.test(phone)
}




const isEmpty = (value) => value === "";
const isBetween = (length, min, max) => length < min || length > max ? false : true;
const showError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.remove("success")
  formField.classList.add("error")
  const error = formField.querySelector("small");
  error.textContent = message;
}
const showSuccess = (input) => {
  const formField = input.parentElement;
  formField.classList.remove("error")
  formField.classList.add("success")
  const error = formField.querySelector("small");
  error.textContent = "";
}


form.addEventListener("submit", (e) => {
  e.preventDefault();

  let isUsernameValid = checkUsername();
  let isEmailValid = checkEmail();
  let isPasswordValid = checkPassword();
  let isPhoneValid = checkPhone();

  console.log('isUsernameValid ==>',isUsernameValid)
  console.log('isEmailValid ==>',isEmailValid)
  console.log('isPasswordValid ==>',isPasswordValid)
  console.log('isPhoneValid ==>',isPhoneValid)

  let isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isPhoneValid;

  if(isFormValid){
    form.submit();
  }
})

const debounce = (fn, delay = 1000) => {
  let timeoutId;
  return(...args) => {
    if(timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

form.addEventListener(
  "input",
  debounce((e) => {
    switch (e.target.id){
      case 'username':
        checkUsername();
        break;
      case 'email':
        checkEmail();
        break;
      case 'password':
        checkPassword();
        break;
      case 'phone':
        checkPhone();
        break;
    }
  })
)

const user = {
  id: 1,
  username: 'username.value',
  password: '.value',
  email: '.value',
  phone: ''
}

const arrUsers = [1,2,3,4,];

 checkUsername();