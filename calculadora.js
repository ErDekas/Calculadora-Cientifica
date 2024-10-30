import { botones } from "./botones.js";

const pantalla = document.getElementById("pantalla");
const botonera = document.getElementById("botonera");

const LIMITE_CARACTERES = 30; // Establecer el límite de caracteres

let valorEnPantalla = "";
let enRadianes = true;
let modoCientifico = true;
let botonSeleccionado = 0;

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
      break;
    case "equals":
      try {
        // Evaluar la expresión y obtener el resultado
        const resultado = evaluarExpresion(valorEnPantalla);
        valorEnPantalla = String(resultado); // Convertir resultado a string
      } catch (e) {
        valorEnPantalla = "Error"; // Manejar errores
      }
      break;
    case "sqrt":
      valorEnPantalla += "√";
      break;
    case "log":
      valorEnPantalla += "log";
      break;
    case "ln":
      valorEnPantalla += "ln";
      break;
    case "sin":
      valorEnPantalla += "sin";
      break;
    case "cos":
      valorEnPantalla += "cos";
      break;
    case "tan":
      valorEnPantalla += "tan";
      break;
    case "asin":
      valorEnPantalla += "asin";
      break;
    case "acos":
      valorEnPantalla += "acos";
      break;
    case "atan":
      valorEnPantalla += "atan";
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
      valorEnPantalla += "exp";
      break;
    case "pi":
      valorEnPantalla += Math.PI;
      break;
    case "doubleZero":
      valorEnPantalla += "00";
      break;
    case "percent":
      // Aquí está la modificación para que el botón % calcule el porcentaje instantáneamente
      try {
        const expresionConvertida = convertirExpresion(valorEnPantalla);
        valorEnPantalla = eval(expresionConvertida) / 100; // Calcula el porcentaje y actualiza valorEnPantalla
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
      break;
    case "modeToggle":
      modoCientifico = !modoCientifico;
      actualizarModo();
      break;
    case "factorial":
      valorEnPantalla += "!";
      break;
    default:
      if (valorEnPantalla.length < LIMITE_CARACTERES) {
        valorEnPantalla += texto; // Agregar texto al valor en pantalla
      }
      break;
  }

  pantalla.textContent = valorEnPantalla; // Actualizar la pantalla
}

// Función para evaluar expresiones matemáticas con soporte para funciones
function evaluarExpresion(exp) {
  // Asegurarse de que se manejen correctamente los paréntesis
  exp = exp.replace(/√\((.*?)\)/g, 'Math.sqrt($1)'); // Raíz cuadrada
  exp = exp.replace(/log\((.*?)\)/g, 'Math.log10($1)'); // Logaritmo en base 10
  exp = exp.replace(/ln\((.*?)\)/g, 'Math.log($1)'); // Logaritmo natural
  exp = exp.replace(/sin\((.*?)\)/g, enRadianes ? 'Math.sin($1)' : 'Math.sin($1 * Math.PI / 180)'); // Seno
  exp = exp.replace(/cos\((.*?)\)/g, enRadianes ? 'Math.cos($1)' : 'Math.cos($1 * Math.PI / 180)'); // Coseno
  exp = exp.replace(/tan\((.*?)\)/g, enRadianes ? 'Math.tan($1)' : 'Math.tan($1 * Math.PI / 180)'); // Tangente
  exp = exp.replace(/asin\((.*?)\)/g, enRadianes ? 'Math.asin($1)' : 'Math.asin($1) * (180 / Math.PI)'); // Arco seno
  exp = exp.replace(/acos\((.*?)\)/g, enRadianes ? 'Math.acos($1)' : 'Math.acos($1) * (180 / Math.PI)'); // Arco coseno
  exp = exp.replace(/atan\((.*?)\)/g, enRadianes ? 'Math.atan($1)' : 'Math.atan($1) * (180 / Math.PI)'); // Arco tangente
  exp = exp.replace(/pi/g, 'Math.PI'); // Pi
  exp = exp.replace(/e/g, 'Math.E'); // Número de Euler

  // Evaluar la expresión
  try {
    return Function(`"use strict"; return (${exp})`)(); // Uso de Function para evaluar
  } catch (error) {
    throw new Error("Error al evaluar la expresión"); // Manejo de errores
  }
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
      buttonElement.style.display = modoCientifico ? "block" : "none"; // Mostrar u ocultar botones
    }
  });

  // Cambiar el texto del botón de modo
  const modoToggleButton = document.querySelector(`button.modeToggle`);
  modoToggleButton.textContent = modoCientifico ? "Normal" : "Científica"; // Cambiar el texto según el modo
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
};

document.addEventListener("keydown", (event) => {
  const tecla = teclaMapeo[event.key];
  if (tecla) {
    if (tecla === "equals") {
      manejarClick("", "equals");
    } else if (tecla === "clear") {
      manejarClick("", "clear");
    } else if (tecla === "backspace") {
      manejarClick("", "backspace");
    } else if (tecla === "modeToggle") {
      manejarClick("", "modeToggle");
    } else {
      manejarClick(tecla, "number"); // Cambiar a 'number' o 'operator' según corresponda
    }
    event.preventDefault(); // Prevenir comportamiento predeterminado
  }
});

// Asegurarse de que el input permita paréntesis
document.addEventListener("keydown", (event) => {
  if (event.key === "(" || event.key === ")") {
    manejarClick(event.key, "number");
    event.preventDefault();
  }
});
