const express = require('express');

const app = express();
const port = 4000; // Îl punem pe portul 4000 ca să nu se bată cu IO MS

app.use(express.json());

// Endpoint pentru verificarea stării
app.get('/health', (req, res) => {
  res.json({ status: "Auth Service is running and ready!" });
});

// Endpoint pentru înregistrare
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  
  if (username && password) {
    // Aici, în Etapa 3, vom adăuga salvarea în Auth DB
    res.json({ 
        message: "Înregistrare reușită (Mock)!", 
        user: username 
    });
  } else {
    res.status(400).json({ error: "Te rog furnizează username și parolă." });
  }
});

app.listen(port, () => {
  console.log(`Auth Service asculta pe portul ${port}`);
});