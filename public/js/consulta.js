window.onload = function(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(this.responseText === ""){
                alert('Usted no tiene examenes agendados aun :(');
                window.location.assign('./index-ingresado.html');            
            }else{
                document.getElementById('respuestaConsulta').innerHTML = this.responseText;  
            }
        }
    };
    xhttp.open("POST", "/consulta");
    xhttp.send();
}