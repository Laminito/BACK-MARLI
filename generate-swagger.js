const fs = require('fs');
const { swaggerSpec } = require('./swagger-config.js');

fs.writeFileSync('./swagger.json', JSON.stringify(swaggerSpec, null, 2));
console.log('Fichier swagger.json généré avec succès !');
