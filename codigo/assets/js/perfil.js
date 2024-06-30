document.addEventListener('DOMContentLoaded', function () {
    const editBtn = document.getElementById('edit-btn');
    const userInfoSpans = document.querySelectorAll('.profile-info span');
    const fileUpload = document.getElementById('file-upload');
    const userPic = document.getElementById('user-pic');

    editBtn.addEventListener('click', function () {
        userInfoSpans.forEach(span => {
            const currentValue = span.textContent;
            const input = document.createElement('input');
            input.setAttribute('value', currentValue);
            span.textContent = '';
            span.appendChild(input);
        });

        fileUpload.style.display = 'block';

        editBtn.textContent = 'Salvar';
        // Use 'this' to refer to the current button element
        editBtn.removeEventListener('click', arguments.callee);
        editBtn.addEventListener('click', function () {
            userInfoSpans.forEach(span => {
                const input = span.querySelector('input');
                span.textContent = input.value;
            });

            fileUpload.style.display = 'none';
            editBtn.textContent = 'Editar';
            // Restore the original click listener
            editBtn.removeEventListener('click', arguments.callee);
            editBtn.addEventListener('click', this);
        });
    });

    fileUpload.addEventListener('change', function (event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            userPic.src = e.target.result;
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    });
});
function verificaAdmin() {
    let user = sessionStorage.getItem("usuarioCorrente");
    user = JSON.parse(user);
    if (user && user.login === "admin") {
        console.log("Admin logado");
        document.getElementById("cadastroReceitasContainer1").style.display = 'block';
        document.getElementById("cadastroReceitasContainer2").style.display = 'block';
    }
}

function verificaLogin() {
    let user = sessionStorage.getItem("usuarioCorrente");
    user = JSON.parse(user);
    if (user && user.login !== "admin") {
        console.log("Usuário não-admin está logado");
        document.getElementById("containerLogin").style.display = 'none';
        document.getElementById("containerPerfil").style.display = 'block';
    } else {
        console.log("Usuário não logado ou admin");
    }
}

window.onload = function () {
    const usuarioJSON = localStorage.getItem('usuario');
    verificaAdmin();
    verificaLogin();
    

    if (usuarioJSON) {
        const usuario = JSON.parse(usuarioJSON);
        const name = document.getElementById("name");
        const age = document.getElementById("age")
        const weight = document.getElementById("weight");
        const height = document.getElementById("height")
        const tel = document.getElementById("tel");
        const sex = document.getElementById("sex")
        const fotoPerfil = document.getElementById('user-pic');
        fotoPerfil.src = usuario.foto; // Corrected to 'src'
        name.textContent = usuario.nome; // Corrected from 'usuarioJSON.name' to 'usuario.name'
        age.textContent = usuario.idade;
        weight.textContent = usuario.peso;
        height.textContent = usuario.altura;
        tel.textContent = usuario.telefone;
        sex.textContent = usuario.sexo;
    } else {
        document.getElementById('perfilJson').textContent = 'Nenhum usuário encontrado';
    }
};



document.addEventListener("DOMContentLoaded", function() {
    const initialData = [
        {
            id: 1,
            name: "Receita 1",
            email: "email1@example.com",
            altura: "1.75m",
            idade: 30,
            telefone: "123456789",
            foto: "link-para-imagem-1.jpg"
        },
        {
            id: 2,
            name: "Receita 2",
            email: "email2@example.com",
            altura: "1.65m",
            idade: 25,
            telefone: "987654321",
            foto: "link-para-imagem-2.jpg"
        }
    ];

    if (!localStorage.getItem("recipes")) {
        localStorage.setItem("recipes", JSON.stringify(initialData));
    }

    if (!localStorage.getItem("usuario")) {
        localStorage.setItem("usuario", JSON.stringify([])); // Inicializa como um array vazio
    }

    if (!localStorage.getItem("salvo")) {
        localStorage.setItem("salvo", "1"); // ou qualquer ID padrão que você queira
    }

    cadastro(); // Chama a função cadastro após a inicialização do DOM
});



