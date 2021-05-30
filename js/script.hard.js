const cardsAnime = [{
    'name': 'alucard',
    'img': 'img/anime/alucard.jpg',
},
{
    'name': 'avatar',
    'img': 'img/anime/avatar.jpg',
},
{
    'name': 'deathL',
    'img': 'img/anime/deathL.jpg',
},
{
    'name': 'dragon',
    'img': 'img/anime/dragon.jpg',
},
{
    'name': 'elizabet',
    'img': 'img/anime/elizabet.jpg',
},
{
    'name': 'esdeath',
    'img': 'img/anime/esdeath.jpg',
}, 
{
    'name': 'giyu',
    'img': 'img/anime/giyu.jpg',
},
{
    'name': 'haku',
    'img': 'img/anime/haku.png',
},
{
    'name': 'inori',
    'img': 'img/anime/inori.png',
}, 
{
    'name': 'itaci',
    'img': 'img/anime/itaci.jpg',
}, 
{
    'name': 'mdluffy',
    'img': 'img/anime/mdluffy.jpg',
}, 
{
    'name': 'Sebastian',
    'img': 'img/anime/Sebastian.jpg',
}
];


//random düzen 
const gameGrid = cardsAnime
    .concat(cardsAnime)
    .sort(() => 0.5 - Math.random()); 

let firstGuess = '';
let secondGuess = '';
let count = 0;  
let previousTarget = null;
let delay = 1200;
let point = 0;
let trueCount = 0;

// oyun elementi getir
const game = document.getElementById('game');
//section oluştur
const grid = document.createElement('section');
//class ata grid
grid.setAttribute('class', 'grid');
//game child olarak ekle gridi
game.appendChild(grid);

gameGrid.forEach(item => {
    const { name, img } = item;

    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = name;

    const front = document.createElement('div');
    front.classList.add('front');

    const back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url(${img})`;

    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
});

const match = () => {
    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.add('match');
        card.classList.add('hide');
    });
    // tümü dogru ise 
    if (trueCount==cardsAnime.length) {
        winGame();
        clearInterval(timerStart);
    } 
    
};

const resetGuesses = () => {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;
    var selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
    card.classList.remove('selected');
    });
       
};

var elementTimer = document.getElementById("timer");
var snTime = 180;
var timedk = 3;
var timesn = 60;
function timerCount() {
    if(snTime %60 == 0 )
    {
        timedk--;
        timesn=59;
    }else
    {
        timesn--;
    }
    snTime--;
    
    if (snTime == 0) {
        clearInterval(timerStart); //timer durdurma fonksiyonu 
        snTime=0;
        gameOver();
    }
   
   elementTimer.innerHTML = timedk+":"+timesn;
}

function restartGame() {        
    window.location = "./index.html";
}

function gameOver() {
    statebar.style.visibility="hidden";
    newgame.style.visibility = "hidden";
    uyari.style.display="block";
    playAudio(timeoutSound);
    
}
var uyari=document.getElementById("uyari");
var newgame = document.getElementById("game");
console.log(newgame);
var incorrectSound = document.getElementById("sound1"); 
var othergameSound = document.getElementById("sound2"); 
var timeoutSound = document.getElementById("sound3");
var correctSound = document.getElementById("sound4");

var statebar = document.getElementById("statebar");

function winGame() {
    statebar.style.visibility="hidden";
    uyari.style.display="block";
    let kazandin = document.getElementById("timewarning");
    console.log(kazandin);
    kazandin.innerHTML = "Oyunu Kazandınız!";
    playAudio(othergameSound); 
    let zaman = document.getElementById("timewrite");
    zaman.innerHTML = "Kalan Süre: " + elementTimer.innerHTML;
}


function playAudio(elementSound) {  
    elementSound.play(); 
} 



//Ses açıp kapama için    
var soundclick = 0; //default değer

 function soundSetting(){     
    if (soundclick ==0){
        incorrectSound.muted = true;
        othergameSound.muted = true;
        timeoutSound.muted = true;
        correctSound.muted = true;
        soundclick=1;
    }else {
        incorrectSound.muted = false;
        othergameSound.muted = false;
        timeoutSound.muted = false;
        correctSound.muted = false;
        soundclick=0;
    }
  
}


//her 1 saniyedde timer çagır ve ekrana yazdır

var timerStart = setInterval(timerCount, 1000);



// span elementine ulaş ve puanı eklenek için elementi degişkene ata
var elementPuan = document.getElementById("spanPoint");


grid.addEventListener('click', event => {

    const clicked = event.target;

    if (
        clicked.nodeName === 'SECTION' ||
        clicked === previousTarget ||
        clicked.parentNode.classList.contains('selected') ||
        clicked.parentNode.classList.contains('match')
    ) {
        return;
    }

    if (count < 2) {
        count++;
        if (count === 1) {
            firstGuess = clicked.parentNode.dataset.name;
            console.log(firstGuess);
         
            clicked.parentNode.classList.add('selected');
        } else {
            secondGuess = clicked.parentNode.dataset.name;
            console.log(secondGuess);
         
            clicked.parentNode.classList.add('selected');
        }

        if (firstGuess && secondGuess) {
            if (firstGuess === secondGuess) {
                //dogru ise truecount artır
                trueCount++; 
                // tüm tahinler dogru ise 
                playAudio(correctSound);
                
                //dogru ise puana 10 ekle 
                point = point + 10;
                elementPuan.innerText = point;
                setTimeout(match, delay);
               
            }
            else{
                
                console.log(firstGuess.classList);
                console.log( secondGuess.classList);
                playAudio(incorrectSound);
            }
            
            setTimeout(resetGuesses, delay);
        }
        previousTarget = clicked;
    }

});
//oyun sonu