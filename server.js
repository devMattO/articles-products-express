const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const app = express();
const productRoute = require('./routes/products');
const articleRoute = require('./routes/articles');
const methodOverride = require('method-override');

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

app.use('/products', productRoute);
app.use('/articles', articleRoute);


const server = app.listen( 3000, () => {
  let host = server.address().address;
  let port = server.address().port;

  console.log( `Server listening at http://localhost:${port}` );
});