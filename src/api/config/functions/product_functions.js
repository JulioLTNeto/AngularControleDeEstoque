const db = require("../database_interface/product_interface");
const express = require("express");
const functions = express();
const routes = require("../routes");
console.log("Start");

functions.getProdutos = async(req, res, next) =>{
    console.log('Select produtos');
    const produtos = await db.selectProdutos();
    
    console.log("Depois Client");
    console.log(produtos);
    return res.send(produtos);
}

functions.getProdutosFaltando =  async(req, res, next) =>{
    console.log("Chamou Get");
    const entrada = await db.selectProdutosFaltando();
    return res.send(entrada);
}

functions.getProdutoCodigo =  async(req, res, next) =>{
    console.log("Chamou Get");
    console.log(req.params.codigo);
    const entrada = await db.selectProdutoCodigo(req.params.codigo, 1);
    return res.send(entrada);
}

functions.getProdutoNome =  async(req, res, next) =>{
    console.log("Chamou Get");
    console.log(req.params.codigo);
    const entrada = await db.selectProdutoCodigo(req.params.codigo, 2);
    return res.send(entrada);
}

functions.getProdutoFornecedor =  async(req, res, next) =>{
    console.log("Chamou Get");
    console.log(req.params.codigo);
    const entrada = await db.selectProdutoCodigo(req.params.codigo, 3);
    return res.send(entrada);
}

functions.getProdutoCategoria =  async(req, res, next) =>{
    console.log("Chamou Get");
    console.log(req.params.codigo);
    const entrada = await db.selectProdutoCodigo(req.params.codigo, 4);
    return res.send(entrada);
}

functions.insertProduto =  async(req, res, next) =>{
    console.log("Insert Produtos");
    const entrada = await db.insertProduto(req.body);
    return res.send(entrada);
}

functions.updateProduto = async (req, res, next) =>{
    console.log("Update Produtos");
    console.log(req.body);
    const retorno = await db.updateProduto(req.body.id, req.body);
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

functions.deleteProduto = async (req, res, next) =>{
    console.log(req.params.id);
    await db.deleteProduto(req.params.id);
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