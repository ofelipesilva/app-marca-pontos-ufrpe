const logForm = document.querySelector('form');
const popupContent = document.querySelector('.popup-content');
const logButton = document.querySelector('.display');
const displayLog = document.querySelector('.log-content');
const logContainer = document.querySelector('.log-container');
let logData = [];

// SALVAR RESULTADO NO LOCALSTORAGE
logForm.addEventListener('submit', e => {
    e.preventDefault();

    const players = document.querySelectorAll('.player');
    players.forEach(pl => {
        logData.push({nome: pl.children[0].value, pontos: pl.children[2].textContent, title: logForm.logName.value});
    });
    logData[0].date = new Date();

    localStorage.setItem(logForm.logName.value, JSON.stringify(logData));
    logData = [];
    logForm.reset();

    // TOGGLE ENTRE O POP DE SAVE E O DE SAVE COMPLETO
    popup[0].style.display = 'none';
    popup[1].style.display = 'block';
});

// MOSTRAR OS LOGS COM OS RESULTADOS DE CADA JOGO
logButton.addEventListener('click', () => {
    displayLog.innerHTML = '';
    let u = [];

    for (let i = 0; i< localStorage.length; i++){
        u.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }

    // ORGANIZAR POR DATA
    u.sort((a, b) => {
        if (a[0].date > b[0].date){
            return 1;
        } else if (a[0].date < b[0].date){
            return -1
        } else{
            return 0;
        }
    });

    // ORGANIZAR POR PONTUAÇÃO
    u.forEach(game => {
        game.sort((a, b) => b.pontos - a.pontos);
    });

    // PARTE GRÁFICA
    u.forEach(game => {
        const ul = document.createElement('ul');
        displayLog.innerHTML += `<h2>${game[0].title}</h2>`;
        game.forEach(pl => {
            ul.innerHTML += `
                <li>${pl.nome}: ${pl.pontos}</li>
            `;
        });
        displayLog.appendChild(ul);
        displayLog.innerHTML += '<hr>'
    });

    displayLog.innerHTML += '<button class="popup-button" onclick="closePopup(2)">Fechar</button>';
    document.querySelector('.menu').style.width = '0';
    logContainer.style.display = 'block';
});
