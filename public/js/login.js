var login = document.getElementById("login-form");

login.addEventListener('submit', (e)=>{
    e.preventDefault();
    let json = {};
    json.cedula = document.getElementById('Cedula').value;
    json.clave = document.getElementById('Clave').value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(this.responseText === 'success'){
                window.location.assign('./index-ingresado.html');
            }else{
                alert('No encontramos el usuario :(');
            }
        }
    };
    xhttp.open("POST", "/responseLogin");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(json));
})