function cadastro(recipes) {
    let str = '';
    let savedId = localStorage.getItem("salvo");
    let savedNum = parseInt(savedId, 10);
    let usuarioRecipes = JSON.parse(localStorage.getItem("usuario")) || [];

    for (let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i];
        if (recipe.id == savedNum) {
            let isUsuario = usuarioRecipes.some(r => r.id === recipe.id);
            let activeClass = i === 0 ? 'active' : '';

            str += `<div class="infos-item ${activeClass}">
                <a href="index.html">
                    <img src="${recipe.foto}" class="d-block w-2" alt="..."></img>
                </a>
                <div class="infos-caption d-none d-md-block">
                    <h5 class="cardtext"><span class="titulopag">${recipe.name}</span></h5>
                    <p class="cardtext"><span class="pagtxt"> ${recipe.email}</span></p>
                    <p class="cardtext"><span class="pagtxt"> ${recipe.altura}</span></p>
                    <p class="cardtext"><span class="pagtxt"> ${recipe.idade}</span></p>
                    <p class="cardtext"><span class="pagtxt"> ${recipe.telefone}</span></p>
                    <button class="favorite-btn" onclick="toggleFavorites(${recipe.id})">
                        <span class="heart-icon"></span>
                    </button>
                </div>
            </div>`;
        }
    }

    for (let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i];
        if (recipe.id == savedNum) {
            let isUsuario = usuarioRecipes.some(r => r.id === recipe.id);
            let activeClass = i === 0 ? 'active' : '';

            str += `<div class="infos-item ${activeClass}">
                <a href="index.html">
                    <img src="${recipe.foto}" class="d-block w-2" alt="..."></img>
                </a>
                <div class="infos-caption d-none d-md-block">
                    <h5 class="cardtext"><span class="titulopag">${recipe.name}</span></h5>
                    <p class="cardtext"><span class="pagtxt"> ${recipe.email}</span></p>
                    <p class="cardtext"><span class="pagtxt"> ${recipe.altura}</span></p>
                    <p class="cardtext"><span class="pagtxt"> ${recipe.idade}</span></p>
                    <p class="cardtext"><span class="pagtxt"> ${recipe.telefone}</span></p>
                    <button class="favorite-btn" onclick="toggleFavorites(${recipe.id})">
                        <span class="heart-icon"></span>
                    </button>
                </div>
            </div>`;
        }
    }




    let telaElement = document.getElementById('ic');
    if (telaElement) {
        telaElement.innerHTML = str;
    } else {
        console.error("Elemento com id 'ic' não encontrado no DOM");
    }
}
document.addEventListener('DOMContentLoaded', function() {
    let favoriteRecipes = JSON.parse(localStorage.getItem("favoritas")) || [];
    if (favoriteRecipes.length === 0) {
        displayMessage("Nenhum item favorito encontrado.");
        return;
    }

    let favoriteId = favoriteRecipes[0]; // Supondo que você quer mostrar o primeiro favorito da lista

    fetch("../assets/db/dbAlimentos.json")
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar dados: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (!data || !data.receitas || data.receitas.length === 0) {
                throw new Error('O arquivo JSON não possui receitas válidas.');
            }

            let favoriteItem = data.receitas.find(recipe => recipe.id === favoriteId);
            if (favoriteItem) {
                renderFavoriteItem(favoriteItem);
            } else {
                displayMessage("Item favorito não encontrado nos dados.");
            }
        })
        .catch(error => {
            console.error('Erro ao ler receitas:', error);
            displayMessage("Erro ao ler receitas. Verifique o console para mais detalhes.");
        });
});

function renderFavoriteItem(item) {
    let container = document.getElementById('favorite-item-container');
    if (container) {
        container.innerHTML = `
            <div class="infos-item">
                <a href="infos.html">
                    <img src="${item.foto}" class="d-block w-2" alt="...">
                </a>
                <div class="infos-caption d-none d-md-block">
                    <h5 class="cardtext"> <span class="titulopag"> ${item.receita} </span></h5>
                    <p class="cardinfos"><span class="pagtxt"> Quantidade por Porção: </span> ${item.quantidade}</p>
                    <p class="cardinfos"><span class="pagtxt"> Categoria: </span>${item.categoria}</p>
                    <p class="cardinfos"><span class="pagtxt"> Calorias por Porção: </span>${item.calorias}kcal</p>
                    <p class="cardinfos"><span class="pagtxt"> Ingredientes: </span>${item.ingredientes}</p>
                    <p class="cardinfos"><span class="pagtxt"> Proteínas: </span> ${item.proteina}g</p>
                    <p class="cardinfos"><span class="pagtxt"> Gorduras: </span> ${item.gorduras}g</p>
                    <p class="cardinfos"><span class="pagtxt"> Carboidratos: </span> ${item.carbos}g</p>
                    <button class="favorite-btn" onclick="toggleFavorite(${item.id})">
                        ${isFavorite(item.id) ? 'Desfavoritar' : 'Favoritar'}
                    </button>
                    <button class="comment-btn" onclick="viewComments(${item.id})">
                        Visualizar Comentários
                    </button>
                </div>
            </div>`;
    } else {
        console.error("Elemento com id 'favorite-item-container' não encontrado no DOM.");
    }
}

function isFavorite(recipeId) {
    let favoriteRecipes = JSON.parse(localStorage.getItem("favoritas")) || [];
    return favoriteRecipes.includes(recipeId);
}

function displayMessage(msg) {
    alert(msg);
}

