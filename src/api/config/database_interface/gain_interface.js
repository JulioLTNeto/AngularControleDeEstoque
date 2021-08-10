async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:admin@localhost:3306/estoquedb");
    console.log("Connect in MySQL");
    global.connection = connection;
    return connection;
}

async function selectLucros(){
    const conn = await connect();
    const [rows] = await conn.query("select * from lucro");
    return await rows;
}

async function insertLucro(body){
    const conn = await connect();
    const sql = 'insert into lucro(data, valor, intervalo_lucro) values (?,?,?);';
    const values = [body.data, body.valor, body.intervalo_lucro];
    const result = await conn.query(sql, values);

    const sql2 = 'SELECT * FROM lucro ORDER BY no DESC LIMIT 1;';
    const [rows] = await conn.query(sql2);
    console.log(rows);
    return await rows;
}

async function updateLucro(id, customer){
    const conn = await connect();
    const sql = 'update lucro set data = ?, valor = ?, intervalo_lucro = ? where = ?;';
    const values = [customer.data, customer.valor, customer.intervalo_lucro, id];
    return await conn.query(sql, values);
}

async function deleteLucro(id){
    const conn = await connect();
    const sql = 'delete from lucro where id = ?;';
    await conn.query(sql, id);
}

module.exports = {selectLucros, insertLucro, updateLucro, deleteLucro}