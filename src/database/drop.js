const fs = require('fs');

const dbPath = 'C:/Users/Sullivan/Documents/mypet-frontend/src/MyPet.db';

// Verifica se o arquivo existe
if (fs.existsSync(dbPath)) {
    // Exclui o arquivo do banco de dados
    fs.unlinkSync(dbPath);
    console.log('Banco de dados excluído com sucesso!');
} else {
    console.log('O arquivo do banco de dados não foi encontrado.');
}
