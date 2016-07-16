const express = require('express');
const Router = express.Router();
const articleModel = require('../db/articles');
// localhost/articles would be this
Router.post('/', (req,res)=>{
  articleModel.add(req.body, (err,status)=>{
    if(err){res.status(500).send(err);}
    return res.status(200).send(status);
  });
});

Router.put('/:title', (req,res)=>{
  articleModel.edit(req.params.title, req.body, (err,status)=>{
    if(err){res.status(500).send(err);}
    return res.status(200).send(status);
  });
});






module.exports = Router;