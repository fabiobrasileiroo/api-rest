import app from './src/app.js'
import dotenv from 'dotenv';

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const PORT = process.env.PORT || 3333

app.listen(PORT, () => {
  console.log('Server on port', `http://localhost:${PORT}`)
})


