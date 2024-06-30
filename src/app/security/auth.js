import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error("JWT_SECRET não está definido. Verifique suas variáveis de ambiente.");
  process.exit(1);
}

export function generateToken(user, res) {
  const token = jwt.sign(user, JWT_SECRET, { expiresIn: "1h" });
  res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
  return token;
}

export function verifyToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("Token não fornecido");
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send("Token inválido");
    }
    req.user = decoded;
    next();
  });
}
