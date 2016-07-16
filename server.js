const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const app = express();
const products = require('./db/products');
const methodOverride = require('method-override');
const articleRoute = require('./routes/articles');

app.set('view engine','jade');
app.set('views', './templates');

//----MIDDLEWARE----
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {extended:true} ) );
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.get('/products', (req,res)=>{
  res.render('products/index', {
    products: products.productsArr
  });
});

app.get('/products/:id/edit', (req,res)=>{
  var itemVar = products.itemById(req,res);
  res.render('products/edit', {
    itemId: itemVar
  });
});

app.get('/products/new', (req,res)=>{
  res.render('products/new', {
  });
});

// app.get('/products', products.get);
app.post('/products', products.post);
app.put('/products/:id', products.put);
app.delete('/products/:id', products.delete);

app.use('/articles', articleRoute);

const server = app.listen( 3000, () => {
  let host = server.address().address;
  let port = server.address().port;

  console.log( `Server listening at http://localhost:${port}` );
});