async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:admin@localhost:3306/estoquedb");
    console.log("Connect in MySQL");
    global.connection = connection;
    return connection;
}

async function selectFornecedor(){
    const conn = await connect();
    const [rows] = await conn.query("select * from fornecedor");
    return await rows;
}

async function insertFornecedor(body){
    const conn = await connect();
    const sql = 'insert into fornecedor(nome, cnpj, estado, cidade, bairro, numero, complemento) values (?,?,?,?,?,?,?);';
    const values = [body.nome, body.cnpj, body.estado, body.cidade, body.bairro, body.numero, body.complemento];
    const result = await conn.query(sql, values);

    const sql2 = 'SELECT * FROM fornecedor ORDER BY no DESC LIMIT 1;';
    const [rows] = await conn.query(sql2);
    console.log(rows);
    return await rows;
}

async function updateFornecedor(id, customer){
    const conn = await connect();
    const sql = 'update fornecedor set nome = ?, cnpj = ?, estado = ?, cidade = ?, bairro = ?, numero = ?, complemento =  ? where = ?;';
    const values = [customer.nome, body.cnpj, customer.estado, customer.cidade, customer.bairro, customer.numero, customer.complemento, id];
    return await conn.query(sql, values);
}

async function deleteFornecedor(id){
    const conn = await connect();
    const sql = 'delete from fornecedor where id = ?;';
    await conn.query(sql, id);
}

module.exports = {selectFornecedor, insertFornecedor, updateFornecedor, deleteFornecedor}