const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// Register middleware
app.use( (req, res, next) =>{
   var now = new Date().toString();

   // Information about request can be read here. e.g HTTP method used, what kind of device made the request, etc.
   var log = `${now}: ${req.method} ${req.url}`;
   console.log(log);
   fs.appendFile('server.log', log + '\n', (err) =>{
     if(err){
       console.log('error saving file');
     }
   });
   next();
});

// app.use((req, res, next) =>{
//   res.render('construction.hbs', {
//     msg: 'page under mantainence'
//   });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () =>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>{
  return text.toUpperCase();
});

app.get('/', (req, res) =>{
  //res.send('<h1>Hola express!!</h1>>');
  res.render('home.hbs',{
  user: {
    name: 'Guagua',
    food: ['pizza',
    'burguer',
    'hotdog']},
  welcomeMessage: 'Hello this is Dog!!',
  pageTitle: 'Home Page'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs',{
    pageTitle: 'About page' });
});

app.get('/bad', (req, res) =>{
  res.send({
    error:'you causes a crashhh!!',
    action: 'fix it!!'
  });
});

app.listen(3000, () => {
  console.log('Server is up and running');
});
