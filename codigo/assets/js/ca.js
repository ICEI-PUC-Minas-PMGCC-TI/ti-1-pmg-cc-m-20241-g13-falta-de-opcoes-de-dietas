const apiUrl = '/foods';

function displayMessage(mensagem) {
    msg = document.getElementById('msg');
    msg.innerHTML = '<div class="alert alert-warning">' + mensagem + '</div>';
}

function readalimento(processaDados) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            processaDados(data);
        })
        .catch(error => {
            console.error('Erro ao ler alimentos via API JSONServer:', error);
            displayMessage("Erro ao ler alimentos");
        });
}

function createalimento(alimento, refreshFunction) {
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(alimento),
    })
        .then(response => response.json())
        .then(data => {
            displayMessage("Alimento inserido com sucesso");
            if (refreshFunction)
                refreshFunction();
        })
        .catch(error => {
            console.error('Erro ao inserir alimento via API JSONServer:', error);
            displayMessage("Erro ao inserir alimento");
        });
}

function updatealimento(id, alimento, refreshFunction) {
    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(alimento),
    })
        .then(response => response.json())
        .then(data => {
            displayMessage("Alimento alterado com sucesso");
            if (refreshFunction)
                refreshFunction();
        })
        .catch(error => {
            console.error('Erro ao atualizar alimento via API JSONServer:', error);
            displayMessage("Erro ao atualizar alimento");
        });
}

function deletealimento(id, refreshFunction) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            displayMessage("Alimento removido com sucesso");
            if (refreshFunction)
                refreshFunction();
        })
        .catch(error => {
            console.error('Erro ao remover alimento via API JSONServer:', error);
            displayMessage("Erro ao remover alimento");
        });
}
