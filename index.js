let btnEncriptar = document.getElementById("btn-encriptar");
let btnDesencriptar = document.getElementById("btn-desencriptar");
let alerta = document.getElementById("alerta");
let outputDefault = document.getElementById("grap-content-default");
let outputMensaje = document.getElementById("grap-content-output");
let outputTexto = document.getElementById("mensaje-output");
var textoEncriptado = "";
let btnCopiar = document.getElementById("btn-copiar");
//Manipulación de css --------------------
let col2 = document.getElementById("col-2");
let col2Contenido = document.getElementById("col-2-content");
let resizeFlag = false;

function validarTexto(inputTexto) {
    let verificarMayusculasAcentos = /[A-ZÁÉÍÓÚÜ]/.test(inputTexto);
    let verificarMinusculasAcentos = /[áéíóúü]/.test(inputTexto);

    if (verificarMayusculasAcentos || verificarMinusculasAcentos) {
        alerta.style.animation = "aumentarReducirEscala 0.5s 2";
        alerta.addEventListener("animationend", function () {
            alerta.style.animation = "";
        }, { once: true });
        return false;
    }

    return true;
}

function encriptarTexto() {
    let inputTexto = document.getElementById("input-texto").value;
    if (!validarTexto(inputTexto) || inputTexto == "") {
        outputTexto.innerHTML = "";
        outputDefault.style.display = "flex";
        outputMensaje.style.display = "none";
        resizeFlag = false;
        redimensionarAreaOutput();
    } else {
        let textoResultante = inputTexto.replace(/e/g, "enter")
            .replace(/i/g, "imes")
            .replace(/a/g, "ai")
            .replace(/o/g, "ober")
            .replace(/u/g, "ufat");
        outputTexto.innerHTML = textoResultante;
        textoEncriptado = textoResultante;
        outputDefault.style.display = "none";
        outputMensaje.style.display = "flex";
        resizeFlag = true;
        redimensionarAreaOutput();
    }

}

function desencriptarTexto() {
    let inputTexto = document.getElementById("input-texto").value;
    if (!validarTexto(inputTexto) || inputTexto == "") {
        outputTexto.innerHTML = "";
        outputDefault.style.display = "flex";
        outputMensaje.style.display = "none";
        resizeFlag = false;
        redimensionarAreaOutput();
    } else {
        let textoResultante = inputTexto.replace(/enter/g, "e")
            .replace(/imes/g, "i")
            .replace(/ai/g, "a")
            .replace(/ober/g, "o")
            .replace(/ufat/g, "u");
        outputTexto.innerHTML = textoResultante;
        textoEncriptado = textoResultante;
        outputDefault.style.display = "none";
        outputMensaje.style.display = "flex";
        resizeFlag = true;
        redimensionarAreaOutput();
    }
}

function redimensionarAreaOutput() {
    let anchoPantalla = window.innerWidth;
    if (anchoPantalla <= 768 && anchoPantalla > 376 && resizeFlag) {
        col2.classList.add("redimensionarCol2-max768");
        col2Contenido.classList.add("redimensionarCol2Contenido-max768");
        col2.classList.remove("redimensionarCol2-max376");
        col2Contenido.classList.remove("redimensionarCol2Contenido-max376");
    } else if (anchoPantalla <= 376 && resizeFlag) {
        col2.classList.add("redimensionarCol2-max376");
        col2Contenido.classList.add("redimensionarCol2Contenido-max376");
        col2.classList.remove("redimensionarCol2-max768");
        col2Contenido.classList.remove("redimensionarCol2Contenido-max768");
    } else {
        col2.classList.remove("redimensionarCol2-max768");
        col2Contenido.classList.remove("redimensionarCol2Contenido-max768");
        col2.classList.remove("redimensionarCol2-max376");
        col2Contenido.classList.remove("redimensionarCol2Contenido-max376");
    }
}

function copiarTexto() {
    let texto = document.getElementById("mensaje-output").innerHTML;
    navigator.clipboard.writeText(texto)
        .then(() => {
            console.log('Texto copiado al portapapeles');
        })
        .catch((err) => {
            console.error('Error al copiar el texto: ', err);
        });
}

btnEncriptar.addEventListener("click", encriptarTexto);
btnDesencriptar.addEventListener("click", desencriptarTexto);
btnCopiar.addEventListener("click", copiarTexto);
window.addEventListener("resize", redimensionarAreaOutput);

