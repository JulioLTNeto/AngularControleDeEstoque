/*const db = require("../db");
const express = require("express");
const functions = express();
const routes = require("./routes");
console.log("Start");

functions.getValues = async(req, res, next) =>{
    console.log('Select * from produtos');
    const produtos = await db.selectCustomers();
    
    console.log("Depois Client");
    console.log(produtos);
    return res.send(produtos);
}

functions.getValuesCodigo =  async(req, res, next) =>{
    console.log("Chamou Get");
    console.log(req.params.codigo);
    const entrada = await db.selectCustomersCode(req.params.codigo);
    return res.send(entrada);
}

functions.insertValues =  async(req, res, next) =>{
    console.log("Insert Produtos");
    const entrada = await db.insertCustomer(req.body);
    return res.send(entrada);
}

functions.updateValues = async (req, res, next) =>{
    console.log("Update Produtos");
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

functions.deleteValues = async (req, res, next) =>{
    console.log(req.params.id);
    await db.deleteCustomer(req.params.id);
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

//--------------------------------------------------------------------------------------------------------------------
//                                          Manipulação tabela produtos
//--------------------------------------------------------------------------------------------------------------------

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

//--------------------------------------------------------------------------------------------------------------------
//                                          Manipulação tabela categoria
//--------------------------------------------------------------------------------------------------------------------

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

module.exports = functions;*/