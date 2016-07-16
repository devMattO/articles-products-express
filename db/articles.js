module.exports = (function(){

let articleDB = [];
let id = 0;

function _add(itemToAdd, callback){
  articleDB.push(itemToAdd);
  itemToAdd.id = id++;
  let urlTitle = encodeURI(itemToAdd.title);
  itemToAdd.urlTitle = urlTitle;
  console.log(articleDB,'<----articleDB');

  if(articleDB.includes(itemToAdd)){
    return callback(null, {'success': true});
  }else{
    return callback({'success': false});
  }
}

function _edit(titleToFind,reqBody,callback){
  var urlTitle = encodeURI(reqBody.title);
  for(var i = 0; i < articleDB.length; i++) {
    if(articleDB[i].id==titleToFind){
      for(var key in reqBody){
        articleDB[i][key] = reqBody[key];
      }
      console.log(articleDB,'<----articleDB');
      return callback(null,{'success':true});
    }
  }
  return callback({'success': false});
}



return {
  add: _add,
  edit: _edit
};



})();