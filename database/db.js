const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'empresa'
})

conexion.connect((error)=>{
    if(error){
        console.error('El error de conexion de la db es: '+error);
        return
    }
    console.log('La conexion a la base de datos fue exitosa');
})

module.exports = conexion;