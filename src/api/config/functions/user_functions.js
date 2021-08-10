const db = require("../database_interface/user_interface");
const express = require("express");
const functions = express();
const routes = require("../routes");
console.log("Start");

functions.getUsuarios = async(req, res, next) =>{
    console.log('Select usuarios');
    const categorias = await db.selectUsuarios();
    
    console.log("Depois Client");
    console.log(categorias);
    return res.send(categorias);
}

functions.loginUsuario =  async(req, res, next) =>{
    console.log("Login usuario");
    console.log(req.body);
    let login = req.body.login;
    let senha = req.body.senha;
    const entrada = await db.loginUsuario(req.body);
    return res.send(entrada);
}

functions.insertUsuario =  async(req, res, next) =>{
    console.log("Insert usuario");
    const entrada = await db.insertUsuario(req.body);
    return res.send(entrada);
}

functions.updateUsuario = async (req, res, next) =>{
    console.log("Update categoria");
    console.log(req.body);
    const retorno = await db.updateUsuario(req.body.id, req.body);
    const response = {
        message: 'Usuario atualizado com sucesso',
        request: {
                type: 'put',
                description: 'atualiza os produtos',
                url: process.env.URL_API + 'orders'
            }
    }
    return res.send(response);
}

functions.deleteUsuario = async (req, res, next) =>{
    console.log(req.params.id);
    await db.deleteUsuario(req.params.id);
    const response = {
        message: 'Usuario removido com sucesso',
        request: {
                type: 'delete',
                description: 'deleta os produtos',
                url: process.env.URL_API + 'orders'
        }
    }
    return res.send(response);
}

module.exports = functions;