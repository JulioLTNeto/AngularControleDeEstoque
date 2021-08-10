async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:admin@localhost:3306/estoquedb");
    console.log("Connect in MySQL");
    global.connection = connection;
    return connection;
}

async function selectVendas(){
    const conn = await connect();
    const [rows] = await conn.query("select * from vendas");
    return await rows;
}

async function insertVenda(body){
    const conn = await connect();
    const sql = 'insert into vendas(valor, data, produtos_id, usuario_id) values (?, ?, ?, ?);';
    const values = [body.nome, body.data, body.produtos_id, body.usuario_id];
    const result = await conn.query(sql, values);

    const sql2 = 'SELECT * FROM vendas ORDER BY no DESC LIMIT 1;';
    const [rows] = await conn.query(sql2);
    console.log(rows);
    return await rows;
}

async function updateVenda(id, customer){
    const conn = await connect();
    const sql = 'update vendas set nome = ?, data = ? where = ?;';
    const values = [customer.nome, customer.data, id];
    return await conn.query(sql, values);
}

async function deleteVenda(id){
    const conn = await connect();
    const sql = 'delete from vendas where id = ?;';
    await conn.query(sql, id);
}

module.exports = {selectVendas, insertVenda, updateVenda, deleteVenda}