// Trabalho Interdisciplinar 1 - Aplicações Web
//
// Esse módulo realiza as operações de CRUD a partir de uma API baseada no JSONServer
// O servidor JSONServer fica hospedado na seguinte URL
// https://jsonserver.rommelpuc.repl.co/contatos
//
// Para fazer o seu servidor, acesse o projeto do JSONServer no Replit, faça o 
// fork do projeto e altere o arquivo db.json para incluir os dados do seu projeto.
// URL Projeto JSONServer: https://replit.com/@rommelpuc/JSONServer
//
// Autor: Rommel Vieira Carneiro
// Data: 03/10/2023

// URL da API JSONServer - Substitua pela URL correta da sua API
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

const foodTable = document.getElementById('food-table');
const totalCaloriasSpan = document.getElementById('total-calories');


function exibe() {
    let totalCalorias = 0;
    
    // Recupera dados do localStorage, se existirem
    let savedValues = localStorage.getItem('value');
    let valuesMap = {};
    
    if (savedValues) {
        savedValues = JSON.parse(savedValues);
        savedValues.forEach(item => {
            valuesMap[item.id] = '0';
        });
    }

    readalimento(foods => {
        localStorage.setItem("padrao", JSON.stringify(foods));
        console.log(foods);

        foods.forEach(food => {
            const row = document.createElement('tr');
            const savedValue = valuesMap[`value${food.id}`] || '0';

            row.innerHTML = `
                <td><button type="button" class="btn btn-outline-info"><span id="value${food.id}">${savedValue}</span></button></td>
                <td>${food.nome}</td>
                <td>${food.calorias}</td>
                <td>${food.quantidade}</td>
                <td>
                    <button type="button" class="btn btn-outline-success btn-custom" onclick="addCalorias(${food.calorias}, value${food.id})">+</button>
                    <button type="button" class="btn btn-outline-danger btn-custom" onclick="removeCalorias(${food.calorias}, value${food.id})">-</button>
                </td>
            `;
            foodTable.appendChild(row);
        });
    });
}
//**********************************************************************************************************************************




const value = document.getElementById('value');
const plusbutton = document.getElementById('plus');
const minusbutton = document.getElementById('minus');

const updatevalue = () => {
    value.innerHTML = count;
};

let count = 0;

plusbutton.addEventListener('mousedown', () => {
    count += 1
    updatevalue();
});

function updateTotalCalories() {
    const elements = document.querySelectorAll('span[id^="value"]');
    let totalCalories = 0;
    elements.forEach(el => {
        totalCalories += parseInt(el.textContent);
    });
}

function Listaalimentos() {
    saveCurrentValues(); // Salva os valores atuais

    const valor = document.getElementById('filtro_categoria');
    let foods = localStorage.getItem('padrao');

    if (foods) {
        foods = JSON.parse(foods);
    } else {
        console.log("Nenhum dado encontrado no localStorage.");
        return;
    }

    // Recupera o estado atual do localStorage para os valores
    let savedValues = localStorage.getItem('value');
    let valuesMap = {};

    if (savedValues) {
        savedValues = JSON.parse(savedValues);
        savedValues.forEach(item => {
            valuesMap[item.id] = item.textContent;
        });
    }

    foodTable.innerHTML = ''; // Limpa a tabela antes de exibir os dados

    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Quantidade</th>
            <th>Nome</th>
            <th>Calorias</th>
            <th>Gramas</th>
        </tr>
    `;
    foodTable.appendChild(thead);

    foods.forEach(food => {
        if (food.categoria === valor.value || valor.value === "") {
            const storedValue = valuesMap[`value${food.id}`] || '0';
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><button type="button" class="btn btn-outline-info"><span id="value${food.id}">${storedValue}</span></button></td>
                <td>${food.nome}</td>
                <td>${food.calorias}</td>
                <td>${food.quantidade}</td>
                <td>
                    <button type="button" class="btn btn-outline-success btn-custom" onclick="addCalorias(${food.calorias}, value${food.id})">+</button>
                    <button type="button" class="btn btn-outline-danger btn-custom" onclick="removeCalorias(${food.calorias}, value${food.id})">-</button>
                </td>
            `;
            foodTable.appendChild(row);
        }
    });

    updateTotalCalories(); // Atualiza o total de calorias após exibir os alimentos filtrados
}


function saveCurrentValues() {
    let savedValues = localStorage.getItem('value');
    let valuesMap = {};

    if (savedValues) {
        savedValues = JSON.parse(savedValues);
        savedValues.forEach(item => {
            valuesMap[item.id] = item.textContent;
        });
    }

    const elements = document.querySelectorAll('span[id^="value"]');
    elements.forEach(el => {
        valuesMap[el.id] = el.textContent;
    });

    localStorage.setItem("value", JSON.stringify(Object.entries(valuesMap).map(([id, textContent]) => ({ id, textContent }))));
}


document.addEventListener('mouseup', () => clearInterval(intervalID))