import session from 'express-session';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

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

export default function generateToken(user) {
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
