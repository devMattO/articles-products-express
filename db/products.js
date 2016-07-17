module.exports = (function(){

var _productsArr = [];
var _uniqueId = 0;

function _post(reqBody,callback){
  reqBody.id = _uniqueId++;
  _productsArr.push(reqBody);

  if(_productsArr.includes(reqBody)){
    return callback(null, {'success': true});
  }else{
    return callback({'success': false});
  }

}

function _put(reqBody,callback){
  for(var i = 0; i < _productsArr.length; i++){
    if (parseFloat(reqBody.id) === _productsArr[i].id) {
      for(var key in reqBody){
        _productsArr[i][key] = reqBody[key];
      }
      return callback(null, {'success':true});
    }
  }
  return callback({'success': false});
}

function _delete(req,res){
  for (var i = 0; i < _productsArr.length; i++) {
    if(parseFloat(req.params.id)===_productsArr[i].id){
      _productsArr.splice(i,1);
      return callback(null,{'success':true});
    }
  }
  return callback({'success': false});
}

//return one item in arr
function _itemById(req,res){
  for (var j = 0; j < _productsArr.length; j++) {
    if(parseFloat(req.params.id)===_productsArr[j].id){
      return _productsArr[j];
    }
  }
}

function _all(callback){
  if(_productsArr.length===0){
    return callback('Nothing in here bruh');
  }else{
    return callback(null,_productsArr);
  }
}

  return {
    all: _all,
    post: _post,
    put: _put,
    delete: _delete,
    itemById: _itemById
  };

})();