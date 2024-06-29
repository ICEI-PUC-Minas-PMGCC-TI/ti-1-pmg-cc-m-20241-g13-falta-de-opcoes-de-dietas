const divMensagens = document.querySelector("#comentarios");
const apiUrl3 = '/comentarios';

fetch(apiUrl3).then(response => {
    response.json().then(comentarios => {
        comentarios.forEach(comentario => {
            const itemLista = document.createElement("li");
            itemLista.classList.add("mensagem-comentario");

            const nomeSpan = document.createElement("span");
            nomeSpan.textContent = comentario.nome; // Acessa a propriedade 'nome' do objeto 'comentario'
            nomeSpan.style.fontWeight = "bold";

            itemLista.appendChild(nomeSpan);
            itemLista.innerHTML += `: ${comentario.texto}`; // Acessa a propriedade 'texto' do objeto 'comentario'

            divMensagens.appendChild(itemLista);
        });
    });
});


