// ENGINE DO APP

// ------------------- VARIÁVEIS -------------------
const mesa = document.querySelector('.mesa');
const addJogador = document.querySelector('.addJogador');
const novoJogador = document.querySelector('.novoJogador');
// CORES
const color = ['#0569BE', '#C71C24', '#019C42', '#c77400', '#bf50bf'];
let colorSelector = 2;

// -------------------- FUNÇÕES --------------------
const createPlayer = (color) => {
    const html = document.createElement('div');
    html.setAttribute('class', 'player');
    html.setAttribute('style', `background-color: ${color}`);
    html.innerHTML = `
        <input type="text" placeholder="nome do jogador">
        <div class="minus fa fa-minus"></div>
        <button class="score" style="background-color: ${color};">0</button>
        <div class="trash fa fa-trash-o"></div>
    `;

    mesa.append(html);
};

// -------------------- EVENTOS --------------------

// CONTROLE DOS JOGADORES
mesa.addEventListener('click', event => {
    const score = event.target.parentElement.querySelector('.score');
    if (event.target.classList.contains('trash')){
        event.target.parentElement.remove();
        
        // CONTROLE DAS CORES
        if (colorSelector > 0){
            colorSelector--;
        }
    }

    if (event.target.classList.contains('minus')){
        score.textContent = eval(score.textContent - 1);
    }

    if (event.target.tagName === 'BUTTON'){
        if (event.target.classList.contains('score')){
            score.textContent = Number(score.textContent) + 1;
        }
    }
});

// ADICIONA UM NOVO JOGADOR A MESA
novoJogador.addEventListener('click', event => {
    if (event.target.className === 'addJogador'){
        createPlayer(color[colorSelector]);

        // CONTROLE DAS CORES
        colorSelector++;
        if (colorSelector === 5){
            colorSelector = 0;
        }
    }
});

// RESETAR A PONTUAÇÃO
const reset = document.querySelector('.reset');
reset.addEventListener('click', () => {
    const scores = document.querySelectorAll('.score');

    scores.forEach(score => score.innerText = 0);
    document.querySelector('.menu').style.width = '0';
});

// CONTROLES DO MENU
const openMenu = () => {
    document.querySelector('.menu').style.width = '250px';
};

const closeMenu = () => {
    document.querySelector('.menu').style.width = '0';
};
