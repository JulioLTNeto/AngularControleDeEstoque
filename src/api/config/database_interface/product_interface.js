async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:admin@localhost:3306/estoquedb");
    console.log("Connect in MySQL");
    global.connection = connection;
    return connection;
}

async function selectProdutos(){
    const conn = await connect();
    const [rows] = await conn.query("select * from produtos");
    return await rows;
}

async function selectProdutosFaltando(){
    const conn = await connect();
    const [rows] = await conn.query("select * from produtos where quantidade <= 0");
    return await rows;
}

async function selectProdutoCodigo(codigo, opcao){
    console.log(codigo);
    const conn = await connect();
    let sql2 = "";
    if(opcao == 1){
        sql2 = 'SELECT * FROM produtos where codigo_de_barras = ?;';
    }else if(opcao == 2){
        sql2 = 'SELECT * FROM produtos where nome = ?;';
    }else if(opcao == 3){
        sql2 = 'SELECT * FROM produtos where fornecedor_id = ?;';
    }else{
        sql2 = 'SELECT * FROM produtos where categoria_id = ?;';
    }
    const [rows] = await conn.query(sql2, codigo);
    console.log(rows);
    return await rows;
}

async function insertProduto(body){
    const conn = await connect();
    const sql = 'insert into produtos(nome, codigo_de_barras, imagem, preco, quantidade, fornecedor_id, categoria_id) values (?,?,?,?,?,?,?);';
    const values = [body.nome, body.codigo_de_barras, body.imagem, body.preco, body.quantidade, body.fornecedor_id, body.categoria_id];
    const result = await conn.query(sql, values);

    const sql2 = 'SELECT * FROM produtos ORDER BY no DESC LIMIT 1;';
    const [rows] = await conn.query(sql2);
    console.log(rows);
    return await rows;
}

async function updateProduto(id, customer){
    const conn = await connect();
    const sql = 'update produtos set nome = ?, codigo_de_barras = ?, imagem = ?, preco = ?, quantidade = ?, fornecedor_id = ?, categoria_id = ? where id = ?;';
    const values = [customer.nome, customer.codigo_de_barras, customer.imagem, customer.preco, customer.quantidade, customer.fornecedor_id, customer.categoria_id, id];
    return await conn.query(sql, values);
}

async function deleteProduto(id){
    const conn = await connect();
    const sql = 'delete from produtos where id = ?;';
    await conn.query(sql, id);
}

module.exports = {deleteProduto, updateProduto, insertProduto, selectProdutoCodigo, selectProdutosFaltando, selectProdutos}
