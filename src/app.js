import express from 'express'

const app = express()

app.use(express.json())
// mock
const selecoes = [
  {id: 1, selecao: 'Brasil', grupo: 'G'},
  {id: 2, selecao: 'Suiça', grupo: 'G'},
  {id: 3, selecao: 'Sérvia', grupo: 'G'},
  {id: 4, selecao: 'Camarões', grupo: 'G'},
]

function buscarIndexSelecao(id) {
  return selecoes.filter(selecao => selecao.id == id)
}

// pegar a posição ou index do elemento no array por id
function buscarIdSelecao(id) {
  return selecoes.findIndex(selecao => selecao.id == id )
}
app.get('/', (req, res)=> {
  res.send('Hello World!')
})
app.get('/selecoes', (req,res) => {
  res.send(selecoes)
})

app.get('/selecoes/:id', (req,res) => {
  res.json(buscarIndexSelecao(req.params.id))
})

app.post('/selecoes', (req,res) => {
  console.log(req.body)
  selecoes.push(req.body)
  
  res.status(201).send('Seleção criada com sucesso!')
})


app.delete('/selecoes/:id', (req,res) => {
  let index = buscarIndexSelecao(req.params.id)
  console.log(index)
  selecoes.splice(index, 1)
  res.send(`Seleção com id ${req.params.id} excluída com sucesso!`)

}) 
export default app
