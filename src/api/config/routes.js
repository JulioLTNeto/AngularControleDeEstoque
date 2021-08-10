const express = require('express')
const routes = express.Router()
//const functions = require('./functions')
const product_functions = require('./functions/product_functions')
const provider_functions = require('./functions/provider_function')
const gain_functions = require('./functions/gain_functions')
const user_functions = require('./functions/user_functions')
const category_functions = require('./functions/category_functions')
const sales_functions = require('./functions/sales_functions')
/*
var db = {
    id: null,
    name: '',
    weight: null,
    symbol: ''
};*/

//Produto
routes.get('/getProdutos', product_functions.getProdutos);
routes.get('/getProdutosFaltando', product_functions.getProdutosFaltando);
routes.get('/getProdutosPorCodigo/:codigo', product_functions.getProdutoCodigo);
routes.get('/getProdutosPorNome/:codigo', product_functions.getProdutoNome);
routes.get('/getProdutosPorFornecedor/:codigo', product_functions.getProdutoFornecedor);
routes.get('/getProdutosPorCategoria/:codigo', product_functions.getProdutoCategoria);
routes.post('/addProduto', product_functions.insertProduto);
routes.delete('/deleteProduto/:id', product_functions.deleteProduto); 
routes.put('/updateProduto', product_functions.updateProduto);

//Fornecedor
routes.get('/getFornecedores', provider_functions.getFornecedor);
routes.post('/addFornecedor', provider_functions.insertFornecedor);
routes.put('/updateFornecedor', provider_functions.updateFornecedor);
routes.delete('/deleteFornecedor/:id', provider_functions.deleteFornecedor); 

//Categoria
routes.get('/getCategorias', category_functions.getCategorias);
routes.post('/addCategoria', category_functions.insertCategoria);
routes.put('/updateCategoria', category_functions.updateCategoria);
routes.delete('/deleteCategoria/:id', category_functions.deleteCategoria); 

//Lucro
routes.get('/getLucro', gain_functions.getLucro);
routes.post('/addLucro', gain_functions.insertLucro);
routes.put('/updateLucro', gain_functions.updateLucro);
routes.delete('/deleteLucro/:id', gain_functions.deleteLucro); 

//Vendas
routes.get('/getVendas', sales_functions.getVendas);
routes.post('/addVenda', sales_functions.insertVenda);
routes.put('/updateVenda', sales_functions.updateVenda);
routes.delete('/deleteVenda/:id', sales_functions.deleteVenda); 

//Usuarios
routes.get('/getUsuarios', user_functions.getUsuarios);
routes.post('/loginUsuario', user_functions.loginUsuario);
routes.post('/addUsuario', user_functions.insertUsuario);
routes.put('/updateUsuario', user_functions.updateUsuario);
routes.delete('/deleteUsuario/:id', user_functions.deleteUsuario);

module.exports = routes;