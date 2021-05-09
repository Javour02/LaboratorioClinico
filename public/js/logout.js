function logOut(){
    console.log('hola');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            window.location.assign('./index.html');
        }
    };
    xhttp.open("POST", "/logOut");
    xhttp.send();
}