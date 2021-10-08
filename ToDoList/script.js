const entrada = document.querySelector('#item');
const botaoAdd = document.querySelector('#add');
const lista = document.querySelector('#produtos');

lista.addEventListener('click', (e) => {
    if(e.target.className === 'del-btn') {
        lista.removeChild(e.target.parentNode);
    }
})
botaoAdd.addEventListener('click', function(e) {
    let igual = 0
    for (let i = 0; i < lista.children.length; i++) {
        if (lista.children[i].firstElementChild.firstChild.nodeValue == entrada.value) {
            igual = 1;
            break;
        }
    }
    if (igual == 0) {
        let codigoAdicionar = `<li class="lista"><p>${entrada.value}</p><button type="button" id="deletar" class="del-btn" type="button">DEL</button></li>`;
        lista.innerHTML += codigoAdicionar;
        entrada.value = null;
    } else {
        alert("Tarefa ja existente!");
        entrada.value = null;
        igual = 0;
    }
    e.preventDefault();
});

