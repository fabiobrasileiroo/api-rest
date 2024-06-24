import conexao from "./../database/conexao.js";
class SelecaoRepository {
	// CRUD
	create() {}
	findALL() {
		const sql = "SELECT * FROM selecoes;";
		return new Promise((resolve, reject) => {
			conexao.query(sql, (erro, resultado) => {
				if (erro) return reject("Não foi possível buscar as seleções");
				/* fazer o parse dos resultados */
				const row = JSON.parse(JSON.stringify(resultado));
				return resolve(row);
			});
		});
	}
	findById() {}
	update() {}

	delete() {}
}

export default new SelecaoRepository();
