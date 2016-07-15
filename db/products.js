module.exports = (function(){

var productsArr = [];
var uniqueId = 0;

function _get(req,res){
  productsArr.push(req.body);
  res.send(productsArr);
}

function _post(req,res){
  req.body.id = uniqueId++;
  productsArr.push(req.body);
  res.send({'success': true});
}

function _put(req,res){
  for(var i = 0; i < productsArr.length; i++){
    if (parseFloat(req.body.id) === productsArr[i].id) {
      for(var key in req.body){
        productsArr[i][key] = req.body[key];
      }
      res.status(200).send({'success':true});
      return;
    }
  }
  res.send({'success': false});
}

function _delete(req,res){
  console.log(parseFloat(req.params.id),'<----req.params');
  for (var i = 0; i < productsArr.length; i++) {
    if(parseFloat(req.params.id)===productsArr[i].id){
      productsArr.splice(i,1);
      res.status(200).send({'success':true});
      return;
    }
  }
  res.send({'success': false});
}


  return {
    get: _get,
    post: _post,
    put: _put,
    delete: _delete

  };
})();