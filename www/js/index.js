(() => {
  if (localStorage.getItem('user')) {
    let user = JSON.parse(localStorage.user);
    user.userData.password = localStorage.password;
    if (user.userData.password) {
      login(user.userData.email, user.userData.password)
      $$('#fiName').html(user.userData.fiName);
      $$('#faName').html(user.userData.faName);
      $$('#userprofil img').attr('src', "https://api.adorable.io/avatars/100/" + user.userData.faName + user.userData.fiName + '.png');
      if (user.isAdmin) {
        $$('#adminPannel').show();
        $$('#adminFab').show();
      }
    } else {
      notif('logerr', 'Connecte toi à ton compte cafet pour accéder à toutes les features ;)', 'Cique ici !');
    }
  } else {
    notif('logerr', 'Connecte toi à ton compte cafet pour accéder à toutes les features ;)', 'Cique ici !');
  }
})();
