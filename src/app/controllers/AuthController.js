import crypto from 'crypto';
import { promisify } from 'util';
import mysql from 'mysql2/promise';
import { generateToken } from '../security/auth.js';
import transporter from '../../email.js';
import dotenv from 'dotenv';

dotenv.config();

const db = await mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'fhmb99',
  database: 'bdcopa'
});
  // host: 'localhost',
  // port: 3306,
  // user: 'root',
  // password: 'fhmb99',
  // database: 'bdcopa',

const login = "admin";
const password = "123456";

class AuthController {
  async login(req, res) {
    const { userLogin, senha } = req.body;

    if (userLogin === login && senha === password) {
      generateToken({ userLogin }, res);
      res.status(200).json({ message: "Login bem-sucedido" });
    } else {
      res.status(404).send("Login ou senha inválidos!");
    }
  }

  async register(req, res) {
    const { email, password } = req.body;

    const verificationToken = (await promisify(crypto.randomBytes)(20)).toString('hex');

    await db.query('INSERT INTO users_temp (email, password, verificationToken) VALUES (?, ?, ?)', [email, password, verificationToken]);

    const verificationLink = `http://localhost:3000/verify?token=${verificationToken}`;

    console.log('aqui', process.env.EMAIL)
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'Email Verification',
      text: `Click the following link to verify your email: ${verificationLink}`
    });

    res.status(200).json({ message: 'Verification email sent' });
  }

  async verify(req, res) {
    const { token } = req.query;

    const [rows] = await db.query('SELECT * FROM users_temp WHERE verificationToken = ?', [token]);

    if (rows.length === 0) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    const user = rows[0];
    await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [user.email, user.password]);
    await db.query('DELETE FROM users_temp WHERE verificationToken = ?', [token]);

    res.status(200).json({ message: 'Email verified and user registered' });
  }
}

export default new AuthController();
