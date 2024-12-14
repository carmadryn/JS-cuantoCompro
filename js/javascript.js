// Selección de elementos del DOM
const form = document.getElementById('compraForm');
const resultContainer = document.getElementById('resultado');
const extraIngredientInput = document.getElementById('ingredienteInput');
const addIngredientButton = document.querySelector('.boton2');
const extraIngredientsSection = document.getElementById('ingredientesAdicionales');

// Variables para almacenamiento
let extraIngredients = [];
let savedData = {};
let prices = {}; // Aquí se almacenarán los precios cargados desde el JSON

// Calcular las cantidades necesarias y costos
function calcularCantidades() {
  const foodChoice = document.getElementById('comida').value;
  const guests = parseInt(document.getElementById('invitados').value);

  if (!foodChoice || isNaN(guests) || guests <= 0) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor, completa todos los campos correctamente.',
    });
    return;
  }

  if (!prices[foodChoice.toLowerCase()]) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudieron cargar los precios correctamente.',
    });
    return;
  }

  let totalCost = 0;
  let details = '';
  let costPerGuest = 0;

  if (foodChoice === 'ASADO') {
    const carneCost = prices.asado.carne * guests;
    totalCost = carneCost;
    details = `${guests * 500} gramos de carne`;
  } else if (foodChoice === 'PIZZA') {
    const quesoCost = prices.pizza.queso * guests;
    const prepizzaCost = prices.pizza.prepizza * guests;
    totalCost = quesoCost + prepizzaCost;
    details = `${guests * 0.5} prepizzas y ${guests * 100} gramos de queso`;
  }

  costPerGuest = totalCost / guests;

  savedData = {
    foodChoice,
    guests,
    totalCost,
    costPerGuest,
    details,
    extraIngredients,
  };

  localStorage.setItem('purchaseData', JSON.stringify(savedData));

  renderResults(details, totalCost, costPerGuest);
}

// Renderizar resultados en el DOM
function renderResults(details, totalCost, costPerGuest) {
  resultContainer.innerHTML = `
    <li>${details}</li>
    <li>Ingredientes adicionales: ${extraIngredients.join(', ') || 'Ninguno'}</li>
    <li><strong>Total: $${totalCost}</strong></li>
    <li>Costo por persona: <strong>$${costPerGuest.toFixed(2)}</strong></li>
  `;
  extraIngredientsSection.style.display = 'block';
}

// Agregar ingrediente adicional
addIngredientButton.addEventListener('click', () => {
  const ingredient = extraIngredientInput.value.trim();
  if (ingredient) {
    extraIngredients.push(ingredient);
    extraIngredientInput.value = '';
    updateExtraIngredientsList();
    localStorage.setItem('extraIngredients', JSON.stringify(extraIngredients));
    // Re-renderizar los resultados incluyendo los ingredientes adicionales
    if (savedData.details && savedData.totalCost) {
      renderResults(savedData.details, savedData.totalCost, savedData.costPerGuest);
    }
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Advertencia',
      text: 'Por favor, ingresa un ingrediente válido.',
    });
  }
});

// Actualizar lista de ingredientes adicionales
function updateExtraIngredientsList() {
  const ingredientsList = document.createElement('ul');
  extraIngredients.forEach((ingredient) => {
    const li = document.createElement('li');
    li.textContent = ingredient;
    ingredientsList.appendChild(li);
  });

  const existingList = resultContainer.querySelector('ul');
  if (existingList) {
    existingList.remove();
  }

  resultContainer.appendChild(ingredientsList);
}

// Obtener precios simulados con fetch
async function obtenerPrecios() {
  try {
    const response = await fetch('./js/prices.json'); // Ajusta la ruta según tu estructura de carpetas
    prices = await response.json();
    console.log('Precios obtenidos:', prices);
  } catch (error) {
    console.error('Error al obtener precios:', error);
  }
}

// Al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
  // Limpiar datos previos de localStorage
  localStorage.removeItem('purchaseData');
  localStorage.removeItem('extraIngredients');

  // Reiniciar variables locales
  savedData = {};
  extraIngredients = [];
  resultContainer.innerHTML = '';
  extraIngredientsSection.style.display = 'none';

  await obtenerPrecios(); // Asegúrate de cargar los precios antes de cualquier cálculo
});
