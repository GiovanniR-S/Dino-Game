const dino = document.querySelector(".dino");
const background = document.querySelector(".background");
let isJumping = false;
let position = 0;

let pontuação = 0;

var pontos = document.getElementById("pontos");
setInterval(() => {
    pontos.innerHTML = '<h3 class = "pontos">Pontuação: '+ pontuação +'</h3>'
}, 60);

function handleKeyUp(event) {
    if(event.keyCode === 32){
        if(!isJumping){
            jump();
        }
    }
}

function jump(){

    isJumping = true;

    let upInterval = setInterval(() => {
        if(position >= 200){
            clearInterval(upInterval);
            //Descendo
            let downInterval = setInterval(() => {
                if(position <= 0){
                    clearInterval(downInterval);
                    isJumping = false;
                }else{
                position -= 20;
                dino.style.bottom = position + "px";
                }
            }, 20);
            
        }else {
            //Subindo
            position += 20;
            dino.style.bottom = position + "px";
        }

    }, 20);
}

function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1500;
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = 1500 + "px";
    background.appendChild(cactus);

    let leftIntervarl = setInterval(() => {
        if(cactusPosition < -60){
            clearInterval(leftIntervarl);
            background.removeChild(cactus);
            pontuação++;
        }else if(cactusPosition > 0 && cactusPosition < 60 && position < 60){
            //Contado com o Dino
            clearInterval(leftIntervarl);
            document.body.innerHTML = '<h1 class="gameOver">Fim de Jogo</h1>\n <h3 class = "pontuação">Pontuação: ' + pontuação +'</h3>\n <i class="fas fa-redo"></i>';
        } else{
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + "px";
        }
    }, 20);

    setTimeout(createCactus, randomTime);

}

createCactus();

document.addEventListener('keyup', handleKeyUp);