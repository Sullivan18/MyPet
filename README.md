# Detecção de Sarna em Cachorros usando Inteligência Artificial

Este é um projeto de detecção de sarna em cachorros utilizando inteligência artificial. O projeto consiste em um frontend que interage com uma API para realizar a detecção.

## Funcionamento

O projeto é dividido em duas partes: o frontend e a API.

### Frontend

O frontend é desenvolvido em JavaScript e utiliza o framework React. Ele é responsável por fornecer a interface do usuário para interagir com a funcionalidade de detecção de sarna em cachorros. Para iniciar o frontend, siga as etapas abaixo:

1. Certifique-se de ter o Node.js instalado no seu computador. Você pode verificar digitando `node --version` no terminal. Se o Node.js não estiver instalado, você precisará instalá-lo primeiro.

2. Abra o terminal ou prompt de comando e navegue até o diretório do projeto.

3. Execute o seguinte comando para instalar as dependências do projeto:

   ```
   npm install
   ```

4. Após a conclusão da instalação, execute o seguinte comando para iniciar o frontend:

   ```
   npm start
   ```

   O frontend será iniciado e estará acessível no navegador através do endereço `http://localhost:3000`.

### API

A API é desenvolvida em JavaScript e utiliza o framework Express.js. Ela é responsável por receber as requisições do frontend e enviar as informações para a API em python que a detecção de sarna em cachorros utilizando inteligência artificial. Para iniciar a API, siga as etapas abaixo:

1. Certifique-se de ter o Node.js instalado no seu computador. Você pode verificar digitando `node --version` no terminal. Se o Node.js não estiver instalado, você precisará instalá-lo primeiro.

2. Abra o terminal ou prompt de comando e navegue até o diretório `src/database` do projeto.

3. Execute o seguinte comando para instalar as dependências da API:

   ```
   npm install
   ```

4. Após a conclusão da instalação, execute o seguinte comando para iniciar a API:

   ```
   node src/database/Express.js
   ```

   A API será iniciada e estará pronta para receber as requisições do frontend.
