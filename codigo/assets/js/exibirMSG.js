const divMensagens = document.querySelector("#comentarios");

fetch("/assets/db/db.json").then((response) => {
    response.json().then((dados) => {
    
            const itemLista = document.createElement("li");
            itemLista.classList.add("mensagem-comentario");
            
            const nomeSpan = document.createElement("span");
            nomeSpan.textContent = comentarios.nome;
            nomeSpan.style.fontWeight = "bold"; 
            
            itemLista.appendChild(nomeSpan);
            itemLista.innerHTML += `: ${comentarios.texto}`;
            
            divMensagens.appendChild(itemLista);
        
    }); 
});