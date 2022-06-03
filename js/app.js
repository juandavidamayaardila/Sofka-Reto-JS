import { data } from "../source/preguntas.js";

/**
 * Constante para determinar si hay ganador.
 */
const PUNTAJE_MAXIMO = 100;

const container = document.querySelector("#container");
const txtSuperTitle = document.createElement("h1");
const txtAyuda = document.createElement("h6");
txtAyuda.textContent = "Responda cada pregunta correctamente, sumara 10 puntos," +
    "Para ganar el juego debe acumular 100 puntos; Se pude retirar en cualquier momento con el puntaje" +
    "acumulado hasta ese momento.";

//txtAyuda.classList.add('text-primary','divCenter');
txtSuperTitle.textContent = "QUIEN QUIERE GANAR!!";

container.append(txtSuperTitle);

const divRow = document.createElement("div");
divRow.classList.add("row");

const divPuntuacion = document.createElement("div");
divPuntuacion.classList.add("col-3", 'border', 'divCenter');


const divPregunta = document.createElement("div");
divPregunta.classList.add('col-9', 'border');

const divMainPregunta = document.createElement("div");
const divPreguntaBody = document.createElement("div");
const txtPregunta = document.createElement("h1");


divPreguntaBody.append(txtPregunta);
divPreguntaBody.classList.add('divCenter');
divMainPregunta.append(divPreguntaBody);
divPregunta.append(divMainPregunta);
divRow.append(divPregunta);


const divMainRespuestas = document.createElement("div");
const divMainRespuestaTmp = document.createElement("div");
divMainRespuestaTmp.classList.add('row', 'divRespuesta') //falta agregar el estilo preguntas_1 pregutnar stevent

const divRespuesta1 = document.createElement("div");
divRespuesta1.classList.add('col-6')

const divRespuesta2 = document.createElement("div");
divRespuesta2.classList.add('col-6')

//segundo renglon de respuetas
const divMainRespuestaTmp2 = document.createElement("div");
divMainRespuestaTmp2.classList.add('row', 'divRespuesta') //falta agregar el estilo preguntas_1 pregutnar stevent

const divRespuesta2a = document.createElement("div");
divRespuesta2a.classList.add("col-6")

const divRespuesta2b = document.createElement("div");
divRespuesta2b.classList.add("col-6")

const btnOpcionA = document.createElement("button");
const btnOpcionB = document.createElement("button");
const btnOpcionC = document.createElement("button");
const btnOpcionD = document.createElement("button");

btnOpcionA.classList.add('btn', 'btn-outline-primary', 'btn-lg', 'btnPropia');
btnOpcionB.classList.add('btn', 'btn-outline-success', 'btn-lg', 'btnPropia');
btnOpcionC.classList.add('btn', 'btn-outline-info', 'btn-lg', 'btnPropia');
btnOpcionD.classList.add('btn', 'btn-outline-warning', 'btn-lg', 'btnPropia');

divRespuesta2a.append(btnOpcionC);
divRespuesta2b.append(btnOpcionD);
divRespuesta1.append(btnOpcionA);
divRespuesta2.append(btnOpcionB);

divMainRespuestaTmp2.append(divRespuesta2a, divRespuesta2b);
divMainRespuestaTmp.append(divRespuesta1, divRespuesta2);

divMainRespuestas.append(divMainRespuestaTmp, divMainRespuestaTmp2);
divPregunta.append(divMainRespuestas)

container.appendChild(divRow);
container.append(txtAyuda);

loadQuestions();

/**
 * Creamos el html para cargar la puntuacion
 */
const divMainPuntaje = document.createElement("div");

const divMainPuntajeHead = document.createElement("div");
const pPuntaje = document.createElement("p");
const iUsuario = document.createElement("i");
const SpanUser = document.createElement("span");

iUsuario.classList.add('fa', 'fa-user-circle-o');
SpanUser.classList.add('puntuacion');
pPuntaje.classList.add('puntuacion');

SpanUser.textContent = localStorage.getItem('user');

pPuntaje.textContent = "Su puntaje actual es: " + 0;
localStorage.setItem('puntajeTmp', 0);

const btnFinalizar = document.createElement("button");
const btnReiniciar = document.createElement("button");
btnFinalizar.classList.add('btn', 'btn-outline-danger', 'btnPuntaje');
btnReiniciar.classList.add('btn', 'btn-outline-warning', 'btnReiniciar', 'btnPuntaje');
btnFinalizar.textContent = 'Finalizar Juego';
btnReiniciar.textContent = 'Retirar Juego';

