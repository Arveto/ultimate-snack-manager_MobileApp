
$$('.gotoPreorder').on('click', () => {
  initPreorderUI();
});

let initPreorderUI = () => {
  if( $$("#usersList").length > 0 ){
    $$("#usersList").empty()
    for (let [index, preorder] of user.preorders.entries()) {
      //find the concerned user
      for (u of user.users) {
        if (preorder && preorder.customerId == u.id) {
          preorder.user = u;

          let container = $$("<li>").appendTo('#usersList');
          container.html(`<a href="/order/" class="item-link item-content gotoOrder" onclick="setCurrentOrderUser(`+preorder.customerId+`); gotoOrder()">
          <div class="item-media">
          <img src="https://api.adorable.io/avatars/100/`+preorder.user.fiName+preorder.user.faName+`.png"></img>
          <div class="chip color-red">
          <div class="chip-label">`+preorder.user.balance+` €</div>
          </div>
          </div>
          <div class="item-inner">
          <div class="item-title">`+preorder.user.fiName+' '+preorder.user.faName+`</div>
          </div>
          </a>`);
        }
      }
    }
  } else {  //fuck that shit
    setTimeout(function () {
      initPreorderUI();
    }, 10);
  }
}
