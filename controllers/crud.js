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

exports.tareas = (req, res) =>{
    const nombreTarea = req.body.nombreTarea;
    const horasDispuestas = req.body.horas;
    const idEmpleado= req.body.id_empleado;
    conexion.query('SELECT horastrabajo FROM  empleados WHERE id = ?',[idEmpleado],(error, resultados)=>{
        if(error){
            console.log(error);
            res.redirect('/');
        }

        const horasDeTrabajo = resultados[0].horastrabajo;
        if(horasDeTrabajo<horasDispuestas){
           
            res.redirect(`/tareas`);
        }else{
            conexion.query('INSERT INTO tareas SET?',{tarea:nombreTarea,horasdispuestas:horasDispuestas,id_empleado:idEmpleado}, (error)=>{
                if(error){
                    console.log(error);
                    return res.redirect('/');
                }
                conexion.query(`UPDATE empleados SET horastrabajo = ${horasDeTrabajo-horasDispuestas} WHERE id = ${idEmpleado}`);
                conexion.query(`UPDATE empleados SET pagado = ${1} WHERE horastrabajo = ${0}`);
                conexion.query('SELECT * FROM empleados',(error, results)=>{
                    if(error){
                        console.log(error);
                    return res.redirect('/');
                    }

                    res.render(`tareas`, {con:false, resultados:results})
                    // res.redirect('/tareas')
                })
                
            })
        }

    })
}
