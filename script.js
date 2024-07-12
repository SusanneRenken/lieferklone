let dishes = [
  {
    category: "starter",
    name: "Pizzabrötchen mit Salami",
    description: "6 Stück - mit Salami und Käse",
    price: 4.9,
    popular: false,
  },
  {
    category: "starter",
    name: "Bruschetta",
    description: "mit frischen Tomaten",
    price: 5.9,
    popular: false,
  },
  {
    category: "starter",
    name: "Carpaccio",
    description: "dünn geschnittenes rohes Rindfleisch",
    price: 8.9,
    popular: true,
  },
  {
    category: "salad",
    name: "Gemischter Salat",
    description: "mit Mais",
    price: 7.9,
    popular: false,
  },
  {
    category: "salad",
    name: "Hähnchen Salat",
    description: "mit Champignons und Hähnchenbrustfilet",
    price: 8.9,
    popular: false,
  },
  {
    category: "salad",
    name: "Griechischer Salat",
    description:
      "mit Feta, milder Peperoni, Oliven, Paprika und roten Zwiebeln",
    price: 10.5,
    popular: false,
  },
  {
    category: "pizza",
    name: "Pizza Salami",
    description: "mit Salami",
    price: 7.9,
    popular: false,
  },
  {
    category: "pizza",
    name: "Pizza Hawaii",
    description: "mit Ananas und Schinken",
    price: 8.9,
    popular: false,
  },
  {
    category: "pizza",
    name: "Vegetarische Pizza",
    description:
      "mit Paprika, Mais, Zwiebeln, Oliven, Broccoli und Champignons",
    price: 8.9,
    popular: true,
  },
  {
    category: "pasta",
    name: "Pasta Napoli",
    description: "mit hausgemachter Tomatensauce und Käse",
    price: 7.5,
    popular: false,
  },
  {
    category: "pasta",
    name: "Pasta Bolognese",
    description:
      "mit hausgemachter Tomatensauce, Käse, Parmesan und Rinder-Hackfleisch",
    price: 10.9,
    popular: false,
  },
  {
    category: "pasta",
    name: "Pasta Carbonara",
    description: "mit Ei, Käse, Sahnesauce und Schinken",
    price: 9.5,
    popular: false,
  },
  {
    category: "dessert",
    name: "Tiramisu",
    description:
      "in Kaffee getränkter Löffelbiskuits mit einer Creme aus Mascarpone",
    price: 8.9,
    popular: false,
  },
  {
    category: "dessert",
    name: "Panna Cotta",
    description: "cremiger Pudding aus Sahne",
    price: 5.5,
    popular: true,
  },
  {
    category: "dessert",
    name: "Spaghetti Eis",
    description: "Vanilleeis mit Erdbeersauce",
    price: 6.9,
    popular: false,
  },
];

let delivery = true;

let basketName = load("basketName") || [];
let basketPrice = load("basketPrice") || [];
let basketAmount = load("basketAmount") || [];

function render() {
  for (let i = 0; i < dishes.length; i++) {
    const dish = dishes[i];

    renderPopulars(i, dish.popular, dish.name, dish.description, dish.price);
    renderMeal(i, dish.category, dish.name, dish.description, dish.price);
  }
}

function renderPopulars(i, popular, name, description, price) {
  let populars = document.getElementById("popular");
  if (popular) {
    populars.innerHTML += generateDishHtml(i, name, description, price);
  }
}

function renderMeal(i, category, name, description, price) {
  let meal = document.getElementById(category);
  meal.innerHTML += generateDishHtml(i, name, description, price);
}

function addToBasket(i) {
  let dish = dishes[i].name;
  let dishIndex = getDishIndex(dish);

  if (dishIndex == -1) {
    pushToBasket(dishes[i].name, dishes[i].price);
    renderBasket();
  } else {
    increaseAmount(dishIndex);
  }
}

function getDishIndex(dish) {
  let valueIndex = basketName.indexOf(dish);
  return valueIndex;
}

function pushToBasket(name, price) {
  basketName.push(name);
  basketPrice.push(price);
  basketAmount.push(1);
}

function renderBasket() {
  if (basketName.length == 0) {
    editClasslistBasket("remove", "add");
    generateMobileBtnHtml(0);
  } else {
    editClasslistBasket("add", "remove")

    renderDishesInBasket();
    renderCosts();
  }
  saveAll();
}

function editClasslistBasket(param1, param2) {
  document.getElementById("basket-empty").classList[param1]("d-none");
  document.getElementById("basket").classList[param2]("d-none");
  document.getElementById("cost").classList[param2]("d-none");
}

