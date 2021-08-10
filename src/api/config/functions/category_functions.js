const db = require("../database_interface/category_interface");
const express = require("express");
const functions = express();
const routes = require("../routes");
console.log("Start");

functions.getCategorias = async(req, res, next) =>{
    console.log('Select * from categoria');
    const categorias = await db.selectCategorias();
    
    console.log("Depois Client");
    console.log(categorias);
    return res.send(categorias);
}

functions.insertCategoria =  async(req, res, next) =>{
    console.log("Insert categoria");
    const entrada = await db.insertCategoria(req.body);
    return res.send(entrada);
}

functions.updateCategoria = async (req, res, next) =>{
    console.log("Update categoria");
    console.log(req.body);
    const retorno = await db.updateCategoria(req.body.id, req.body);
    const response = {
        message: 'Pedido atualizado com sucesso',
        request: {
                type: 'put',
                description: 'atualiza os produtos',
                url: process.env.URL_API + 'orders'
            }
    }
    return res.send(response);
}

functions.deleteCategoria = async (req, res, next) =>{
    console.log(req.params.id);
    await db.deleteCategoria(req.params.id);
    const response = {
        message: 'Produto removido com sucesso',
        request: {
                type: 'delete',
                description: 'deleta os produtos',
                url: process.env.URL_API + 'orders'
        }
    }
    return res.send(response);
}

module.exports = functions;