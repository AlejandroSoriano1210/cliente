// Lista de compras inicial
let shoppingList = [];

// Referencias a elementos del DOM
const itemInput = document.getElementById("itemInput");
const shoppingListElement = document.getElementById("shoppingList");
const addButton = document.getElementById("addButton");
const removeFirstButton = document.getElementById("removeFirstButton");
const removeLastButton = document.getElementById("removeLastButton");
const showFirstThreeButton = document.getElementById("showFirstThreeButton");

// Función para actualizar la lista en la página
const updateShoppingListUI = () => {
  shoppingListElement.innerHTML = ""; // Limpiar lista
  shoppingList.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    shoppingListElement.appendChild(li);
  });
};

// Añadir artículo
addButton.addEventListener("click", () => {
    const newItem = itemInput.value.trim();
    if (newItem) {
      shoppingList.push(newItem); // Añadir artículo
      updateShoppingListUI();
    }
  });
  

// Eliminar el primer artículo
removeFirstButton.addEventListener("click", () => {
  if (shoppingList.length > 0) {
    shoppingList.shift(); // Usar shift para eliminar el primero
    updateShoppingListUI();
  }
});

// Eliminar el último artículo
removeLastButton.addEventListener("click", () => {
  if (shoppingList.length > 0) {
    shoppingList.pop(); // Usar pop para eliminar el último
    updateShoppingListUI();
  }
});

// Mostrar los tres primeros artículos
showFirstThreeButton.addEventListener("click", () => {
  const firstThreeItems = shoppingList.slice(0, 3); // Usar slice para obtener los primeros 3
  shoppingListElement.innerHTML = ""; // Limpiar lista
  firstThreeItems.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    shoppingListElement.appendChild(li);
  });
});
