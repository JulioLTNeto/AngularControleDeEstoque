/*async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:admin@localhost:3306/usuradb");
    console.log("Connect in MySQL");
    global.connection = connection;
    return connection;
}

async function selectCustomers(){
    const conn = await connect();
    const [rows] = await conn.query("select * from produtos");
    return await rows;
}

async function selectCustomersMissing(){
    const conn = await connect();
    const [rows] = await conn.query("select * from produtos where quantidade <= 0");
    return await rows;
}

async function selectCustomersCode(codigo){
    console.log(codigo);
    const conn = await connect();
    const sql2 = 'SELECT * FROM produtos where codigo_de_barras = ?;';
    const [rows] = await conn.query(sql2, codigo);
    console.log(rows);
    return await rows;
}

async function insertCustomer(body){
    const conn = await connect();
    const sql = 'insert into produtos(nome, codigo_de_barras, preco, quantidade, fornecedor_id, categoria_id) values (?,?,?,?,?,?);';
    const values = [body.nome, body.codigo_de_barras, body.preco, body.quantidade, body.fornecedor_id, body.categoria_id];
    const result = await conn.query(sql, values);

    const sql2 = 'SELECT * FROM produtos ORDER BY no DESC LIMIT 1;';
    const [rows] = await conn.query(sql2);
    console.log(rows);
    return await rows;
}

async function updateCustomer(id, customer){
    const conn = await connect();
    const sql = 'update produtos set nome = ?, codigo_de_barras = ?, preco = ?, quantidade = ?, fornecedor_id = ?, categoria_id = ? where id = ?;';
    const values = [customer.nome, customer.codigo_de_barras, customer.preco, customer.quantidade, customer.fornecedor_id, customer.categoria_id, id];
    return await conn.query(sql, values);
}

async function deleteCustomer(id){
    const conn = await connect();
    const sql = 'delete from produtos where id = ?;';
    await conn.query(sql, id);
}

//------------------------------------------------------------------------------------------------------------------
//                                            Manipulação da tabela Fornecedor
//------------------------------------------------------------------------------------------------------------------

async function selectFornecedor(){
    const conn = await connect();
    const [rows] = await conn.query("select * from fornecedor");
    return await rows;
}

async function insertFornecedor(body){
    const conn = await connect();
    const sql = 'insert into fornecedor(nome, cnpj) values (?,?);';
    const values = [body.nome, body.cnpj];
    const result = await conn.query(sql, values);

    const sql2 = 'SELECT * FROM fornecedor ORDER BY no DESC LIMIT 1;';
    const [rows] = await conn.query(sql2);
    console.log(rows);
    return await rows;
}

async function updateFornecedor(id, customer){
    const conn = await connect();
    const sql = 'update fornecedor set nome = ?, cnpj = ? where = ?;';
    const values = [customer.nome, body.cnpj, id];
    return await conn.query(sql, values);
}

async function deleteFornecedor(id){
    const conn = await connect();
    const sql = 'delete from fornecedor where id = ?;';
    await conn.query(sql, id);
}

//------------------------------------------------------------------------------------------------------------------
//                                            Manipulação da tabela Categoria
//------------------------------------------------------------------------------------------------------------------

async function selectCategorias(){
    const conn = await connect();
    const [rows] = await conn.query("select * from categoria");
    return await rows;
}

async function insertCategoria(body){
    const conn = await connect();
    const sql = 'insert into fornecedor(nome) values (?);';
    const values = [body.nome];
    const result = await conn.query(sql, values);

    const sql2 = 'SELECT * FROM categoria ORDER BY no DESC LIMIT 1;';
    const [rows] = await conn.query(sql2);
    console.log(rows);
    return await rows;
}

async function updateCategoria(id, customer){
    const conn = await connect();
    const sql = 'update fornecedor set nome = ? where = ?;';
    const values = [customer.nome, id];
    return await conn.query(sql, values);
}

async function deleteCategoria(id){
    const conn = await connect();
    const sql = 'delete from categoria where id = ?;';
    await conn.query(sql, id);
}
module.exports = {selectCustomers, selectCustomersMissing, selectCustomersCode, insertCustomer, updateCustomer, deleteCustomer, selectFornecedor, insertFornecedor, updateFornecedor, deleteFornecedor, selectCategorias, insertCategoria, updateCategoria, deleteCategoria}
*/