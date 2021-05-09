var registro = document.getElementById("form-register");

registro.addEventListener('submit', (e)=>{
    e.preventDefault();
    console.log('estoy');
    var json = {};
    json.nombre = document.getElementById('Nombre').value;
    json.apellidos = document.getElementById('Apellidos').value;
    json.correo = document.getElementById('Correo').value;
    json.eps = document.getElementById('EPS').value;
    json.cedula = document.getElementById('cc').value;
    json.clave = document.getElementById('clave').value;
    console.log('estoy intentando registrarme');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(this.responseText === 'success'){
                window.location.assign('./index-ingresado.html');
            }else{
                alert('La cedula ingresada ya esta en uso');
            }
        }
    };
    xhttp.open("POST", "/responseRegistrarme");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(json));
});

