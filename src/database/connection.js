var knex = require('knex')({
    client: 'mysql2',
    connection: {
        host : 'localhost',
        user : 'user_squadra',
        password : 'Squadra2022!',
        database : 'bd_endereco'
     }
});

module.exports = knex