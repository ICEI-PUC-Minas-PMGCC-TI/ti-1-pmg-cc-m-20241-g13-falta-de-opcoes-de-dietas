document.querySelector('.textarea-comentario').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        var mensagem = {
            nome: "Nome do Usuário", // Substitua pelo nome do usuário
            texto: this.value,
            id: Date.now(), // Um identificador único para a mensagem
            receitaID: 1 // Substitua pelo ID da receita correspondente
        };
        
        fetch("db.json")
        .then(response => response.json())
        .then(data => {
            console.log('Mensagem salva:', data);
        })
        .catch((error) => {
            console.error('Erro ao salvar a mensagem:', error);
        });

        this.value = ''; // Limpa o campo de texto após enviar
    }
});
