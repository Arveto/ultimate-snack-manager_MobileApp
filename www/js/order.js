
let gotoOrder = ()=>{
  initOrderUI();
}

function fillBasket() {
  if (currentOrder.hasOwnProperty('basket') && currentOrder.hasOwnProperty('user')) {
    for (productId of currentOrder.basket.split(',')) {
      incrementBasket(parseInt(productId));
    }
  }
}

let basket = [], total = 0;

let incrementBasket = (productId) => {
  let updated = false;

  let product = {};
  for (productTmp of user.itemsList) {
    if (productTmp.id == productId){
      product = productTmp;
      break;
    }
  }
  total += product.price;
  $$('.total').html(total.toFixed(2) + " €");


  for (productTmp of basket) {
    if (productTmp.id == productId){
      productTmp.amount ++;
      $$(".amount-product-"+productId).val(productTmp.amount);
      updated = true;
    }
  }

  if (!updated) { //new product

    basket.push({id: productId, amount: 1});
    console.log(basket);
    //get product

    let stepper = $$('<li>').addClass('product-'+productId).html(`<div class="item-content">
                      <div class="item-inner">
                        <div class="item-title">`+product.name+`</div>
                        <div class="item-after">
                          <div class="stepper stepper-fill stepper-init">
                            <div class="stepper-button-minus" onclick="decrementBasket(`+productId+`)"></div>
                            <div class="stepper-input-wrap">
                              <input type="number" value="1" min="0" max="100" step="1" class="amount-product-`+productId+`"></input>
                            </div>
                            <div class="stepper-button-plus" onclick="incrementBasket(`+productId+`)"></div>
                          </div>
                        </div>
                      </div>
                    </div>`);

    if( $$(".commandList").length > 0 ){
      stepper.appendTo(".commandList");
    } else {  //fuck that shit
      setTimeout(function () {
        insertStepper(stepper);
      }, 10);
    }
  }
}

let decrementBasket = (productId) => {
  for (let [index, product] of basket.entries()) {
    if (product.id == productId){
      if (product.amount != 1){
        product.amount --;
        $$(".amount-product-"+productId).val(product.amount);
      } else {
        $$(".product-"+productId).remove();
        basket.splice(index, 1);
      }
    }
  }

  let product = {};
  for (productTmp of user.itemsList) {
    if (productTmp.id == productId){
      product = productTmp;
      break;
    }
  }
  total -= product.price;
  $$('.total').html(total.toFixed(2) + " €");
}

let initOrderUI = function(callback) {
  if( $$("#orderProducts").length > 0 && currentOrder.hasOwnProperty('user')){
    console.log(currentOrder.user.fiName + " " + currentOrder.user.faName);
    $$('.orderFor').html(currentOrder.user.fiName + " " + currentOrder.user.faName);
    clearBasket();
    dispProducts("#orderProducts");
    $$('.commandList').empty();
    fillBasket();
  } else {  //fuck that shit
    setTimeout(function () {
      initOrderUI();
    }, 10);
  }

}

let clearBasket = ()=>{
  total = 0;
  $$('.total').html(total.toFixed(2) + " €");
  basket = [];
  $$('.commandList').empty();
}

let submitOrder = () => {
  // let commandList = [];
  // basket.forEach((el)=>{commandList.push(el.id)})
  //Build order array
  orderArray = [];
  for(let i=0; i<basket.length; i++){
      for(let j=0; j<basket[0].amount; j++){
          orderArray.push(basket[i].id);
      }
  }

  if (currentOrder.hasOwnProperty('user')){ //an admin is taking the order for someone

      //preparing order
    let order = {
      admin: user.userData,
      customerId: currentOrder.user.id,
      commandList: orderArray,
      price: total.toFixed(2),
    };
    console.log(order);
    if(currentOrder.hasOwnProperty('basket'))
      socket.emit('validatePreorder', order);
    else
      socket.emit('order', order);

  } else { // it's a preorder

    let order = {
      customerId : user.userData.id,
      commandList : orderArray.toString(),
      price : total.toFixed(2)
    };
    console.log(order);
    socket.emit('preorder', order);

  }
  clearBasket();
}

socket.on("commandReceived", () => {
  notif('cafeteria', 'La commande a bien été effectuée');
});

socket.on("preorderFailure", ()=>{
  notif('error', 'Vous avez déja une précommande !');
});
