const apiUrl = '/receitas';

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
            ingredientes(data);  // Chama a função com o array de receitas
        })
        .catch(error => {
            console.error('Erro ao ler receitas:', error);
            displayMessage("Erro ao ler receitas. Verifique o console para mais detalhes.");
        });
}

function ingredientes(recipes) {
    let str = '';
    let savedId = localStorage.getItem("salvo");
    let savedNum = parseInt(savedId, 10);
    let favoriteRecipes = JSON.parse(localStorage.getItem("favoritas")) || [];

    for (let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i];
        if (recipe.id == savedNum) {
            let isFavorite = favoriteRecipes.includes(recipe.id);
            let activeClass = i === 0 ? 'active' : '';
            
            str += `<div class="infos-item ${activeClass}">
                        <a href="infos.html">
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
        }
    }

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

readReceita();