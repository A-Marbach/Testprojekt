let foods = ['Hamburger', 'Chesseburger', 'Chickenburger', 'Pizza Tonno', 'Pizza Mozzarella', 'Pizza Salami', 'Gemischter Salat', 'Hirtensalat', 'Thunfischsalat'];
let ingredients = ['Bullette, Tomate, Gurke', 'Bullette, Käse, Tomate, Gürke', 'Hähnchenfleisch, Käse, Zwiebel, Tomate, Remoulade', 'Thunfisch, Tomatensoße, Zwiebel', 'Mozzarella', 'Salami, Zwiebel', 'Eisbergsalat und Römersalat mit Cherry-Tomaten, Gurke und Mais', 'Eisbergsalat und Römersalat mit Cherry-Tomaten, Gurke, Mais, Thunfisch, Hirtenkäse, und roten Zwiebeln', 'Thunfisch, Eisbergsalat, Tomaten, Gurken, Zwiebel, Mais, Hirtenkäse'];
let prices = [5.90, 6.90, 7.90, 9.90, 8.90, 10.90, 5.30, 6.20, 5.80];
let amounts = [];
let basketFood = [];
let basketPrices = [];


function start() {
   

    let content = document.getElementById('foods');
    for (let i = 0; i < foods.length; i++) {
        let food = foods[i];
        let ingredient = ingredients[i];
        let price = prices[i];
        formattedPrice = price.toFixed(2).replace(".", ",")

        content.innerHTML += `
    <div class="food-script">
    <h2><b>${food}</b></h2>
    <p>${ingredient}</p>
    <b>${formattedPrice}</b>
    <button onclick="addFood(${i})" class="btn">+</button
    </div>
    `;
    }
}

function addFood(i) {
    let index = basketFood.indexOf(foods[i]);
    if (index == -1) {
        basketFood.push(foods[i]);
        basketPrices.push(prices[i]);
        amounts.push(1);
    } else {
        amounts[index]++;
    }
    updateShoppingBasket();
}

function updateShoppingBasket() {
    let constant = document.getElementById('shoppingBasket');
    constant.innerHTML = '';
    if (basketFood.length < 1) {
        document.getElementById('price').classList.add('d-none');
        constant.innerHTML = `
        <p>Fülle deinen Warenkorb.<br>
                Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</p>`;
    }else{
        document.getElementById('price').classList.remove('d-none');

    for (let i = 0; i < basketFood.length; i++) {
        const food = basketFood[i];
        const price = basketPrices[i];
        const amount = amounts[i];
        const formattedPrice = price.toFixed(2).replace(".", ",")
        constant.innerHTML += `
     <div class="basket-sum" >
     <b>${amount}</b>
     <b>${food}</b> <b>${formattedPrice}€</b><br>
     <div >
     <button onclick="addAmount(${i})" class="href">+</button>
     <button onclick="deleteAmount(${i})" class="href" onclick="Delete()" >-</button>
     </div>
     
     </div>
      `;
    }
    }
    updatePriceBasket(basketFood);
}

function updatePriceBasket(basketFood) {
    let sum = 0;
    let subTotal = 1.50;

    for (let i = 0; i < basketPrices.length; i++) {
        sum += basketPrices[i] * amounts[i];

    }
    
    let totalSum = sum + subTotal;
    
    document.getElementById('price').innerHTML = `
    <div class="sum">
    <table>
    <tr>
    <td><b>Zwischensumme: ${sum.toFixed(2).replace(".", ",")}€</b></td>
    </tr>
    <tr>
    <td><b>Lieferkosten: ${subTotal.toFixed(2).replace(".", ",")}€</b></td>
    </tr>
    <tr>
    <td><b>Gesamtsumme: ${totalSum.toFixed(2).replace(".", ",")}€</b></td>
    </tr>
    </table>
    </div>

    <button class="bestellBtn" onclick="bestellt(${totalSum})">Bestellen ${totalSum.toFixed(2).replace(".", ",")}€</button>
    `;
    
}

function bestellt(i) {
    if (i < 10) {
        alert('Mindestbestellbetrag ist 10€')
    } else {
        alert('Bestellung ist eingegangen! Sie erhalten in 45.min ihr Essen')
    }
}

function addAmount(i) {


    amounts[i]++;
    updatePriceBasket();
    updateShoppingBasket();
    watchBasketMobile()

}

function deleteAmount(i) {
    if (amounts[i] <= 1) {
        amounts.splice(i, 1);
        basketFood.splice(i, 1);
        basketPrices.splice(i, 1);
    } else {
        amounts[i]--;
    }
    updatePriceBasket();
    updateShoppingBasket();
    watchBasketMobile()
    
}

function openPopup(){
    document.getElementById('popup').classList.remove('d-none');
}

function closePopup(){
    document.getElementById('popup').classList.add('d-none');
    
}

function stop(event){
    event.stopPropagation();
}

function watchBasketMobile(){
    let content = document.getElementById('mobile');
    content.classList.remove('d-none');
    let container = document.getElementById('mobile');
    container.innerHTML ='';

   
    for (let i = 0; i < basketFood.length; i++) {
        const food = basketFood[i];
        const price = basketPrices[i];
        const amount = amounts[i];
        const formattedPrice = price.toFixed(2).replace(".", ",")
        content.innerHTML += `
     <div class="basket-sum mobile-text"  onclick="stop(event)">
     <b>${amount} </b>
     <b>${food} </b> <b>${formattedPrice}€</b><br>
     <div >
     <button onclick="addAmount(${i})" class="href">+</button>
     <button onclick="deleteAmount(${i})" class="href" onclick="Delete()" >-</button>
     </div>
     
     </div>
      `;
    }
    
    updatePriceBasket(basketFood);
}

function closeMobile(){
    let content = document.getElementById('mobile');
    content.classList.add('d-none');
   


     
}
