const db = require("../database_interface/provider_interface");
const express = require("express");
const functions = express();
const routes = require("../routes");
console.log("Start");

functions.getFornecedor = async(req, res, next) =>{
    console.log('Select * from fornecedor');
    const fornecedores = await db.selectFornecedor();
    
    console.log("Depois Client");
    console.log(fornecedores);
    return res.send(fornecedores);
}

functions.insertFornecedor =  async(req, res, next) =>{
    console.log("Insert fornecedor");
    const entrada = await db.insertFornecedor(req.body);
    return res.send(entrada);
}

functions.updateFornecedor = async (req, res, next) =>{
    console.log("Update Fornecedor");
    console.log(req.body);
    const retorno = await db.updateCustomer(req.body.id, req.body);
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

functions.deleteFornecedor = async (req, res, next) =>{
    console.log(req.params.id);
    await db.deleteFornecedor(req.params.id);
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