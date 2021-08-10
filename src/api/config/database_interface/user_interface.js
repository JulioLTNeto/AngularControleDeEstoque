async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:admin@localhost:3306/estoquedb");
    console.log("Connect in MySQL");
    global.connection = connection;
    return connection;
}

async function selectUsuarios(){
    const conn = await connect();
    console.log("Searching in Database");
    const [rows] = await conn.query("select * from usuario");
    return await rows;
}

async function loginUsuario(body){
    const conn = await connect();
    const sql = 'select * from usuario where login = ? && senha = ?';
    const values = [body.login, body.senha];
    console.log(body.login);
    console.log(body.senha);
    console.log(body);
    const [result] = await conn.query(sql, values);

    console.log(result);
    return await result;
}

async function insertUsuario(body){
    const conn = await connect();
    const sql = 'insert into usuario(login, senha, nome, nivel) values (?,?,?,?);';
    const values = [body.login, body.senha, body.nome, body.nivel];
    const result = await conn.query(sql, values);

    const sql2 = 'SELECT * FROM usuario ORDER BY no DESC LIMIT 1;';
    const [rows] = await conn.query(sql2);
    console.log(rows);
    return await rows;
}

async function updateUsuario(id, customer){
    const conn = await connect();
    const sql = 'update usuario set login = ?, senha = ?, nome = ?, nivel = ? where = ?;';
    const values = [customer.data, customer.valor, customer.intervalo_lucro, id];
    return await conn.query(sql, values);
}

async function deleteUsuario(id){
    const conn = await connect();
    const sql = 'delete from usuario where id = ?;';
    await conn.query(sql, id);
}

module.exports = {selectUsuarios, loginUsuario, insertUsuario, updateUsuario, deleteUsuario}