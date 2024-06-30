import mysql from "mysql2";

const conexao = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	// password: 'fhmb99',
	password: "C,03x1LSOxv8",
	// database: 'bdcopa',
	database: "bdCopa",
});

conexao.connect((err) => {
	if (err) {
		console.error("Erro ao conectar ao banco de dados:", err);
		return;
	}
	console.log("Conectado ao banco de dados com sucesso!");
});

export default conexao;
