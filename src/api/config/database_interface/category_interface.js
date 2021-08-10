async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:admin@localhost:3306/estoquedb");
    console.log("Connect in MySQL");
    global.connection = connection;
    return connection;
}

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

module.exports = {selectCategorias, insertCategoria, updateCategoria, deleteCategoria}