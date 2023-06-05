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
                const userId = this.lastID;
                console.log('Dados do cliente foram inseridos com sucesso. ID:', userId);
                res.status(200).json({ message: 'Dados do cliente foram inseridos com sucesso.', userId });
            }
        });

        db.close();
    });
});

app.get('/users', (req, res) => {
    const dbPath = path.join(__dirname, '..', 'MyPet.db');
    const db = new sqlite3.Database(dbPath);

    const query = 'SELECT id, nome FROM cliente';

    db.all(query, (err, rows) => {
        if (err) {
            console.error('Erro ao buscar os usuários:', err);
            res.status(500).json({ message: 'Erro ao buscar os usuários.' });
        } else {
            res.status(200).json(rows);
        }

        db.close();
    });
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const dbPath = path.join(__dirname, '..', 'MyPet.db');
    const db = new sqlite3.Database(dbPath);

    // Verificar se o email e senha correspondem a um usuário válido
    const loginQuery = 'SELECT id, email FROM cliente WHERE email = ? AND senha = ?';
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
        console.log('Login realizado com sucesso. ID:', row.id);
        res.status(200).json({ message: 'Login realizado com sucesso.', userId: row.id });

        db.close();
    });
});

app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);

    const dbPath = path.join(__dirname, '..', 'MyPet.db');
    const db = new sqlite3.Database(dbPath);

    const query = `
        SELECT cliente.id, cliente.nome, cachorros.id AS cachorro_id, cachorros.nome AS cachorro_nome
        FROM cliente
        LEFT JOIN cachorros ON cliente.id = cachorros.id_cliente
        WHERE cliente.id = ?
    `;

    db.all(query, [userId], (err, rows) => {
        if (err) {
            console.error('Erro ao buscar o usuário e os cachorros:', err);
            res.status(500).json({ message: 'Erro ao buscar o usuário e os cachorros.' });
        } else {
            if (rows.length > 0) {
                const user = {
                    id: rows[0].id,
                    nome: rows[0].nome,
                    cachorros: []
                };

                rows.forEach(row => {
                    if (row.cachorro_id) {
                        const cachorro = {
                            id: row.cachorro_id,
                            nome: row.cachorro_nome
                        };
                        user.cachorros.push(cachorro);
                    }
                });

                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'Usuário não encontrado.' });
            }
        }

        db.close();
    });
});


app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);

    const dbPath = path.join(__dirname, '..', 'MyPet.db');
    const db = new sqlite3.Database(dbPath);

    const query = 'SELECT id, nome FROM cliente WHERE id = ?';
    db.get(query, [userId], (err, row) => {
        if (err) {
            console.error('Erro ao buscar o usuário:', err);
            res.status(500).json({ message: 'Erro ao buscar o usuário.' });
        } else {
            if (row) {
                res.status(200).json(row);
            } else {
                res.status(404).json({ message: 'Usuário não encontrado.' });
            }
        }

        db.close();
    });
});

app.post("/cachorros", (req, res) => {
    const { breed, name, sex, hasMange, id_cliente } = req.body;

    const dbPath = path.join(__dirname, "..", "MyPet.db");
    const db = new sqlite3.Database(dbPath);

    const insertQuery =
        "INSERT INTO cachorros (raca, nome, sexo, possui_sarna, id_cliente) VALUES (?, ?, ?, ?, ?)";
    db.run(
        insertQuery,
        [breed, name, sex, hasMange, id_cliente],
        function (err) {
            if (err) {
                console.error("Erro ao cadastrar cachorro:", err);
                res.status(500).json({ error: "Erro ao cadastrar cachorro" });
            } else {
                const dogId = this.lastID;
                res.json({ id: dogId, message: "Cachorro cadastrado com sucesso" });
            }
        }
    );
});



app.post('/salvar-diagnostico', (req, res) => {
    const { resultado, precisao, selectedDog, photo } = req.body; // Obtenha o selectedDog, resultado, precisao e photo dos dados da requisição

    let possuiSarna = false;

    if (resultado === 'Cachorro com sarna') {
        possuiSarna = true;
    }

    const dbPath = path.join(__dirname, '..', 'MyPet.db');
    const db = new sqlite3.Database(dbPath);

    const updateQuery = 'UPDATE cachorros SET possui_sarna = ?, imagem = ?, precisao = ? WHERE id = ?';
    db.run(updateQuery, [possuiSarna, photo, parseFloat(precisao), selectedDog], function (err) {
        if (err) {
            console.error('Erro ao atualizar o diagnóstico no banco de dados:', err);
            res.status(500).json({ message: 'Erro ao atualizar o diagnóstico no banco de dados.' });
        } else {
            console.log('Diagnóstico atualizado com sucesso.');
            res.status(200).json({ message: 'Diagnóstico atualizado com sucesso.' });
        }

        db.close();
    });
});








app.get('/users/:id/dogs', (req, res) => {
    const userId = parseInt(req.params.id);

    const dbPath = path.join(__dirname, '..', 'MyPet.db');
    const db = new sqlite3.Database(dbPath);

    const query = 'SELECT id, nome FROM cachorros WHERE id_cliente = ?';
    db.all(query, [userId], (err, rows) => {
        if (err) {
            console.error('Erro ao buscar os cachorros do usuário:', err);
            res.status(500).json({ message: 'Erro ao buscar os cachorros do usuário.' });
        } else {
            res.status(200).json(rows);
        }

        db.close();
    });
});

app.listen(port, () => {
    console.log(`Servidor backend está executando na porta ${port}`);
});
