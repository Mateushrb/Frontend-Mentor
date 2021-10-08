// Contagem do tempo
const minutos = document.querySelector('#minutos');
const segundos = document.querySelector('#segundos');

// Tarefa que está sendo executada no momento
const executando = document.querySelector('#executando');

// Botão de start
const start = document.querySelector('#btn-submit');

// Campo de tarefas concluídas
const tarefaConcluida = document.querySelector('#tarefa-concluida');

// Input da tarefa
let tarefa = document.querySelector('#tarefa');

// Variável de controle
let iniciada = false;

// Função para iniciar com click no botão
start.addEventListener('click', (e) => {
    if (iniciada == false) {
        executando.innerText = `Executando: ${tarefa.value}`;
        console.log(`Nova tarefa: "${tarefa.value}."`);
        tarefa.value = null;
        iniciada = true;
        Start();
    } else {
        tarefa.value = null;
        alert("Tarefa em andamento");
    }
})

// Função para iniciar com a tecla Enter
tarefa.addEventListener('keyup', (e) => {
    let key = e.which || e.keyCode;
    if (key == 13) {
        if (iniciada == false) {
            executando.innerText = `Executando: ${tarefa.value}`;
            console.log(`Nova tarefa: "${tarefa.value}."`);
            tarefa.value = null;
            iniciada = true;
            tarefa.blur();
            Start();
        } else {
            tarefa.blur();tarefa.value = null;
            alert("Tarefa em andamento");
        }
    }
})

// Função principal
function Start() {
    // Se o tempo for igual a zero, tudo é zerado
    if (parseInt(minutos.innerText) == 0 && parseInt(segundos.innerText) == 0) {
        minutos.innerText = "25";
        segundos.innerText = "00";
        tarefaConcluida.innerHTML += `<span>${executando.innerText.substring(12)}</span>`;
        executando.innerText = "Nenhuma atividade está sendo executada";
        iniciada = false;
    } else {
        // Contagem do tempo
        if (parseInt(segundos.innerText) > 10) {
            segundos.innerText = parseInt(segundos.innerText) - 1;
        } else if (parseInt(segundos.innerText) > 0) {
            segundos.innerText = `0${parseInt(segundos.innerText) -1}`;
        } else {
            if (parseInt(minutos.innerText) > 10) {
                minutos.innerText = parseInt(minutos.innerText) - 1;
                segundos.innerText = "59";
            } else if (parseInt(minutos.innerText) > 0) {
                minutos.innerText = `0${parseInt(minutos.innerText) - 1}`;
                segundos.innerText = "59";
            } else {
                segundos.innerText = "59";
            }
        }
        // Para fins de teste, diminua o tempo para acelerar o timer
        setTimeout('Start();', 1000);
    }
}