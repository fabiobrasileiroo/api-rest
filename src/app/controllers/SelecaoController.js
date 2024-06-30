import conexao from "../database/conexao.js";
class SelecaoController {

  base(req, res) {
    res.send("Api Rest rodando!");
  }
  index(req, res) {
    const sql = "SELECT * FROM selecoes;";
    conexao.query(sql, (erro, resultado) => {
      if (erro) {
        console.log(erro);
        res.status(404).json({ erro: "Dados não encontrados!" });
      } else {
        res.status(200).json(resultado);
      }
    });
  }

  show(req, res) {
    const id = req.params.id;
    const sql = `SELECT * FROM selecoes WHERE id=?`;
    conexao.query(sql, [id], (erro, resultado) => {
      if (erro) {
        res.status(404).json({ erro: "Dados não encontrados!" });
      } else {
        res.status(200).json(resultado[0]);
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

// padrão Singleton
export default new SelecaoController();
