
const apiUrl = 'https://976214a6-43cb-4e69-8a17-13a3c8a5a067-00-wjjqu9rc65zq.worf.replit.dev/receitas';


function displayMessage(mensagem) {
    msg = document.getElementById('msg');
    msg.innerHTML = '<div class="alert alert-warning">' + mensagem + '</div>';
}

function readReceita(processaDados) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            processaDados(data);
        })
        .catch(error => {
            console.error('Erro ao ler receitas via API JSONServer:', error);
            displayMessage("Erro ao ler receitas");
        });
}

function createReeceita(receita, refreshFunction) {
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(receita),
    })
        .then(response => response.json())
        .then(data => {
            displayMessage("Receita inserida com sucesso");
            if (refreshFunction)
                refreshFunction();
        })
        .catch(error => {
            console.error('Erro ao inserir receita via API JSONServer:', error);
            displayMessage("Erro ao inserir receita");
        });
}

function updateReceita(id, receita, refreshFunction) {
    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(receita),
    })
        .then(response => response.json())
        .then(data => {
            displayMessage("Receita alterado com sucesso");
            if (refreshFunction)
                refreshFunction();
        })
        .catch(error => {
            console.error('Erro ao atualizar receita via API JSONServer:', error);
            displayMessage("Erro ao atualizar receita");
        });
}

function deleteReceita(id, refreshFunction) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            displayMessage("Receita removida com sucesso");
            if (refreshFunction)
                refreshFunction();
        })
        .catch(error => {
            console.error('Erro ao remover receita via API JSONServer:', error);
            displayMessage("Erro ao remover receita");
        });
}
