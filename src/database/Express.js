const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 4000;

app.use(bodyParser.json());

// Configurando o CORS
app.use(cors({
    origin: 'http://localhost:3000',
}));

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    const dbPath = path.join(__dirname, '..', 'MyPet.db');
    const db = new sqlite3.Database(dbPath);

    // Verifica se o email já está cadastrado
    const checkEmailQuery = 'SELECT email FROM cliente WHERE email = ?';
    db.get(checkEmailQuery, [email], (err, row) => {
        if (err) {
            console.error('Erro ao verificar o email:', err);
            res.status(500).json({ message: 'Erro ao verificar o email.' });
            return;
        }

        if (row) {
            // O email já está cadastrado
            console.log('O email já está em uso:', email);
            res.status(400).json({ message: 'O email já está em uso.' });
            return;
        }

        // O email não está cadastrado, pode realizar o cadastro
        const insertQuery = 'INSERT INTO cliente (nome, email, senha) VALUES (?, ?, ?)';
        db.run(insertQuery, [name, email, password], function (err) {
            if (err) {
                console.error('Erro ao inserir os dados do cliente:', err);
                res.status(500).json({ message: 'Erro ao inserir os dados do cliente.' });
            } else {
                console.log('Dados do cliente foram inseridos com sucesso. ID:', this.lastID);
                res.status(200).json({ message: 'Dados do cliente foram inseridos com sucesso.' });
            }
        });

        db.close();
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const dbPath = path.join(__dirname, '..', 'MyPet.db');
    const db = new sqlite3.Database(dbPath);

    // Verificar se o email e senha correspondem a um usuário válido
    const loginQuery = 'SELECT email FROM cliente WHERE email = ? AND senha = ?';
    db.get(loginQuery, [email, password], (err, row) => {
        if (err) {
            console.error('Erro ao fazer login:', err);
            res.status(500).json({ message: 'Erro ao fazer login.' });
            return;
        }

        if (!row) {
            // As credenciais de login estão incorretas
            console.log('Credenciais de login incorretas:', email);
            res.status(401).json({ message: 'Credenciais de login incorretas.' });
            return;
        }

        // Login bem-sucedido
        console.log('Login realizado com sucesso:', email);
        res.status(200).json({ message: 'Login realizado com sucesso.' });

        db.close();
    });
});


app.listen(port, () => {
    console.log(`Servidor backend está executando na porta ${port}`);
});
