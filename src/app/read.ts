const fs = require('fs');
const path = require('path');

const getProducts = () => {
  const filePath = path.join(__dirname, 'base', 'products.json'); // Caminho para o arquivo JSON

  try {
    // Lê o arquivo JSON de forma síncrona
    const fileContents = fs.readFileSync(filePath, 'utf-8');

    // Parseia o conteúdo JSON
    const products = JSON.parse(fileContents);

    // Exibe os produtos no console
    console.log(products);
  } catch (error) {
    // Caso ocorra erro ao ler o arquivo
    console.error('Erro ao ler o arquivo:', error);
  }
};

// Chama a função para exibir os produtos
getProducts();

module.exports = { getProducts };
