// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'com.arveto.isty', // App bundle ID
  name: 'ISTY', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {
      user: {
        team: 'Arveto Ink.'
      },
    };
  },
  // App routes
  routes: routes,
});

// Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/'
});

  //Init socket.io connection
const HOSTNAME = ''; // XXX: REPLACE BY THE HOST'S IP
let socket = io.connect('http://'+HOSTNAME);

// create searchbar
var searchbar = app.searchbar.create({
  el: '#searchbarUsersList',
  searchContainer: '#usersList',
  searchIn: '.usernameList',
  on: {
    search(sb, query, previousQuery) {
      console.log(query, previousQuery);
    }
  }
});
