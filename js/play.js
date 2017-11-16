'use strict';

// global vaiable keeping track of what question you're on
let globalI = 0;
let objArray = [];

// global variable to keep track of score
// let score = 0;
// let scoresArray = [];

// timer function in seconds(a)
let a = 3;
const i = setInterval(timer, 1000); //eslint-disable-line
function timer() {
    if(a < 1){

        // find and remove elements on page
        const ele = document.getElementById('quiz');
        while(ele.hasChildNodes()){
            ele.removeChild(ele.lastChild);
        }

        // move to next question
        globalI++;
        if(globalI < 10){
            render();
        }else if(globalI === 10){
            drawChart();
        }else{}
        // reset timer
        a = 3;
    }
    a -= 1;
}

if(localStorage.objArray){
    const objArrayArray = JSON.parse(localStorage.objArray);
    console.log('objArrayArray', objArrayArray);
    for(let i = 0; i < objArrayArray.length; i++){
        const obj = new ShortCut(objArrayArray[i].keys, objArrayArray[i].description, objArrayArray[i].gifURL, objArrayArray[i].keyCode, objArrayArray[i].score);
        objArray.push(obj);
    }
}else{
    // object instances
    const cutLine = new ShortCut(['ctrl', 'x'], 'Removes selected line.', 'img/ctrlX.gif', [17, 88]);
    const toggleWrap = new ShortCut(['alt', 'z'], 'Will toggle word wrap on and off.', 'img/altZ.gif', [18, 90]);
    const lineMove = new ShortCut(['alt', 'down'], 'Moves current line down. If there is a line directly below current line they swap places. You can use the up arrow and it wil do the opposite.', 'img/altDown.gif', [18, 40]);
    const findError = new ShortCut(['f8'], 'Will jump to the next error in your code', 'img/f8.gif',[119]);
    const indent = new ShortCut(['ctrl', ']'], 'Indents selected text one tab to the left. [ will remove and indent.', 'img/ctrlBracket.gif', [17, 221]);
    const matchingOpenClose = new ShortCut(['ctrl', 'shift', '\\'], 'Will find the matching bracket, parentheses, or curly brace.', 'img/ctrlShiftBSlash.gif', [17, 16, 220]);
    const commentLine = new ShortCut(['ctrl', '/'], 'Will comment out the current line of code, or currently selected lines.', 'img/ctrlSlash.gif', [17, 191]);
    const selectTerm = new ShortCut(['ctrl', 'f2'], 'Highlights and selects all instances of current word', 'img/ctrlF2.gif', [17, 113]);
    const openConsole = new ShortCut(['ctrl', '`'], 'Will open the console. Here you can access terminal, debug console, problems, and output.', 'img/ctrlAccent.gif', [17, 192]);
    const undo = new ShortCut(['ctrl', 'z'], 'Will undo the last change you have made. You can keep hitting it and it will continue to undo changes. Control Y will bring the change back.', 'img/ctrlZ.gif', [17, 90]);

    objArray = [cutLine, toggleWrap, lineMove, findError, indent, matchingOpenClose, commentLine, selectTerm, openConsole, undo];
}
// constructor for keyboard shortcut elements
function ShortCut(keys, description, gifURL, keyCode, score){
    this.keys = keys;
    this.description = description;
    this.gifURL = gifURL;
    this.keyCode = keyCode;
    this.score = score || 0;
}

// function to render key and description elements
ShortCut.prototype.renderGifs = function(description, gifURL) {
    const quiz = document.getElementById('quiz');
    const ele = document.createElement('img');
    const desc = document.createElement('p');

    desc.textContent = description;
    ele.src = gifURL;

    quiz.appendChild(ele);
    quiz.appendChild(desc);
};

// functions to render gifs and description elements to quiz play page
function render(){

    if(globalI < 10){
        ShortCut.prototype.renderGifs(objArray[globalI].description, objArray[globalI].gifURL);
    }
    localStorage.setItem('objArray', JSON.stringify(objArray));
}
render();

