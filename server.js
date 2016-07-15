const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const app = express();
const products = require('./db/products');

app.set('view engine','jade');
app.set('views', './templates');

//----MIDDLEWARE----
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {extended:true} ) );


app.get('/products', (req,res)=>{
  res.render('products/index', {
    products: products.productsArr
  });
});

app.get('/products', (req,res)=>{

});

// app.get('/products', products.get);
app.post('/products', products.post);
app.put('/products/:id', products.put);
app.delete('/products/:id', products.delete);

const server = app.listen( 3000, () => {
  let host = server.address().address;
  let port = server.address().port;

  console.log( `Server listening at http://localhost:${port}` );
});