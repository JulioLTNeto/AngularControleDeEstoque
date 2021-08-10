const db = require("../database_interface/sales_interface");
const express = require("express");
const functions = express();
const routes = require("../routes");
console.log("Start");

functions.getVendas = async(req, res, next) =>{
    console.log('Select vendas');
    const categorias = await db.selectVendas();
    
    console.log("Depois Client");
    console.log(categorias);
    return res.send(categorias);
}

functions.insertVenda = async(req, res, next) =>{
    console.log("Insert vendas");
    const entrada = await db.insertVenda(req.body);
    return res.send(entrada);
}

functions.updateVenda = async (req, res, next) =>{
    console.log("Update vendas");
    console.log(req.body);
    const retorno = await db.updateVenda(req.body.id, req.body);
    const response = {
        message: 'Vendas atualizado com sucesso',
        request: {
                type: 'put',
                description: 'atualiza os produtos',
                url: process.env.URL_API + 'orders'
            }
    }
    return res.send(response);
}

functions.deleteVenda = async (req, res, next) =>{
    console.log(req.params.id);
    await db.deleteVenda(req.params.id);
    const response = {
        message: 'Vendas removido com sucesso',
        request: {
                type: 'delete',
                description: 'deleta os produtos',
                url: process.env.URL_API + 'orders'
        }
    }
    return res.send(response);
}

module.exports = functions;