import express from 'express'
import conexao from './database/conexao.js'
import session from 'express-session';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env


const app = express()

app.use(express.json())

const login = 'admin';
const password = '123456';

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_session_secret',
  resave: false,
  saveUninitialized: false
}));

console.log(process.env.SESSION_SECRET);
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error('JWT_SECRET não está definido. Verifique suas variáveis de ambiente.');
  process.exit(1);
}

function generateToken(user) {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
}

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  console.log(token)
  
  if (!token) {
    return res.status(401).send('Token não fornecido');
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send('Token inválido');
    }
    req.user = decoded;
    next();
  });
}

app.post('/login', (req, res) => {
  const { userLogin, senha } = req.body;
  console.log("🚀 ~ app.post ~ userLogin:", userLogin)
  console.log("🚀 ~ app.post ~ login:", login)

  console.log("🚀 ~ app.post ~ senha:", userLogin , login,senha === password)

  if (userLogin === login && senha === password) {
    const token = generateToken({ userLogin });
    res.status(200).json({ token });
  } else {
    res.status(404).send('Login ou senha inválidos!');
  }
});

function buscarIndexSelecao(id) {
  return selecoes.filter(selecao => selecao.id == id)
}

// pegar a posição ou index do elemento no array por id
function buscarIdSelecao(id) {
  return selecoes.findIndex(selecao => selecao.id == id)
}
app.get('/', (req, res) => {
  res.send('Api Rest rodando!')
})

// fetch all 
app.get('/selecoes', verifyToken, (req, res) => {
  // res.send(selecoes)
  const sql = "SELECT * FROM selecoes;"
  conexao.query(sql, (erro, resultado) => {
    if (erro) {
      console.log(erro)
      res.status(404).json({ 'erro': 'Dados nao encontrados!' })
    } else {
      res.status(200).json(resultado)
    }
  })
})

// fetch por id
app.get('/selecoes/:id', (req, res) => {
  const id = req.params.id
  const sql = `SELECT * FROM selecoes WHERE id=?`
  conexao.query(sql, id, (erro, resultado) => {
    // console.log(resultado)
    const linha = resultado[0]
    if (erro) {
      res.status(404).json({ 'erro': 'Dados nao encontrados!' })
    } else {
      res.status(200).json(linha)
    }
  })
  // res.json(buscarIndexSelecao(req.params.id))
})

app.post('/selecoes', (req, res) => {
  const selecao = req.body
  const sql = "INSERT INTO selecoes SET ?;"
  conexao.query(sql, selecao, (erro, resultado) => {
    if(erro) {
      res.status(404).json({ 'erro': erro })
    } else {
      res.status(201).json(resultado)
    }
  })
})


app.delete('/selecoes/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  const sql = "DELETE FROM selecoes WHERE id=?;"
  conexao.query(sql, id, (erro, resultado) => {
    if(erro) {
      res.status(404).json({ 'erro': erro })
    } else {
      res.status(200).json(resultado)
    }
  })
})

// fazendo update
app.put('/selecoes/:id', (req, res) => {
  const id = req.params.id
  const selecao = req.body
  const sql = "UPDATE selecoes SET ? WHERE id=?;"
  conexao.query(sql, [selecao,id], (erro, resultado) => {
    if(erro) {
      res.status(404).json({ 'erro': erro })
    } else {
      res.status(201).json(resultado)
    }
  })
})

export default app
