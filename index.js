const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 4000;
const SECRET_KEY = "glowup_super_secret_key_2026"; // in productie asta o vom muta in variabile de mediu

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: "Auth Service is running and ready!" });
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    // Generăm un token real valabil 24 de ore
    const token = jwt.sign({ username: username }, SECRET_KEY, { expiresIn: '24h' });

    res.json({ 
        message: "Autentificare securizată reușită!", 
        user: username,
        token: token
    });
  } else {
    res.status(400).json({ error: "Te rog furnizează username și parolă." });
  }
});

app.listen(port, () => {
  console.log(`Auth Service asculta pe portul ${port}`);
});