import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import AuthController from './app/controllers/AuthController.js';
import selecoesRoutes from './routes/selecoes.routes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_session_secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.post('/login', AuthController.login);
app.post('/register', AuthController.register);
app.get('/verify', AuthController.verify);

app.get('/', (req, res) => {
  res.send('API Rest rodando!');
});

app.use('/selecoes', selecoesRoutes);

export default app;
