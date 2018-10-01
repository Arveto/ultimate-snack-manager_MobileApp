
let currentOrder = {};

$$('.gotoUsersList').on('click', ()=>{
  dispUsers();
})

let dispUsers = ()=>{
  if( $$("#usersList").length > 0 ){
    for (let u of user.users) {
      let container = $$("<li>").appendTo('#usersList');
      container.html(`<a href="/order/" class="item-link item-content gotoOrder" onclick="setCurrentOrderUser(`+u.id+`); gotoOrder()">
      <div class="item-media">
      <img src="https://api.adorable.io/avatars/100/`+u.fiName+u.faName+`.png"></img>
      <div class="chip color-red">
      <div class="chip-label">`+u.balance+` €</div>
      </div>
      </div>
      <div class="item-inner">
      <div class="item-title">`+u.fiName+' '+u.faName+`</div>
      </div>
      </a>`);
    }
  } else {  //fuck that shit
    setTimeout(function () {
      dispUsers();
    }, 10);
  }
}


let setCurrentOrderUser = (targetId) => {
  for (u of user.users) {
    if (u.id == targetId) {
      currentOrder.user = u;

      for (p of user.preorders) {
        if (p.customerId == targetId) {
          currentOrder.basket = p.commandList;
          break;
        }
      }
    }
  }
}