divMainPuntajeHead.append(iUsuario);
divMainPuntajeHead.append(SpanUser);
divMainPuntajeHead.append(pPuntaje);
divMainPuntajeHead.append(btnReiniciar);
divMainPuntajeHead.append(btnFinalizar);
divMainPuntaje.append(divMainPuntajeHead);
divPuntuacion.append(divMainPuntaje);
divRow.append(divPuntuacion);


/**
 * Creamos el html necesario para mostrar una tabla con los jugadores
 * recientes usamos otro contenedor.
 */
const tbHistorialContainer = document.querySelector("#tbHistorial");
const txtSubTitle = document.createElement("h2");
txtSubTitle.textContent = "HISTORIAL JUGADORES!!";
tbHistorialContainer.append(txtSubTitle);

/**
 * Validamos que haya informacion en el localStorange
 * y poder mostrar la informacion correspondiente al usuario
 * y puntaje inicial.
 */
if (localStorage.getItem(localStorage.getItem('user')) === null) {
    localStorage.setItem(localStorage.getItem('user'), '0')
}

/**
 * Obtenemos todas las llaves almacenadas en el localStorange.
 */
const keys = Object.keys(localStorage);

/**
 * Permite obtener los jugadores almacenados en localStorage
 * ordenarlos y mostrarlos en lista.
 */
const getRanking = () => {

    const data = keys.filter(x => x.endsWith('.')).sort((x, y) =>
        localStorage.getItem(y).localeCompare(localStorage.getItem(x))).forEach(x => {
            const txtHistorial = document.createElement("h3");
            txtHistorial.textContent = x + ' : ' + localStorage.getItem(x);
            tbHistorialContainer.append(txtHistorial);
        });

}


getRanking();


/**
 * Permite cargar las respuetas en distinto orden,
 * dependiendo de un numero aleatario que generamos 
 * cada vez.
 * 
 * @param {int} index indice de la pregunta que se va a mostrar.
 */
function loadAnswersTmp(index) {
    const indexAnswers = Math.floor(Math.random() * (4 + 1));
    switch (indexAnswers) {
        case 1:
            txtPregunta.textContent = data[index].pregunta;
            btnOpcionA.textContent = data[index].respuestaFalse2;
            btnOpcionB.textContent = data[index].respuestaTrue;
            btnOpcionC.textContent = data[index].respuestaFalse3;
            btnOpcionD.textContent = data[index].respuestaFalse1;
            break;
        case 2:
            txtPregunta.textContent = data[index].pregunta;
            btnOpcionA.textContent = data[index].respuestaFalse2;
            btnOpcionB.textContent = data[index].respuestaFalse1;
            btnOpcionC.textContent = data[index].respuestaFalse3;
            btnOpcionD.textContent = data[index].respuestaTrue;
            break;
        case 3:
            txtPregunta.textContent = data[index].pregunta;
            btnOpcionA.textContent = data[index].respuestaTrue;
            btnOpcionB.textContent = data[index].respuestaFalse1;
            btnOpcionC.textContent = data[index].respuestaFalse2;
            btnOpcionD.textContent = data[index].respuestaFalse3;
            break;
        case 4:
            txtPregunta.textContent = data[index].pregunta;
            btnOpcionA.textContent = data[index].respuestaFalse2;
            btnOpcionB.textContent = data[index].respuestaFalse1;
            btnOpcionC.textContent = data[index].respuestaTrue;
            btnOpcionD.textContent = data[index].respuestaFalse3;
            break;
        default:
            txtPregunta.textContent = data[index].pregunta;
            btnOpcionA.textContent = data[index].respuestaFalse2;
            btnOpcionB.textContent = data[index].respuestaFalse1;
            btnOpcionC.textContent = data[index].respuestaFalse3;
            btnOpcionD.textContent = data[index].respuestaTrue;
            break;
    }
}

/**
 * Permite cargar las preguntas y las respuestas,
 * usamos el switch para cargar las respuestas aleatoriamente.
 */
function loadQuestions() {

    const index = Math.floor(Math.random() * (data.length - 1 - 0 + 1));
    localStorage.setItem('indexPregunta', index);

    loadAnswersTmp(index);

}

