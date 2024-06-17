const divMensagens = document.querySelector("#msgs");
const receitaSelecionada = 1; //Caso queira testar a exibição, altere esse valor para outro número - Essa parte depende da sprint 3 de outro integrante
//Não se esqueça de alterar o id da receita no db.json
fetch("db.json").then((response) => {
    response.json().then((dados) => {
        const mensagensFiltradas = dados.msgs.filter((mensagem) => {
            return mensagem.receitaID === receitaSelecionada;
        });

        mensagensFiltradas.forEach((mensagem) => {
            const itemLista = document.createElement("li");
            itemLista.classList.add("mensagem-comentario");
            
            const nomeSpan = document.createElement("span");
            nomeSpan.textContent = mensagem.nome;
            nomeSpan.style.fontWeight = "bold"; 
            
            itemLista.appendChild(nomeSpan);
            itemLista.innerHTML += `: ${mensagem.texto}`;
            
            divMensagens.appendChild(itemLista);
        });
    });
});