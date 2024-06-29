document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    // Coleta dos dados do formulário
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const peso = document.getElementById('peso').value;
    const altura = document.getElementById('altura').value;
    const telefone = document.getElementById('telefone').value;
    const foto = document.getElementById('foto').files[0];
    const sexo = document.getElementById('sexo').value;

    console.log("Dados coletados do formulário:", { nome, idade, peso, altura, telefone, foto, sexo });

    // Lê a imagem como base64
    const reader = new FileReader();
    reader.onload = function(e) {
        const fotoBase64 = e.target.result;

        // Cria o objeto do usuário
        const usuario = {
            nome: nome,
            idade: idade,
            peso: peso,
            altura: altura,
            telefone: telefone,
            foto: fotoBase64,
            sexo: sexo,
        };

        console.log("Usuário a ser salvo no localStorage:", usuario);

        // Salva no localStorage
        localStorage.setItem('usuario', JSON.stringify(usuario));

        // Verifique se o salvamento foi bem-sucedido
        if (localStorage.getItem('usuario')) {
            console.log("Usuário salvo com sucesso no localStorage.");
        } else {
            console.error("Falha ao salvar usuário no localStorage.");
        }

        // Redireciona para index.html
        console.log("Redirecionando para index.html");
        window.location.href = '/pages/perfil.html';
    };

    // Lê a imagem como Base64
    reader.readAsDataURL(foto);
});