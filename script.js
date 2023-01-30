const inputCountdown = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const datePicker = document.getElementById("date-picker");
const countdown = document.getElementById("countdown");
const countdownButton = document.getElementById("countdownButton");
const complete = document.getElementById("complete");
const completeButton = document.getElementById("complete-button");
const completeInfo = document.getElementById("complete-info");
const timeElements = document.querySelectorAll("span");
const countdownText = document.getElementById("countdown-title");
const titleColor = document.getElementById("title");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;
let countdownActive;

const second = 1000;
const minute = second*60;
const hour = minute*60;
const day = hour*24;

const today = new Date().toISOString().split("T")[0];
datePicker.setAttribute("min", today);



function updateDOM(){
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
    const distance = countdownValue - now;
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day)/hour);
    const minutes = Math.floor ((distance%hour)/minute);
    const seconds = Math.floor((distance%minute)/second);

    countdownText.textContent = `${countdownTitle}`;

    if(distance<0){
        countdown.hidden = true;
        inputCountdown.hidden = true;
        clearInterval(countdownActive);
        completeInfo.textContent = `${countdownTitle} Finished on ${countdownDate}`;
        complete.hidden = false;
        localStorage.removeItem("countdown");
    }else{
        timeElements[0].textContent = `${days}`;
        timeElements[1].textContent = `${hours}`;
        timeElements[2].textContent = `${minutes}`;
        timeElements[3].textContent = `${seconds}`;

        inputCountdown.hidden = true;
        countdown.hidden = false;
    }
    }, second)
}

function upcount(e){
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    countdownValue = new Date(countdownDate).getTime(); 
    let savedCountdown = {
        title: countdownTitle,
        date: countdownDate
    };
    localStorage.setItem("countdown", JSON.stringify(savedCountdown));
    if(countdownDate != ""){
        updateDOM();
    }else{
        datePicker.style.borderColor = "red";
    }
}

function Reset(){
    inputCountdown.hidden = false;
    countdown.hidden = true;
    countdownTitle = "";
    countdownDate = "";
    clearInterval(countdownActive);
    localStorage.removeItem("countdown");
}

function newCountdown(){
    inputCountdown.hidden = false;
    countdownTitle = "";
    countdownDate = "";
}

function dataBaseStorage(){
    if(localStorage.getItem("countdown")){
        inputCountdown.hidden = true;
        countdown.hidden = false;
        savedCountdown = JSON.parse(localStorage.getItem("countdown"));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}



countdownForm.addEventListener("submit", upcount);
countdownButton.addEventListener("click", Reset);
completeButton.addEventListener("click", newCountdown);
dataBaseStorage();