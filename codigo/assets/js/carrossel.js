function readReceita() {
    fetch("/assets/db/dbAlimentos.json")
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar dados: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Verifica se o objeto possui a chave "receitas"
            if (!data || !data.receitas || data.receitas.length === 0) {
                throw new Error('O arquivo JSON não possui receitas válidas.');
            }
            
            console.log("Dados recebidos:", data.receitas);
            ingredientes(data.receitas);  // Chama a função com o array de receitas
        })
        .catch(error => {
            console.error('Erro ao ler receitas:', error);
            displayMessage("Erro ao ler receitas. Verifique o console para mais detalhes.");
        });
}


function ingredientes(receitas) {
    let str = '';
    for (let i = 0; i < receitas.length; i++) {
        let receita = receitas[i];
        let activeClass = i === 0 ? 'active' : '';
        str += `<div class="carousel-item ${activeClass}">
                    <a onclick="salvaLocalStorage('${receita.id}')" href="/pages/infos.html">
                        <img src="${receita.foto}" class="d-block w-100" alt="erro">
                    </a>
                    <div class="carousel-caption d-none d-md-block">
                        <h5 class="cardtext">${receita.receita}</h5>
                        <p class="cardtext">${receita.categoria}</p>
                    </div>
                </div>`;
    }
    
    let carouselInner = document.getElementById('ci');
    if (carouselInner) {
        carouselInner.innerHTML = str;
    } else {
        console.error("Elemento com id 'ci' não encontrado no DOM.");
    }
}


function salvaLocalStorage(id) {
    localStorage.setItem("salvo", id);
}

function displayMessage(msg) {
    // Função para exibir mensagens de erro ou informações ao usuário
    alert(msg);
}

readReceita();