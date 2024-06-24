// import express from "express";
// import conexao from "../infra/conexao.js";
// import session from "express-session";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

// const app = express();
// const login = "admin";
// const password = "123456";

// app.use(express.json());
// app.use(
// 	session({
// 		secret: process.env.SESSION_SECRET || "default_session_secret",
// 		resave: false,
// 		saveUninitialized: false,
// 	}),
// );

// console.log(process.env.SESSION_SECRET);
// const JWT_SECRET = process.env.JWT_SECRET;

// if (!JWT_SECRET) {
// 	console.error(
// 		"JWT_SECRET não está definido. Verifique suas variáveis de ambiente.",
// 	);
// 	process.exit(1);
// }

// function generateToken(user) {
// 	return jwt.sign(user, JWT_SECRET, { expiresIn: "1h" });
// }

// function verifyToken(req, res, next) {
// 	const token = req.headers["authorization"];

// 	if (!token) {
// 		return res.status(401).send("Token não fornecido");
// 	}

// 	jwt.verify(token, JWT_SECRET, (err, decoded) => {
// 		if (err) {
// 			return res.status(401).send("Token inválido");
// 		}
// 		req.user = decoded;
// 		next();
// 	});
// }

// app.get("/", (req, res) => {
// 	res.send("Api Rest rodando!");
// });

// app.post("/login", (req, res) => {
// 	const { login: userLogin, senha } = req.body;

// 	if (userLogin === login && senha === password) {
// 		const token = generateToken({ login: userLogin });
// 		res.status(200).json({ token });
// 	} else {
// 		res.status(404).send("Login ou senha inválidos!");
// 	}
// });

// app.get("/selecoes", verifyToken, (req, res) => {
// 	const sql = "SELECT * FROM selecoes;";
// 	conexao.query(sql, (erro, resultado) => {
// 		if (erro) {
// 			console.log(erro);
// 			res.status(404).json({ erro: "Dados não encontrados!" });
// 		} else {
// 			res.status(200).json(resultado);
// 		}
// 	});
// });

// app.get("/selecoes/:id", verifyToken, (req, res) => {
// 	const id = req.params.id;
// 	const sql = `SELECT * FROM selecoes WHERE id=?`;
// 	conexao.query(sql, [id], (erro, resultado) => {
// 		if (erro) {
// 			res.status(404).json({ erro: "Dados não encontrados!" });
// 		} else {
// 			res.status(200).json(resultado[0]);
// 		}
// 	});
// });

// app.post("/selecoes", verifyToken, (req, res) => {
// 	const { selecao, grupo } = req.body;
// 	const sql = `INSERT INTO selecoes (selecao, grupo) VALUES (?, ?)`;
// 	conexao.query(sql, [selecao, grupo], (erro, resultado) => {
// 		if (erro) {
// 			console.log(erro);
// 			res.status(500).json({ erro: "Erro ao criar seleção!" });
// 		} else {
// 			res.status(201).send("Seleção criada com sucesso!");
// 		}
// 	});
// });

// app.delete("/selecoes/:id", verifyToken, (req, res) => {
// 	const id = req.params.id;
// 	const sql = `DELETE FROM selecoes WHERE id=?`;
// 	conexao.query(sql, [id], (erro, resultado) => {
// 		if (erro) {
// 			console.log(erro);
// 			res.status(500).json({ erro: "Erro ao excluir seleção!" });
// 		} else {
// 			res.send(`Seleção com id ${id} excluída com sucesso!`);
// 		}
// 	});
// });

// app.put("/selecoes/:id", verifyToken, (req, res) => {
// 	const id = req.params.id;
// 	const { selecao, grupo } = req.body;
// 	const sql = `UPDATE selecoes SET selecao=?, grupo=? WHERE id=?`;
// 	conexao.query(sql, [selecao, grupo, id], (erro, resultado) => {
// 		if (erro) {
// 			console.log(erro);
// 			res.status(500).json({ erro: "Erro ao atualizar seleção!" });
// 		} else {
// 			res.send("Seleção atualizada com sucesso!");
// 		}
// 	});
// });

// // const PORT = process.env.PORT || 3000;
// // app.listen(PORT, () => {
// //   console.log(`Server on port http://localhost:${PORT}`);
// // });

// export default app;
