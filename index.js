const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 4000;
const SECRET_KEY = "glowup_super_secret_key_2026"; // in productie asta o vom muta in variabile de mediu

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: "Auth Service is running and ready!" });
});

app.post('/auth/register', (req, res) => {
    // Acum preluam si datele despre ten
    const { username, password, skin_type, sensitivities } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username și parola sunt obligatorii!" });
    }

    // Aici in viitor am verifica parola in DB, dar pt Auth MS generam token-ul
    const userPayload = { 
        username: username, 
        skin_type: skin_type || "mixt", // default daca nu introduce
        sensitivities: sensitivities || "niciuna"
    };

    // Generam token-ul care acum contine si tipul de ten
    const token = jwt.sign(userPayload, "CHEIA_SECRETA_GLOWUP", { expiresIn: '24h' });

    res.json({ 
        message: "Autentificare securizată reușită! Profilul a fost creat.", 
        token: token,
        profile: userPayload
    });
});

app.listen(port, () => {
  console.log(`Auth Service asculta pe portul ${port}`);
});