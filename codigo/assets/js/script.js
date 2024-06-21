document.addEventListener('DOMContentLoaded', function() {
    const editBtn = document.getElementById('edit-btn');
    const userInfoSpans = document.querySelectorAll('.profile-info span');
    const fileUpload = document.getElementById('file-upload');
    const userPic = document.getElementById('user-pic');

    editBtn.addEventListener('click', function() {
        userInfoSpans.forEach(span => {
            const currentValue = span.textContent;
            const input = document.createElement('input');
            input.setAttribute('value', currentValue);
            span.textContent = '';
            span.appendChild(input);
        });

        fileUpload.style.display = 'block';

        editBtn.textContent = 'Salvar';
        editBtn.removeEventListener('click', arguments.callee);
        editBtn.addEventListener('click', function() {
            userInfoSpans.forEach(span => {
                const input = span.querySelector('input');
                span.textContent = input.value;
            });

            fileUpload.style.display = 'none';
            editBtn.textContent = 'Editar';
            editBtn.addEventListener('click', arguments.callee);
        });
    });

    fileUpload.addEventListener('change', function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            userPic.src = e.target.result;
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    });
});
window.onload = function(){
    const usuarioJSON = localStorage.getItem('usuario');
    
    if(usuarioJSON){
        const usuario = JSON.parse(usuarioJSON);
        const    fotoPerfil = document.getElementById('fotoPerfil');
        fotoPerfil.scr = usuario.foto
        const perfilJsonPre = document.getElementById('perfilJson');
        perfilJsonPre.textContent = JSON.stringify(usuario, null,2);
    }else {
        document.getElementById('perfilJson').textContent = 'Nenhum usuarío encontrado';
    }
} 