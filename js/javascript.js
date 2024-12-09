// Definir la cantidad de gramos por persona
const asadoCarneXpersona = 500; // 500 gramos de carne por persona
const pizzaPrepizzaXpersona = 0.5; // media prepizza por persona
const pizzaQuesoXpersona = 100; // 100 gramos de queso por persona
let ingredientesExtra = []; // Array para almacenar ingredientes adicionales
let cantidades = {}; // Variable para almacenar las cantidades calculadas

// Calcular las cantidades necesarias por persona
function calcularCantidades() {
    const comida = document.getElementById("comida").value;
    const invitados = parseInt(document.getElementById("invitados").value);

    if (!comida || isNaN(invitados) || invitados <= 0) {
        alert("Por favor, completa todos los campos correctamente.");
        return;
    }

    // Determinar cantidades basadas en el tipo de comida y almacenar en JSON
    if (comida === "ASADO") {
        cantidades = {
            totalCarne: invitados * asadoCarneXpersona,
            totalPrepizzas: 0,
            totalQueso: 0,
        };
    } else if (comida === "PIZZA") {
        cantidades = {
            totalCarne: 0,
            totalPrepizzas: invitados * pizzaPrepizzaXpersona,
            totalQueso: invitados * pizzaQuesoXpersona,
        };
    }

    // Guardar en JSON
    localStorage.setItem("cantidades", JSON.stringify(cantidades));
    localStorage.setItem("ingredientesExtra", JSON.stringify(ingredientesExtra));

    // Mostrar la lista de compras y la sección de ingredientes adicionales
    mostrarListaDeCompras();
    document.getElementById("ingredientesAdicionales").style.display = "block";
}

// Agregar ingrediente a la lista
function agregarIngrediente() {
    const ingredienteInput = document.getElementById("ingredienteInput");
    const ingrediente = ingredienteInput.value.trim();

    if (ingrediente) {
        ingredientesExtra.push(ingrediente);
        ingredienteInput.value = ""; // Limpiar el campo de entrada

        // Guardar en JSON
        localStorage.setItem("ingredientesExtra", JSON.stringify(ingredientesExtra));

        mostrarListaDeCompras(); // Actualizar la lista de compras incluyendo los ingredientes adicionales
    } else {
        alert("Por favor, ingresa un ingrediente válido.");
    }
}

// Mostrar la lista de compras completa (incluye ingredientes y cantidades)
function mostrarListaDeCompras() {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = ""; // Limpiar resultados anteriores

    // Obtener datos de JSON y actualizar las cantidades e ingredientes
    cantidades = JSON.parse(localStorage.getItem("cantidades")) || {};
    ingredientesExtra = JSON.parse(localStorage.getItem("ingredientesExtra")) || [];

    // Mostrar cantidades calculadas de carne, prepizzas, y queso
    if (cantidades.totalCarne) {
        const liCarne = document.createElement("li");
        liCarne.textContent = `${cantidades.totalCarne} gramos de carne`;
        resultado.appendChild(liCarne);
    }
    if (cantidades.totalPrepizzas) {
        const liPrepizzas = document.createElement("li");
        liPrepizzas.textContent = `${cantidades.totalPrepizzas} prepizzas`;
        resultado.appendChild(liPrepizzas);
    }
    if (cantidades.totalQueso) {
        const liQueso = document.createElement("li");
        liQueso.textContent = `${cantidades.totalQueso} gramos de queso`;
        resultado.appendChild(liQueso);
    }

    // Mostrar ingredientes adicionales justo después del total de la comida
    ingredientesExtra.forEach((ingrediente) => {
        const liIngrediente = document.createElement("li");
        liIngrediente.textContent = `${ingrediente}`;
        resultado.appendChild(liIngrediente);
    });
}

// Al cargar la página, limpiar todos los datos previos
document.addEventListener("DOMContentLoaded", () => {
    // Limpiar los datos en localStorage para que siempre esté vacío al cargar
    localStorage.removeItem("cantidades");
    localStorage.removeItem("ingredientesExtra");

    // Limpiar los campos y variables locales
    document.getElementById("comida").value = "";
    document.getElementById("invitados").value = "";
    document.getElementById("ingredienteInput").value = "";
    ingredientesExtra = []; // Reiniciar ingredientes adicionales
    cantidades = {}; // Reiniciar cantidades

    mostrarListaDeCompras(); // Limpiar lista de compras al cargar
});
