module.exports =  [
  {
    name: 'registration', 
    pattern: '/register', 
    page: 'client/Registration/RegistrationPage',
    displayName: 'Registration'
  },  
  {
    name: 'article', 
    pattern: '/article/:slug', 
    page: 'client/Article/ArticlePage',
    displayName: 'Article'
  },
]