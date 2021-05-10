var cedulaLogged = '';

exports.crearUsuarios = (con, req, res)=>{
    var info = req.body;
    var query = `SELECT COUNT(*) as existe from pacientes where cedula = '${info.cedula}';`;
    con.query(query, (err, result)=>{
        if (err) throw err;
        console.log(JSON.stringify(result));
        if(result[0].existe === 0){
            let process = `INSERT INTO pacientes (nombres, apellidos, cedula, correo, eps, clave) VALUES ('${info.nombre}','${info.apellidos}','${info.cedula}','${info.correo}','${info.eps}','${info.clave}')`;
            con.query(process, (err, result) => {
                if (err) throw err;
                res.send('success');
                cedulaLogged = info.cedula;
            })
        }else{
            res.send('fail');
        }
    });
}

exports.loginUsuarios = (con, req, res) => {
    var info = req.body;
    var query = `SELECT COUNT(*) as existe from pacientes where cedula = '${info.cedula}' AND clave = '${info.clave}'`;
    con.query(query, (err, result)=>{
        if (err) throw err;
        console.log(JSON.stringify(result));
        if(result[0].existe === 0){
            res.send('fail');
        }else{
            res.send('success');
            cedulaLogged = info.cedula;
        }
    });
}

exports.verDetallesExamen = (con, req, res)=>{
    let query = `SELECT descripcion, recomendaciones, costo, tiempo_aprox from tipo where nombre = '${req.body.tipo}'`;
    con.query(query, (err, result)=>{
        if(err) throw err;
        let resultado = '<table><tr>'
        JSON.parse(JSON.stringify(result[0]), function(k, v){
            if(k!==""){
                resultado+=`<th>${k}</th>`;
            }
        });
        resultado+="</tr><tr>"
        JSON.parse(JSON.stringify(result[0]), function(k, v){
            if(k!==""){
                resultado+=`<td>${v}</td>`;
            }
        });
        resultado+="</tr></table>";
        res.send(resultado);
    });
}

exports.agendarExamen = (con, req, res)=>{
    let queryIdTipo = `SELECT idTipo from tipo where nombre = '${req.body.tipo}'`;
    let queryIdPaciente = `SELECT idPaciente from pacientes where cedula = '${cedulaLogged}'`;
    con.query(queryIdTipo, (err, result)=>{
        if(err) throw err;
        let idTipo = result[0].idTipo;
        con.query(queryIdPaciente, (err, result)=>{
            if(err) throw err;
            let idPaciente = result[0].idPaciente;
            let queryAgendar = `INSERT INTO examen (fecha_inicio, fecha_cita, idPaciente, idTipo) VALUES (CURDATE(),'${req.body.fecha}', ${idPaciente}, ${idTipo})`;
            con.query(queryAgendar, (err, result)=>{
                if (err) throw err;
                res.send('success');
            });
        });
    });
}

exports.logOut = ()=>{
    cedulaLogged = '';
    console.log(cedulaLogged);
}

exports.consulta = (con, res)=>{
    let query = `SELECT CONCAT(p.nombres,' ',p.apellidos) as nombrePaciente, t.nombre, CONCAT(YEAR(e.fecha_cita),'-', MONTH(e.fecha_cita),'-',DAY(e.fecha_cita)) as fechaCita, json_resultados as resultados from examen e
    JOIN tipo t USING(idTipo)
    JOIN pacientes p USING(idPaciente)
    WHERE p.cedula = '${cedulaLogged}'`;
    con.query(query, (err, result)=>{
        var respuesta = '';
        let json = JSON.stringify(result).replace(/\\/g, '');
        let json2 = json.replace(/"{/g, '{');
        let json3 = JSON.parse(json2.replace(/}"/g, '}'));
        console.log(json3);
        console.log(json[111]);
        for(index in json3){
            respuesta += '<table class="tabla"><tr>';
            JSON.parse(JSON.stringify(json3[index]), (k,v)=>{
                console.log(k);
                if(k !== "" && k !== 'resultados'){
                    
                    respuesta+=`<th class="table-header">${k}</th>`; 
                }
            });
            respuesta+='</tr><tr>';
            JSON.parse(JSON.stringify(json3[index]), (k,v)=>{
                if(k !== "" && k !== 'resultados'){
                    respuesta+=`<td  class="table-data">${v}</td>`; 
                }
            });
            respuesta+='</tr></table>';
        }
        res.send(respuesta);
    });
}

exports.obtenerInfo = (con, res)=>{
    let query = `SELECT nombres, apellidos, correo, eps from pacientes where cedula = '${cedulaLogged}'`;
    con.query(query, (err, result)=>{
        if(err) throw err;
        res.send(JSON.stringify(result[0]));
    });
}

exports.update = (con,req,res)=>{
    let info = req.body;
    con.query(`UPDATE pacientes set nombres = '${info.nombre}', apellidos = '${info.apellido}', correo = '${info.correo}', eps = '${info.eps}' where cedula = '${cedulaLogged}'`,
    (err,result)=>{
        if(err) throw err;
        res.send('success');
    });
}