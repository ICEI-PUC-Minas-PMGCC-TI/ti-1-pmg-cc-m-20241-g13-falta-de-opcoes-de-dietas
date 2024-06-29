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
    let favoriteRecipes = JSON.parse(localStorage.getItem("favoritas")) || [];
    let isFavorite = favoriteRecipes.includes(recipe.id);
    const container = document.getElementById('ic');
    container.innerHTML = `
<div class="infos-item">
                        <a href="compara.html">
                            <img src="${recipe.foto}" class="d-block w-2" alt="...">
                        </a>
                        <div class="informacoes">
                            <h5 class="cardtext"> <span class="titulopag"> ${recipe.receita} </span></h5>
                            <p class="cardinfos"><span class="pagtxt"> Quantidade por Porção: </span> ${recipe.quantidade}</p>
                            <p class="cardinfos"><span class="pagtxt"> Categoria: </span>${recipe.categoria}</p>
                            <p class="cardinfos"><span class="pagtxt"> Calorias por Porção: </span>${recipe.calorias}kcal</p>
                            <p class="cardinfos"><span class="pagtxt"> Ingredientes: </span>${recipe.ingredientes}</p>
                            <p class="cardinfos"><span class="pagtxt"> Proteínas: </span> ${recipe.proteina}g</p>
                             <p class="cardinfos"><span class="pagtxt"> Gorduras: </span> ${recipe.gorduras}g</p>
                            <p class="cardinfos"><span class="pagtxt"> Carboidratos: </span> ${recipe.carbos}g</p>
                            <div class="botoes">
                            <button class="favorite-btn" onclick="toggleFavorite(${recipe.id})">
                            <span class="heart-icon"></span>
                            </button>
                            <button class="favorite-btn" onclick="toggleFavorite(${recipe.id})">
                                ${isFavorite ? 'Desfavoritar' : 'Favoritar'}
                            </button>
                            <button class="comment-btn" onclick="window.location.href='/pages/exibMSG.html';">
                                Visualizar Comentários
                            </button>
                            </div>
                        </div>
                    </div>`;
                    let telaElement = document.getElementById('ic');
                    if (telaElement) {
                        telaElement.innerHTML = str;
                    } else {
                        console.error("Elemento com id 'ic' não encontrado no DOM.");
                    }
                }
                
                function toggleFavorite(recipeId) {
                    let favoriteRecipes = JSON.parse(localStorage.getItem("favoritas")) || [];
                
                    if (favoriteRecipes.includes(recipeId)) {
                        favoriteRecipes = favoriteRecipes.filter(id => id !== recipeId);
                    } else {
                        favoriteRecipes.push(recipeId);
                    }
                
                    localStorage.setItem("favoritas", JSON.stringify(favoriteRecipes));
                    readReceita(); // Re-render the list to update the favorite buttons
                }
                
                function displayMessage(msg) {
                    alert(msg);
                }



document.addEventListener('DOMContentLoaded', readReceita);
