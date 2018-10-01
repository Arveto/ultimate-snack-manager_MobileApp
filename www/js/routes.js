routes = [
  {
    path: '/',
    url: './index.html',
  },
  {
    path: '/index/',
    url: './index.html',
  },
  {
    path: '/about/',
    url: './pages/about.html',
  },
  {
    path: '/stats/',
    url: './pages/stats.html',
  },
  {
    path: '/shoppingList/',
    url: './pages/shoppingList.html',
  },
  {
    path: '/usersList/',
    url: './pages/usersList.html',
  },
  {
    path: '/order/',
    url: './pages/order.html',
  },
  {
    path: '/precomands/',
    url: './pages/precomands.html',
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