function renderDishesInBasket() {
  let selectedDishes = document.getElementById("selected-dishes");
  selectedDishes.innerHTML = ``;

  for (let i = 0; i < basketName.length; i++) {
    const name = basketName[i];
    const price = basketPrice[i];
    const amount = basketAmount[i];
    selectedDishes.innerHTML += generateBasketHtml(i, name, price, amount);
  }
}

function renderCosts() {
  let subtotal = calculateSubtotal();
  let deliverPrice = calculateDeliverPrice();
  let totalPrice = subtotal + deliverPrice;

  generateCostHtml(subtotal, deliverPrice, totalPrice);
  generateMobileBtnHtml(totalPrice);

  document.getElementById("pay").classList.remove("activ-btn");
  if (delivery && subtotal < 14.9) {
    document.getElementById("pay").classList.add("activ-btn");
  }
}

function calculateSubtotal() {
  let subtotal = 0;
  for (let i = 0; i < basketPrice.length; i++) {
    subtotal += basketPrice[i] * basketAmount[i];
  }
  return subtotal;
}

function calculateDeliverPrice() {
  let deliverPrice = 0;
  if (delivery) {
    deliverPrice = 3.0;
  }
  return deliverPrice;
}

function reduceAmount(i) {
  if (basketAmount[i] == 1) {
    deleteFromBasket(i);
  } else {
    basketAmount[i]--;
  }
  renderBasket();
}

function increaseAmount(i) {
  if (basketAmount[i] == 10) {
    alert("Ein Gericht kann maximal 10 mal bestellt werden.");
  } else {
    basketAmount[i]++;
  }
  renderBasket();
}

function deleteFromBasket(i) {
  basketName.splice(i, 1);
  basketPrice.splice(i, 1);
  basketAmount.splice(i, 1);

  renderBasket();
}

function pay() {
  let subtotal = calculateSubtotal();
  if (delivery && subtotal < 14.9) {
    alert("Du hast den Mindestbestellwert von 14,90 € noch nicht erreicht.");
  }
  if (delivery && subtotal >= 14.9) {
    alert(
      "Deine Bestellung ist bei uns eingegangen.\nWir brauchen ca. 30 Minuten bis zu dir."
    );
    clearBasket();
  }
  if (delivery == false) {
    alert(
      "Deine Bestellung ist bei uns eingegangen.\nDu kannst sie in ca. 20 Minuten abholen."
    );
    clearBasket();
  }
}

function clearBasket() {
  basketName = [];
  basketPrice = [];
  basketAmount = [];
  renderBasket();
}

function editClasslistMobileBasket(param1, param2) {
  document.getElementById("leftside").classList[param1]("d-none");
  document.getElementById("open-basket-btn").classList[param1]("d-none");
  document.getElementById("footer").classList[param1]("d-none");
  document.getElementById("close-btn").classList[param2]("d-none");
  document.getElementById("aside").classList[param1]("mobile-basket");
}

function slideRight() {
  document.getElementById("scrollmenu").scrollLeft += 40;
}

function slideLeft() {
  document.getElementById("scrollmenu").scrollLeft -= 40;
}

function deliver(id) {
  const collection = document.getElementById("collection");
  const purvey = document.getElementById("purvey");

  deliverCollection(id, collection, purvey);
  deliverPurvey(id, collection, purvey);
}

function deliverCollection(id, collection, purvey) {
  if (id == collection) {
    collection.classList.add("activ");
    purvey.classList.remove("activ");
    document.getElementById("conditions-purvey").classList.add("d-none");
    document.getElementById("conditions-collection").classList.remove("d-none");
    delivery = false;
    renderBasket();
  }
}

function deliverPurvey(id, collection, purvey) {
  if (id == purvey) {
    purvey.classList.add("activ");
    collection.classList.remove("activ");
    document.getElementById("conditions-purvey").classList.remove("d-none");
    document.getElementById("conditions-collection").classList.add("d-none");
    delivery = true;
    renderBasket();
  }
}

function saveAll() {
  save("basketName", basketName);
  save("basketPrice", basketPrice);
  save("basketAmount", basketAmount);
}

function save(key, array) {
  let value = JSON.stringify(array);
  localStorage.setItem(key, value);
}

function load(key) {
  let ArrayAsText = localStorage.getItem(key);
  if (ArrayAsText) {
    return JSON.parse(ArrayAsText);
  }
  return null;
}
