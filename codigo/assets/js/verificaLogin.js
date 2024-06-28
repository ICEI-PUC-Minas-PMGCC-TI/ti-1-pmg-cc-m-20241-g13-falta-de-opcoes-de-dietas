function verificaLogin(){
    let user = sessionStorage.getItem("usuarioCorrente");
    user = JSON.parse(user)
    if(user.login === "admin"){
        console.log("foi")
        document.getElementById("cadastroReceitasContainer1").setAttribute('style', 'display: block;');
        document.getElementById("cadastroReceitasContainer2").setAttribute('style', 'display: block;');
    }
}