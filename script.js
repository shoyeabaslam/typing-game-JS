let text = "In the vast expanse of the desert sand stretches endlessly beneath the scorching sun a lone traveler journeys forward guided only by the distant horizon where the promise of a new beginning awaits amid the silence of the dunes";
console.log(text.length)
let textArray = text.split(' ');
// html elements
let timerElement = document.querySelector('.timer');
let textAreaElement = document.querySelector('.typing_area-wrapper')

let isTimerStarted = false;
let sec = 5;
let isEnd = false;

textArray.forEach((words)=>{
    let letters = words.split('');
    let innerDiv = document.createElement('div');
    letters.forEach((letter)=>{
        let letterElement = document.createElement('letter');
        letterElement.innerText = letter;
        innerDiv.appendChild(letterElement);
    })
    textAreaElement.appendChild(innerDiv)
})

// Get the childnodes of the innerDiv

let divNodes = textAreaElement.childNodes;
let nodeCount = 0;
let letterCount = 0;
let noOfLettersClicked = 0; // to calculate the typing speed
let totatNoOfCorrectLetter = 0;

firstLetter = divNodes[0].childNodes[0].classList.add('active')

function handleTyping(e){
    if(nodeCount >= divNodes.length || isEnd){
        showResult()
        return;
    }
    console.log(e.key)
    //starting the timer.....
    if(!isTimerStarted){
        startTimer();
        isTimerStarted = !isTimerStarted
    }

    let letterNodes = divNodes[nodeCount].childNodes;
    if(letterCount < letterNodes.length){
        if(letterNodes[letterCount].innerText === e.key){
            letterNodes[letterCount].classList.remove('active');
            letterNodes[letterCount].style.color = '#e2b714'
            letterCount++;
            if(letterCount < letterNodes.length)
                letterNodes[letterCount].classList.add('active');
            totatNoOfCorrectLetter++;
        }
        //incorrect character entered
        else{
            letterNodes[letterCount].style.color = '#E12353'
        }
        
    }
    //incase space move the cursor
    else if(letterCount >= letterNodes.length && nodeCount < divNodes.length && e.key === ' ' ){
        letterCount = 0;
        nodeCount++;
        divNodes[nodeCount].childNodes[letterCount].classList.add('active');        
    }
    noOfLettersClicked++;
}

document.addEventListener('keydown',handleTyping)

let TimeId = null
function startTimer(){
    TimeId = setInterval(()=>{
            if(sec == 0) {
                isEnd = !isEnd;
                showResult();
            }
            timerElement.innerText = `00:${sec < 10 ? '0'+sec:sec}`;
            sec--;
    },1000);
    function stopTimer(){
        clearInterval(id);
    }
}

function stopTimer(){
    timerElement.innerText = '00:00'
    clearInterval(TimeId)
}

function showResult(){
    stopTimer();
    let resultElement = document.querySelector('.output_area-wrapper div span');
    let accuracy = Math.floor((totatNoOfCorrectLetter /noOfLettersClicked) *100);
    let totalWords = text.substring(0,totatNoOfCorrectLetter).split(' ').length;
    let wpm = totalWords * 2;
    resultElement.innerHTML = `WPM : ${wpm} &nbsp;&nbsp;&nbsp; Accuracy : ${accuracy}%`;
}

function playAgain(){
    showResult()
}