/**
 * Evento del boton A opcion de respueta
 * validamos si es correcta o no, validamos si 
 * llego al puntaje maximo que es 100 para declaralo ganador
 */
btnOpcionA.addEventListener('click', (e) => {
    if (validateAnswer(localStorage.getItem('indexPregunta'), btnOpcionA.textContent)) {
        alert('Respuesta correcta!!!!');
        sumPuntaje();
        validateWin()
    } else {
        alert('Respuesta Incorrecta!!!!');
        finalizarJuego(1);
    }

});

/**
 * Evento del boton B opcion de respueta
 * validamos si es correcta o no, validamos si 
 * llego al puntaje maximo que es 100 para declaralo ganador
 */
btnOpcionB.addEventListener('click', (e) => {
    if (validateAnswer(localStorage.getItem('indexPregunta'), btnOpcionB.textContent)) {
        alert('Respuesta correcta!!!!');
        sumPuntaje();
        validateWin();
    } else {
        alert('Respuesta Incorrecta!!!!');
        finalizarJuego(1);
    }

});

/**
 * Evento del boton C opcion de respueta
 * validamos si es correcta o no, validamos si 
 * llego al puntaje maximo que es 100 para declaralo ganador
 */
btnOpcionC.addEventListener('click', (e) => {
    if (validateAnswer(localStorage.getItem('indexPregunta'), btnOpcionC.textContent)) {
        alert('Respuesta correcta!!!!');
        sumPuntaje();
        validateWin();
    } else {
        alert('Respuesta Incorrecta!!!!');
        finalizarJuego(1);
    }

});

/**
 * Evento del boton D opcion de respueta
 * validamos si es correcta o no, validamos si 
 * llego al puntaje maximo que es 100 para declaralo ganador
 */
btnOpcionD.addEventListener('click', async (e) => {

    if (validateAnswer(localStorage.getItem('indexPregunta'), btnOpcionD.textContent)) {
        alert('Respuesta correcta!!!!');
        sumPuntaje();
        validateWin();

    } else {
        alert('Respuesta Incorrecta!!!!');
        finalizarJuego(1);
    }
});

/**
 * Evento del boton finalizar, direcciona 
 * al index del sitio.
 */
btnFinalizar.addEventListener('click', (e) => {

    window.location.href = "index.html";

});

/**
 * Evento del boton reiniciar, guardamos en en localStorage el puntaje
 * y recagamos la pagina.
 */
btnReiniciar.addEventListener('click', (e) => {
    localStorage.setItem(localStorage.getItem('user'), localStorage.getItem('puntajeTmp'));
    window.location.reload();

});


/**
 * Sumamos el puntaje si la pregunta fue correcta.
 */
export const sumPuntaje = () => {
    localStorage.setItem('puntajeTmp', parseInt(localStorage.getItem('puntajeTmp')) + 10);
    pPuntaje.textContent = "Su puntuación es: " + localStorage.getItem('puntajeTmp');

    loadQuestions();
}


/**
 * Validamos si la respuesta seleccionada es la correcta.
 * 
 * @param {int} indexPregunta index para buscar la pregunta dentro del arreglo
 * @param {String} answer  respuesta seleccionada por el usuario
 * @returns true o false si la respuesta fue correcta.
 */
export const validateAnswer = (indexPregunta, answer) => {
    return data[indexPregunta].respuestaTrue === answer;
}



/**
 * Finalizar juego cuando el usuario gana o pierde, se invoca este 
 * metodo, se guarda el historial en el localStorange y se recarga
 * la pagina.
 */
export const finalizarJuego = (puntaje = 0) => {
    if (puntaje === 0) {
        pPuntaje.textContent = "Su puntuación es: " + localStorage.getItem('puntajeTmp');
        localStorage.setItem(localStorage.getItem('user'), localStorage.getItem('puntajeTmp'));

        window.location.reload();
    } else {
        pPuntaje.textContent = "Su puntuación es: " + 0;
        localStorage.setItem(localStorage.getItem('user'), 0);
        window.location.reload();
    }

}

/**
 * validamos si ha llegado al puntaje maximo 
 * 
 * @returns true o false si hay un ganador
 */
export function validateWin() {
    return new Promise(() => {

        if (parseInt(localStorage.getItem('puntajeTmp')) === PUNTAJE_MAXIMO) {
            alert('Felicidades has ganado!!!');
            finalizarJuego();
        }

    });
}
