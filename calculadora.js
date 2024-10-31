import { botones } from "./botones.js";

const pantalla = document.getElementById("pantalla");
const botonera = document.getElementById("botonera");

const LIMITE_CARACTERES = 30; // Establecer el límite de caracteres

let valorEnPantalla = "";
let enRadianes = true;
let modoCientifico = true;
let historial = [];
let indiceHistorial = -1;

// Crear los botones de la calculadora dinámicamente
botones.forEach((boton) => {
  const buttonElement = document.createElement("button");
  buttonElement.textContent = boton.text;
  buttonElement.classList.add(boton.type);

  buttonElement.addEventListener("click", () =>
    manejarClick(boton.text, boton.type)
  );

  botonera.appendChild(buttonElement);
});

function manejarClick(texto, tipo) {
  switch (tipo) {
    case "clear":
      valorEnPantalla = "";
      indiceHistorial = historial.length;
      break;
    case "equals":
      try {
        const resultado = evaluarExpresion(valorEnPantalla);
        historial.push(valorEnPantalla);
        indiceHistorial = historial.length;
        valorEnPantalla = String(resultado); // Convertir resultado a string
      } catch (e) {
        valorEnPantalla = "Error"; // Manejar errores
      }
      break;
    case "sqrt":
      valorEnPantalla += "√";
      break;
    case "log":
      valorEnPantalla += "log(";
      break;
    case "ln":
      valorEnPantalla += "ln(";
      break;
    case "sin":
      valorEnPantalla += "sin(";
      break;
    case "cos":
      valorEnPantalla += "cos(";
      break;
    case "tan":
      valorEnPantalla += "tan(";
      break;
    case "asin":
      valorEnPantalla += "asin(";
      break;
    case "acos":
      valorEnPantalla += "acos(";
      break;
    case "atan":
      valorEnPantalla += "atan(";
      break;
    case "power":
      valorEnPantalla += "**";
      break;
    case "square":
      valorEnPantalla += "**2";
      break;
    case "e":
      valorEnPantalla += Math.E;
      break;
    case "tenPower":
      valorEnPantalla += "10**";
      break;
    case "exp":
      valorEnPantalla += "exp(";
      break;
    case "pi":
      valorEnPantalla += Math.PI;
      break;
    case "doubleZero":
      valorEnPantalla += "00";
      break;
    case "percent":
      try {
        const expresionConvertida = valorEnPantalla;
        valorEnPantalla = eval(expresionConvertida) / 100;
      } catch {
        valorEnPantalla = "Error";
      }
      break;
    case "openParen":
      valorEnPantalla += "(";
      break;
    case "closeParen":
      valorEnPantalla += ")";
      break;
    case "backspace":
      valorEnPantalla = valorEnPantalla.slice(0, -1);
      break;
    case "toggleAngle":
      enRadianes = !enRadianes;
      pantalla.textContent = `${enRadianes ? "Rad" : "Deg"}`;
      return;
    case "modeToggle":
      modoCientifico = !modoCientifico;
      actualizarModo();
      return;
    case "factorial":
      valorEnPantalla += "!";
      break;
    default:
      if (valorEnPantalla.length < LIMITE_CARACTERES) {
        valorEnPantalla += texto;
      }
      break;
  }

  pantalla.textContent = valorEnPantalla;
}

