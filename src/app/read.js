var fs = require('fs');
var path = require('path');
var getProducts = function () {
    var filePath = path.join(__dirname, 'base', 'products.json'); // Caminho para o arquivo JSON
    try {
        // Lê o arquivo JSON de forma síncrona
        var fileContents = fs.readFileSync(filePath, 'utf-8');
        // Parseia o conteúdo JSON
        var products = JSON.parse(fileContents);
        // Exibe os produtos no console
        console.log(products);
    }
    catch (error) {
        // Caso ocorra erro ao ler o arquivo
        console.error('Erro ao ler o arquivo:', error);
    }
};
// Chama a função para exibir os produtos
getProducts();
module.exports = { getProducts: getProducts };
