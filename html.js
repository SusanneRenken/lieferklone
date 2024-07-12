function generateDishHtml(i, name, description, price) {
  const formattedPrice = price.toFixed(2).replace(".", ",");
  return /*html*/ `
    <div class="dish" onclick="addToBasket(${i})">
      <h3>${i + 1} ${name}</h3>
      <p>${description}</p>
      <span>${formattedPrice} €</span>
      <img src="./img/1-plus.png" alt="Hinzufügen" class="add-img">
    </div>`;
}

function generateBasketHtml(i, name, price, amount) {
  const totalPrice = price * amount;
  const formattedPrice = totalPrice.toFixed(2).replace(".", ",");

  return /*html*/ `    
      <div class="selected-dish">      
      <div class="dish-information">
        <div class="dish-portions">${amount}x</div>
        <div class="dish-name">${name}</div>
        <div class="dish-price">${formattedPrice} €</div>
      </div>
      <div class="dish-adjust">
        <img src="./img/1-minus.png" alt="" class="adjust-img" onclick="reduceAmount(${i})"/>
        <p>${amount}</p>
        <img src="./img/1-plus.png" alt="" class="adjust-img" onclick="increaseAmount(${i})"/>
        <img src="./img/1-delete.png" alt="" class="delete-img" onclick="deleteFromBasket(${i})"/>
      </div>
    </div>`;
}

function generateCostHtml(subtotal, deliverPrice, totalPrice) {
  const formattedSubtotal = subtotal.toFixed(2).replace(".", ",");
  const formattedDeliverPrice = deliverPrice.toFixed(2).replace(".", ",");
  const formattedTotalPrice = totalPrice.toFixed(2).replace(".", ",");
  
  let costs = document.getElementById("cost");
  costs.innerHTML = ``;
  costs.innerHTML += `
    <table>
      <tbody>
        <tr>
          <td>Zwischensumme</td>
          <td>${formattedSubtotal} €</td>
        </tr>
        <tr>
          <td>Lieferkosten</td>
          <td>${formattedDeliverPrice} €</td>
        </tr>
        <tr>
          <td>Gesamt</td>
          <td>${formattedTotalPrice} €</td>
        </tr>
      </tbody>
    </table>
    <button id="pay" class="" onclick="pay()">Bezahlen (${formattedTotalPrice} €)</button>
`;
}

function generateMobileBtnHtml(totalPrice) {
  const formattedTotalPrice = totalPrice.toFixed(2).replace(".", ",");

  let mobileBtn = document.getElementById("open-basket-btn");
  mobileBtn.innerHTML = ``;
  mobileBtn.innerHTML += `
  <button id="basket-btn" onclick="editClasslistMobileBasket('add', 'remove')">
    Warenkorb (${formattedTotalPrice} €)
  </button>`;
}