// keyboard even handler section
const map = [];
onkeydown = onkeyup = function(e){ //eslint-disable-line
    const ele = document.getElementById('quiz');

    e = e || event;
    map[e.keyCode] = e.type == 'keydown';

    // check if number of keys in object instance = 2
    if(objArray[globalI].keys.length === 2){
        // check if keys inputted are correct for the object instance
        if(map[objArray[globalI].keyCode[0]] && map[objArray[globalI].keyCode[1]]){
            // remove elements from page
            while(ele.hasChildNodes()){
                ele.removeChild(ele.lastChild);
            }
            // track what question you're on
            globalI++;
            // resets timer
            a = 3;
            // track score
            // score++;
            objArray[globalI].score++;
            // render new elements
            if(globalI < 10){
                render();
            }else if(globalI === 10){
                drawChart();
            }else{}
        }
    }

    if(objArray[globalI].keys.length === 3){
        if(map[objArray[globalI].keyCode[0]] && map[objArray[globalI].keyCode[1]] && map[objArray[globalI].keyCode[2]]){
            while(ele.hasChildNodes()){
                ele.removeChild(ele.lastChild);
            }
            globalI++;
            a = 3;
            // score++;
            if(globalI < 10){
                render();
            }else if(globalI === 10){
                drawChart();
            }else{}
        }
    }
    if(objArray[globalI].keys.length === 1){
        if(map[objArray[globalI].keyCode[0]]){
            while(ele.hasChildNodes()){
                ele.removeChild(ele.lastChild);
            }
            globalI++;
            a = 3;
            // score++;
            if(globalI < 10){
                render();
            }else if(globalI === 10){
                drawChart();
            }else{}
        }
    }
};

function drawChart () {
    const chartCanvas = document.getElementById('myChart');
    const context = chartCanvas.getContext('2d');
    Chart.defaults.global.defaultFontColor = '#ffffff'; // eslint-disable-line
    const shortcutScore = [];
    const shortcutNames = ['CTRL ' + '+ ' + 'X', 'ALT ' + '+ ' + 'Z', 'ALT ' + '+ ' + 'DOWN', 'F8', 'CTRL ' + '+ ' + ']', 'CTRL ' + '+ ' + 'SHIFT ' + '+ ' + '\\', 'CTRL ' + '+ ' + '/', 'CTRL ' + '+ ' + 'F2', 'CTRL ' + '+ ' + '`', 'CTRL ' + '+ ' + '`', 'CTRL ' + '+ ' + 'Z'];
    console.log(shortcutScore);
    console.log(shortcutNames);
    // const clickedData = [];
    // const shownData = [];
    console.log('Shortcut Score: ' + shortcutScore);
    // console.log('Clicked data: ' + clickedData);
    for ( let i = 0; i < objArray.length; i++ ){
        shortcutScore.push(objArray[i].score);
        // shortcutNames.push(objArray[i].keys);
        // shownData.push(itemList[i].shown);
    }

    const chart = new Chart ( // eslint-disable-line
        context,
        {
            type: 'bar',
            data: {
                labels: shortcutNames,
                datasets: [
                    {
                        label: 'Shortcut Correct Answers',
                        data: shortcutScore,
                        backgroundColor: 'red',
                        defaultFontFamily: 'Arial',
                    },
                    // {
                    //     label: 'Shown Data',
                    //     data: shownData,
                    //     backgroundColor: 'blue',
                    //     defaultFontFamily: 'Arial',
                    // }
                ]
            },
            options: {
                borderColor: [
                    'rgba(0,0,0,1)'
                ],
                borderWidth: 10,
                title: {
                    display: true,
                    text: 'Shortcut Data',
                    fontSize: 25,
                    defaultFontFamily: 'Arial',
                    fontStyle: 'bold',
                    fontColor: 'white',
                    padding: 10,
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                animation: {
                    duration: 2000,
                    easing: 'linear',
                },
            }
        }
    );
}

// 'CTRL ' + '+ ' + 'X'
// 'ALT ' + '+ ' + 'Z'
// 'ALT ' + '+ ' + 'DOWN'
// 'F8'
// 'CTRL ' + '+ ' + ']'
// 'CTRL ' + '+ ' + 'SHIFT ' + '+ ' + '\\'
// 'CTRL ' + '+ ' + '/'
// 'CTRL ' + '+ ' + 'F2'
// 'CTRL ' + '+ ' + '`'
// 'CTRL ' + '+ ' + 'Z'