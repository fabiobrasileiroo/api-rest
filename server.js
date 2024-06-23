import app from './src/app.js'
import conexao from './infra/conexao.js'

const PORT = 3000
// fazer a conexão
// conexao.connect((erro) => {
//   if(erro) {
//     console.log(erro)
//     return
//   }
app.listen(PORT, () => {
  console.log('Server on port', `http://localhost:${PORT}`)
})
// })


