module.exports = (function(){

let _articleDB = [];
let id = 0;

function _add(itemToAdd, callback){
  _articleDB.push(itemToAdd);
  itemToAdd.id = id++;
  let urlTitle = encodeURI(itemToAdd.title);
  itemToAdd.urlTitle = urlTitle;
  console.log(_articleDB,'<----_articleDB post');

  if(_articleDB.includes(itemToAdd)){
    return callback(null, {'success': true});
  }else{
    return callback({'success': false});
  }
}

function _edit(titleToFind,reqBody,callback){
  // var urlTitle = encodeURI(reqBody.title);
  for(var i = 0; i < _articleDB.length; i++) {
    if(_articleDB[i].title==reqBody.title){
      for(var key in reqBody){
        _articleDB[i][key] = reqBody[key];
      }
      console.log(_articleDB,'<----_articleDB edit');
      return callback(null,{'success':true});
    }
  }
  return callback({'success': false});
}

function _delete(itemToDelete,callback){
  console.log(itemToDelete,'<----itemToDelete');
  for (var i = 0; i < _articleDB.length; i++) {
    if(_articleDB[i].title===itemToDelete){
      _articleDB.splice(i,1);
      console.log(_articleDB,'<----_articleDB delete');
      return callback(null,{'success': true});
    }
  }
  return callback({'success': false});
}

function _all(callback){
  if(_articleDB.length===0){
    return callback('Nothing in here bruh');
  }else{
    return callback(null,_articleDB);
  }
}

return {
  all:_all,
  add: _add,
  edit: _edit,
  delete: _delete,
  // articleDB: _articleDB
};


})();