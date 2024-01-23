const conexion = require('../database/db');

exports.save = (req, res)=>{
    const nombre = req.body.nombre;
    const departamento = req.body.departamento;
    const fechacontratacion = req.body.fechacontratacion;
    const salario = req.body.salario;
    const horastrabajo = req.body.horastrabajo;
    conexion.query('INSERT INTO empleados SET ?',{nombre:nombre, departamento:departamento,salario:salario, fechacontratacion:fechacontratacion, horastrabajo:horastrabajo},(error, results)=>{
        if(!nombre || !departamento || !fechacontratacion){
            console.log(error);
        }else{
            res.redirect('/')
        }
    })
}

