
function notif(type, content, footer){
  let notifDatas = {
    'title': type.toUpperCase(),
    'subtitle': content,
    'text': footer,
    'closeButton': true,
    'closeTimeout': 2000,
    'closeOnClick': true,
  };

  switch (type) {
    case "cafeteria":
      notifDatas.icon = '<i class="material-icons">local_cafe</i>';
      break;
    case "preorder":
      notifDatas.icon = '<i class="material-icons">local_cafe</i>';
      notifDatas.on = {
        click: () => {
          notif('', 'TODO: redirect', ':D');
        }
      }
      break;
    case "login":
      notifDatas.icon = '<i class="material-icons">person</i>';
      break;
    case "logerr":
      notifDatas.title = 'LOGIN'
      notifDatas.icon = '<i class="material-icons">warning</i>';
      notifDatas.closeTimeout = 5000;
      notifDatas.on = {
        click: () => {
          $$('#userprofil').trigger('click');
        }
      }
      break;
    case "error":
      notifDatas.icon = '<i class="material-icons">error</i>';
      break;
    default:
      notifDatas.icon = '<i class="material-icons">stars</i>';
  }

  app.notification.create(notifDatas).open();
}
