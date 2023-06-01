const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('MyPet.db');

// Cria a tabela "cachorros" com as colunas "imagem", "possui_sarna", "hash", "nome", "precisao" e "raca"
db.run(`CREATE TABLE IF NOT EXISTS cachorros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    imagem BLOB,
    possui_sarna BOOLEAN,
    hash TEXT UNIQUE,
    nome TEXT,
    precisao REAL,
    raca TEXT
)`);

// Cria a tabela "cliente" com as colunas "nome", "email", "senha" e "cpf"
db.run(`CREATE TABLE IF NOT EXISTS cliente (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT UNIQUE,
    senha TEXT
)`);

// Cria a tabela "historico" com as colunas "id_cachorro", "id_cliente" e "imagem_cachorro"
db.run(`CREATE TABLE IF NOT EXISTS historico (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_cachorro INTEGER,
    id_cliente INTEGER,
    imagem_cachorro BLOB,
    FOREIGN KEY (id_cachorro) REFERENCES cachorros (id),
    FOREIGN KEY (id_cliente) REFERENCES cliente (id)
)`);

db.close();
