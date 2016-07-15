module.exports = (function(){

var _productsArr = [];
var _uniqueId = 0;

// function _get(req,res){
//   _productsArr.push(req.body);
//   res.send(_productsArr);
// }

function _post(req,res){
  req.body.id = _uniqueId++;
  _productsArr.push(req.body);
  console.log(req.body,'<----req.body');
  res.send({'success': true});
}

function _put(req,res){
  for(var i = 0; i < _productsArr.length; i++){
    if (parseFloat(req.body.id) === _productsArr[i].id) {
      for(var key in req.body){
        _productsArr[i][key] = req.body[key];
      }
      res.status(200).send({'success':true});
      return;
    }
  }
  res.send({'success': false});
}

function _delete(req,res){
  console.log(parseFloat(req.params.id),'<----req.params');
  for (var i = 0; i < _productsArr.length; i++) {
    if(parseFloat(req.params.id)===_productsArr[i].id){
      _productsArr.splice(i,1);
      res.status(200).send({'success':true});
      return;
    }
  }
  res.send({'success': false});
}


  return {
    productsArr : _productsArr,
    uniqueId : _uniqueId,
    // get: _get,
    post: _post,
    put: _put,
    delete: _delete
  };

})();