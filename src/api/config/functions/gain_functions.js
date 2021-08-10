const db = require("../database_interface/gain_interface");
const express = require("express");
const functions = express();
const routes = require("../routes");
console.log("Start");

functions.getLucro = async(req, res, next) =>{
    console.log('Select * from lucro');
    const categorias = await db.selectLucro();
    
    console.log("Depois Client");
    console.log(categorias);
    return res.send(categorias);
}

functions.insertLucro =  async(req, res, next) =>{
    console.log("Insert lucro");
    const entrada = await db.insertLucro(req.body);
    return res.send(entrada);
}

functions.updateLucro = async (req, res, next) =>{
    console.log("Update lucro");
    console.log(req.body);
    const retorno = await db.updateLucro(req.body.id, req.body);
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

functions.deleteLucro = async (req, res, next) =>{
    console.log(req.params.id);
    await db.deleteLucro(req.params.id);
    const response = {
        message: 'Lucro removido com sucesso',
        request: {
                type: 'delete',
                description: 'deleta os produtos',
                url: process.env.URL_API + 'orders'
        }
    }
    return res.send(response);
}

module.exports = functions;