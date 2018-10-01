
$$('#login').on('click', () => {
  login( $$('#email').val(), $$('#password').val() );
  localStorage.password = $$('#password').val();

});

let login = (email, password)=>{
  let shaObj = new jsSHA("SHA-512", "TEXT");
  shaObj.update( password );

  socket.emit("login", {
      email: email,
      password: shaObj.getHash("HEX")
  });
}


socket.on('login', (datas)=>{
    //store user's login datas
  if (datas.ok) {
    user = datas;
    localStorage.user = JSON.stringify(user);
    //permissions & UI init
    $$('#fiName').html(user.userData.fiName);
    $$('#faName').html(user.userData.faName);
    $$('#userprofil img').attr('src', "https://api.adorable.io/avatars/100/"+user.userData.faName + user.userData.fiName+'.png');
    $$('.userprofileBalance').html(user.userData.balance + " €");
    if (datas.isAdmin) {
      $$('#adminPannel').show();
      $$('#adminFab').show();
    }

    //Elements
    dispProducts("#PrecoProducts");
  } else {
    notif('logerr', 'Nope :/', 'Try again..');
  }
})

const colors = ['red', 'green', 'blue', 'pink', 'orange', 'gray'];

let dispProducts = (target) => {
  $$(target).empty();
  let i = 0;
  let curRow, button;
  for (let item of user.itemsList) {
    if (i%2) {
      curRow = $$("<p>").addClass('row').appendTo(target);
    }
    button = $$("<buttons>").addClass('col button button-big button-raised button-fill link color-'+colors[i%colors.length]);
    button.appendTo(curRow).html(item.name);
    button.on('click', () => {
      incrementBasket(item.id) //add product to basket
    })
    i++;
  }
}
