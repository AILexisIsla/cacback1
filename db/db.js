// src/db/db.js
/**
 * Finalmente el archivo db.js será el que cree el objeto que conecta con la base de datos. 
 * Esa conexión utilizará el objeto mysql provisto en en el módulo mysql2
 */

//1- Importación del módulo 
const mysql = require('mysql2');

//2- Configuracion de la conexion
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'TXTUSERÑ57', //En mi caso me conecto a mysql-server con estos datos
    port: 3306,
    // database: 'movies_db'
});

connection.connect((err) => {
    // si existe error el objeto err existe por lo tanto activa el mnsje de error
    if (err) {
        console.error('Error de conexion con el servidor:', err);
        return;
    }

    // Mensaje de éxito
    console.log('Estado de conexión: CONECTADA.');

    // Creamos la consulta
    const sqlCreatedb = 'CREATE DATABASE IF NOT EXISTS juegos_db';

    // Creamos la base de datos solo si no existe
    connection.query(sqlCreatedb, (err, results) => {
        // error
        if (err) {
            console.error('Error al crear la base de datos:', err);
            return;
        }
        // éxito
        console.log('Base de datos: EXISTENTE/GARANTIZADA');

        // Nos ubicamos en la base de datos creada
        // .changeUser(objeto_a_quien_conectarnos, funcion_callback)
        
        connection.changeUser({ database: 'juegos_db' }, (err) => {            
            //error
            if (err) {
                console.error('Error al cambiar a la base de datos juegos_db:', err);
                return;
            }
            
            // Queries para crear una tabla
            const createTableQuery = `
                CREATE TABLE IF NOT EXISTS juegos (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    description VARCHAR(1000) NOT NULL,
                    price INT(50) NOT NULL
                );
            `;
            // Pasamos la queries anteriores
            connection.query(createTableQuery, (err, results) => {
                // en caso de error
                if (err) {
                    console.error('Error al crear la tabla:', err);
                    return;
                }
                //éxito
                console.log('tabla: EXISTENTE/GARANTIZADA');
            });
        });
    });
});

module.exports = connection;


