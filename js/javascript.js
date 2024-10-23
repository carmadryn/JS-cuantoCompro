//Cuánto Compro?
//Objetivo: Dentro de las dos opciones de comidas (pizza o asado) calcular cantidad de gramos por persona y dar la posibilidad de sumar ingredientes para crear una lista de compras


// Consultar que comida elige
function obtenerComida() {
    return prompt("¿Qué van a comer? Elige entre estas opciones: \n A | ASADO \n B | PIZZA").toUpperCase();
}

// Cosultar cantidad de invitados
const comida = obtenerComida();
let comidaElegida;

if (comida === "A") {
    comidaElegida = "ASADO";
} else if (comida === "B") {
    comidaElegida = "PIZZA";
} else {
    alert("Opción no válida. Por favor, elige A o B.");
}

//Consultar cuantos invitados van asistir
const cuantosInvitados = parseInt(prompt("¿Cuántos invitados van a asistir?"));

// Defino la cantidad de gramos por persona para pizza o asado
const asadoCarneXpersona = 500; // 500 gramos de carne por persona
const pizzaPrepizzaXpersona = 0.5; // media prepizza por persona
const pizzaQuesoXpersona = 100; // 100 gramos de queso por persona

// Calcular las cantidades necesarias por persona
function calcularCantidades(comida, invitados) {
    let totalCarne = 0;
    let totalPrepizzas = 0;
    let totalQueso = 0;
    
    if (comida === "A") {
        totalCarne = invitados * asadoCarneXpersona;
    } else if (comida === "B") {
        totalPrepizzas = invitados * pizzaPrepizzaXpersona;
        totalQueso = invitados * pizzaQuesoXpersona;
    }
    
    return { totalCarne, totalPrepizzas, totalQueso };
}

// Solo continuamos si la opción es válida
if (comidaElegida) {
    const cantidades = calcularCantidades(comida, cuantosInvitados);


// Preguntar si quiere agregar mas ingredientes
const agregarIngredientesConfirmar = confirm("¿Deseas agregar ingredientes adicionales para crear una lista de compras?");
let ingredientesExtra = [];
if (agregarIngredientesConfirmar) {
    ingredientesExtra = agregarIngredientes();
}

// Función para crear lista de ingredientes
function agregarIngredientes() {
let ingredientesExtra = [];
let agregarMas = true;

while (agregarMas) {
    const nuevoIngrediente = prompt("Agrega un ingrediente adicional:");
    if (nuevoIngrediente) {
        ingredientesExtra.push(nuevoIngrediente);
    }
    agregarMas = confirm("¿Quieres agregar otro ingrediente?");
    }

    return ingredientesExtra;
}

// Función para mostrar la lista de compras
function mostrarListaDeCompras(comidaElegida, cantidades, ingredientesExtra) {
    let listaDeCompras = `Lista de compras para ${comidaElegida}:\n`;

    if (comidaElegida === "ASADO") {
        listaDeCompras += `- ${cantidades.totalCarne} gramos de carne\n`;
        } else if (comidaElegida === "PIZZA") {
            listaDeCompras += `- ${cantidades.totalPrepizzas} prepizzas\n`;
            listaDeCompras += `- ${cantidades.totalQueso} gramos de queso\n`;
        }

        if (ingredientesExtra.length > 0) {
            listaDeCompras += `- Ingredientes adicionales: ${ingredientesExtra.join(", ")}\n`;
        }

        alert(listaDeCompras);
}

// Mostrar la lista de compras final
mostrarListaDeCompras(comidaElegida, cantidades, ingredientesExtra);
}
