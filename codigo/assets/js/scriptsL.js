document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const formData = new FormData(document.getElementById('cadastroForm'));
    const jsonData = {};
    formData.forEach(function(value, key){
        jsonData[key] = value;
    });
    console.log(jsonData);
});
function salvarDados(){

    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const peso = document.getElementById('peso').value;
    const altura = document.getElementById('altura').value;
    const telefone = document.getElementById('telefone').value;
    const foto = document.getElementById('foto').files[0];
    const sexo = document.getElementById('sexo').value;
}
if(foto){
    const reader = new FileReader();
    reader.onload = function(e){
        const fotoBase64 = e.target.result;

const usuario = {
    nome: nome,
    idade: idade,
    peso: peso,
    altura: altura,
    telefone: telefone,
    foto: fotoBase64,
    sexo: sexo,
};

localStorage.setItem('usuario',JSON.stringify(usuario));

window.location.href = 'index.HTML';
};
reader.readAsDataURL(foto);
}else {
    alert('por favor, selecione uma foto.');
}
