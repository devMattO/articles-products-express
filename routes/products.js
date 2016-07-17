const express = require('express');
const Router = express.Router();
const productModel = require('../db/products');

Router.post('/', (req,res)=>{
  productModel.post(req.body, (err,status)=>{
    if(err){res.status(500).send(err);}
    return res.status(200).send(status);
  });
});

Router.put('/:id', (req,res)=>{
  productModel.put(req.body, (err,status)=>{
    if(err){res.status(500).send(err);}
    return res.status(200).send(status);
  });
});

Router.delete('/:id', (req,res)=>{
  productModel.delete(req, (err,status)=>{
    if (err) {res.status(500).send(status);}
    return res.status(200).send(status);
  });
});

Router.get('/', (req,res)=>{
  productModel.all((err,data)=>{
    if (err) {res.status(500).send(data);}
    return res.render('products/index', {
      products: data
    });
  });
});

Router.get('/:id/edit', (req,res)=>{
  productModel.all((err,data)=>{
    if (err) {res.status(500).send(data);}
    return res.render('products/edit', {
      products: data
    });
  });
});

Router.get('/new', (req,res)=>{
  res.render('products/new');
});

module.exports = Router;