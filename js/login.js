const container = document.querySelector("#container");

const divRow = document.createElement("div");
divRow.classList.add('divCenter');
const txtSuperTitle = document.createElement("h1");
txtSuperTitle.textContent = "Bienvenido a Quien quiere ganar!!";
const txtTitle = document.createElement("span");
txtTitle.textContent = "Nombre de usuario completo!!!";

const inputUser = document.createElement("input");
inputUser.classList.add('form-control', 'inputIdex');
inputUser.setAttribute("placeholder", "Ingrese su nombre completo");
inputUser.textContent = '';

const btnIngresar = document.createElement("button");
btnIngresar.classList.add('btn', 'btn-success', 'btnIndex');
btnIngresar.textContent = "Ingresar";

divRow.append(txtSuperTitle, txtTitle, inputUser, btnIngresar);

container.append(divRow);

/**
 * Evento del boton ingresar, validamos si el campo no esta vacio,
 * y direccionamos a la siguiente pagina.
 */
btnIngresar.addEventListener('click', (e) => {
    console.log(inputUser.value);
    if (inputUser.value === "") {
        alert('Por favor ingrese el nombre del jugador');
    } else {
        localStorage.setItem('user', inputUser.value+'.');
        localStorage.setItem('puntajeTmp', '0');
        window.location.href = "home.html";
    }

});