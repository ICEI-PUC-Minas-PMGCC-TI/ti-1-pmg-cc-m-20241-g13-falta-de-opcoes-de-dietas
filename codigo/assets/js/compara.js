const apiUrl = '/receitas';
const apiUrl2 = '/foods';

function readReceita() {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar dados: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("Dados recebidos:", data);
            compara(data);
        })
        .catch(error => {
            console.error('Erro ao ler receitas:', error);
            displayMessage("Erro ao ler receitas. Verifique o console para mais detalhes.");
        });
}

function compara(recipes) {
    console.log("Receitas recebidas para comparação:", recipes);
    
    let calorie = Number(localStorage.getItem("calorie"));
    console.log("Caloria alvo:", calorie);

    if (isNaN(calorie)) {
        console.error("Valor de caloria inválido:", calorie);
        return;
    }

    let closestRecipe = null;
    let menorDif = Infinity;

    for (let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i];
        console.log("Receita atual:", recipe);

        let dif = Math.abs(recipe.calorias - calorie);
        
        if (dif < menorDif) {
            closestRecipe = recipe;
            menorDif = dif;
        }
    }
    console.log("Receita mais próxima final:", closestRecipe);
    displayRecipe(closestRecipe);
}

function displayRecipe(recipe) {
    if (!recipe) {
        console.error("Nenhuma receita encontrada para exibir.");
        return;
    }

    const container = document.getElementById('ic');
    container.innerHTML = `
        <div class="recipe">
            <h3>${recipe.receita}</h3>
            <h5>Categoria: ${recipe.categoria}</h5>
            <p>Calorias: ${recipe.calorias}</p>
            <p>Ingredientes: ${recipe.ingredientes}</p>
            <p>Quantidade: ${recipe.quantidade}</p>
            <p>Proteina: ${recipe.proteina}</p>
            <p>Gorduras: ${recipe.gorduras}</p>
            <p>Carboidratos: ${recipe.carbos}</p>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', readReceita);
