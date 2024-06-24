import conexao from "../database/conexao.js";
import SelecaoRepository from "../repositories/SelecaoRepository.js";
class SelecaoController {
	table(req, res) {
		const sql = "describe selecoes";
		conexao.query(sql, (erro, resultado) => {
			if (erro) {
				res.status(404).json({ erro: `Dados nao encontrados: ${erro}` });
			} else {
				res.status(200).json(resultado);
			}
		});
	}

	base(req, res) {
		res.send("Api Rest rodando!");
	}
	async index(req, res) {
		const row = await SelecaoRepository.findALL();
		res.json(row);
	}
	show(req, res) {
		const id = req.params.id;
		const sql = "SELECT * FROM selecoes WHERE id=?";
		conexao.query(sql, id, (erro, resultado) => {
			const linha = resultado[0];
			if (erro) {
				res.status(404).json({ erro: `Dados nao encontrados: ${erro}` });
			} else {
				res.status(200).json(linha);
			}
		});
	}

	store(req, res) {
		const selecao = req.body;
		const sql = "INSERT INTO selecoes SET ?;";
		conexao.query(sql, selecao, (erro, resultado) => {
			if (erro) {
				res.status(404).json({ erro: erro });
			} else {
				res.status(201).json(resultado);
			}
		});
	}
	update(req, res) {
		const id = req.params.id;
		const selecao = req.body;
		const sql = "UPDATE selecoes SET ? WHERE id=?;";
		conexao.query(sql, [selecao, id], (erro, resultado) => {
			if (erro) {
				res.status(404).json({ erro: erro });
			} else {
				res.status(201).json(resultado);
			}
		});
	}
	delete(req, res) {
		const id = req.params.id;
		console.log(id);
		const sql = "DELETE FROM selecoes WHERE id=?;";
		conexao.query(sql, id, (erro, resultado) => {
			if (erro) {
				res.status(404).json({ erro: erro });
			} else {
				res.status(200).json(resultado);
			}
		});
	}
}

// padrão singleton
export default new SelecaoController();
