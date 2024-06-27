const divMensagens = document.querySelector("#comentarios");
const receitaSelecionada = 1; //Caso queira testar a exibição, altere esse valor para outro número - Essa parte depende da sprint 3 de outro integrante
//Não se esqueça de alterar o id da receita no db.json
fetch("/assets/db/db.json").then((response) => {
    response.json().then((dados) => {
        const mensagensFiltradas = dados.comentarios.filter((comentario) => {
            return comentario.receitaID === receitaSelecionada;
        });

        mensagensFiltradas.forEach((comentario) => {
            const itemLista = document.createElement("li");
            itemLista.classList.add("mensagem-comentario");
            
            const nomeSpan = document.createElement("span");
            nomeSpan.textContent = comentario.nome;
            nomeSpan.style.fontWeight = "bold"; 
            
            itemLista.appendChild(nomeSpan);
            itemLista.innerHTML += `: ${comentario.texto}`;
            
            divMensagens.appendChild(itemLista);
        });
    }); 
});