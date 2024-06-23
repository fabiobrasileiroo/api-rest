import express from 'express'
import conexao from '../infra/conexao.js'

import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'

const app = express()

app.use(express.json())

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
// app.post('/login', (req, res) => {
//   const { login, senha } = req.body
//   console.log(login, senha)
//   if (login === 'admin' && senha === '123456') {
//     jwt.sign({ userId: 1 }, 'secret', { expiresIn: '1h' }, (err, token) => {

//     })
//     return res.end()
//   }
// })

// fetch all 
app.get('/selecoes', (req, res) => {
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
      res.status(400).json({ 'erro': erro })
    } else {
      res.status(201).json(resultado)
    }
  })
})


app.delete('/selecoes/:id', (req, res) => {
  // let index = buscarIndexSelecao(req.params.id)
  // console.log(index)
  // selecoes.splice(index, 1)
  // res.send(`Seleção com id ${req.params.id} excluída com sucesso!`)
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
      res.status(400).json({ 'erro': erro })
    } else {
      res.status(201).json(resultado)
    }
  })
})

export default app