// Función para evaluar expresiones matemáticas con soporte para funciones
function evaluarExpresion(exp) {
  exp = exp
    .replace(/√\((.*?)\)/g, "Math.sqrt($1)")
    .replace(/√(\d+(\.\d+)?)/g, "Math.sqrt($1)")
    .replace(/log\((.*?)\)/g, "Math.log10($1)")
    .replace(/ln\((.*?)\)/g, "Math.log($1)")
    .replace(
      /sin\((.*?)\)/g,
      enRadianes ? "Math.sin($1)" : "Math.sin($1 * Math.PI / 180)"
    )
    .replace(
      /cos\((.*?)\)/g,
      enRadianes ? "Math.cos($1)" : "Math.cos($1 * Math.PI / 180)"
    )
    .replace(
      /tan\((.*?)\)/g,
      enRadianes ? "Math.tan($1)" : "Math.tan($1 * Math.PI / 180)"
    )
    .replace(
      /asin\((.*?)\)/g,
      enRadianes ? "Math.asin($1)" : "Math.asin($1) * (180 / Math.PI)"
    )
    .replace(
      /acos\((.*?)\)/g,
      enRadianes ? "Math.acos($1)" : "Math.acos($1) * (180 / Math.PI)"
    )
    .replace(
      /atan\((.*?)\)/g,
      enRadianes ? "Math.atan($1)" : "Math.atan($1) * (180 / Math.PI)"
    )
    .replace(/pi/g, "Math.PI")
    .replace(/e/g, "Math.E")
    .replace(/(\d+(\.\d+)?)%/g, "($1/100)")
    .replace(/\(([^()]+)\)%/g, "(($1)/100)")
    .replace(/(\d+)!/g, (_, num) => factorial(parseInt(num))) // Calcular factorial
    .replace(/\((.*?)\)!/g, (_, num) => factorial(parseInt(num))); // Calcular factorial
  return Function(`"use strict"; return (${exp})`)();

}

function factorial(n){
  return n <= 1 ? 1 : n * factorial(n-1);
}

// Función para alternar los botones del modo científico
function actualizarModo() {
  const botonesCientificos = [
    "sqrt",
    "log",
    "ln",
    "sin",
    "cos",
    "tan",
    "asin",
    "acos",
    "atan",
    "power",
    "square",
    "e",
    "tenPower",
    "exp",
    "pi",
    "factorial",
    "openParen",
    "closeParen",
    "trig",
    "toggleAngle",
    "doubleZero",
  ];

  botones.forEach((boton) => {
    const buttonElement = document.querySelector(`button.${boton.type}`);
    if (botonesCientificos.includes(boton.type)) {
      buttonElement.style.display = modoCientifico ? "block" : "none";
    }
  });

  const modoToggleButton = document.querySelector(`button.modeToggle`);
  modoToggleButton.textContent = modoCientifico ? "Normal" : "Científica";
}

// Mapeo de teclas a botones de la calculadora
const teclaMapeo = {
  0: "0",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  "+": "+",
  "-": "-",
  "*": "*",
  "/": "/",
  ".": ".",
  Enter: "equals",
  Backspace: "backspace",
  Escape: "clear",
  Tab: "modeToggle",
  ArrowUp: "historyUp",
  ArrowDown: "historyDown",
  ")": ")",
  "(": "(",
  "%": "%",
  "!": "!"
};

document.addEventListener("keydown", (event) => {
  const tecla = teclaMapeo[event.key];
  if (tecla) {
    if (tecla === "equals") manejarClick("", "equals");
    else if (tecla === "clear") manejarClick("", "clear");
    else if (tecla === "backspace") manejarClick("", "backspace");
    else if (tecla === "modeToggle") manejarClick("", "modeToggle");
    else if (["historyUp", "historyDown"].includes(tecla)) {
      manejarHistorial(tecla);
    } else manejarClick(tecla, "number");
    event.preventDefault();
  }
});

// Función para manejar navegación en el historial
function manejarHistorial(tecla) {
  if (tecla === "historyUp" && indiceHistorial > 0) {
    indiceHistorial--;
    valorEnPantalla = historial[indiceHistorial];
  } else if (tecla === "historyDown") {
    if (indiceHistorial < historial.length - 1) {
      indiceHistorial++;
      valorEnPantalla = historial[indiceHistorial];
    } else {
      valorEnPantalla = "";
      indiceHistorial = historial.length;
    }
  }
  pantalla.textContent = valorEnPantalla;
}
