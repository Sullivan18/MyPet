const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('C:\\Users\\Sullivan\\Documents\\mypet-frontend\\src\\MyPet.db');

// Dropa a tabela "cachorros" se existir
db.run(`DROP TABLE IF EXISTS cachorros`);

// Dropa a tabela "cliente" se existir
db.run(`DROP TABLE IF EXISTS cliente`);

// Dropa a tabela "historico" se existir
db.run(`DROP TABLE IF EXISTS historico`);

db.close();
