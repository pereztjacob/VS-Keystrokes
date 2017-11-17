'use strict';

// global variable to keep track of number of rendered items
let globalI = 0;
let objArray = [];
// constructor for keyboard shortcuts
function ShortCut(keys, description, gifURL, keyCode){
    this.keys = keys;
    this.description = description;
    this.gifURL = gifURL;
    this.keyCode = keyCode;
}

// object instances
if(localStorage.objArray){
    const objArrayArray = JSON.parse(localStorage.objArray);
    console.log('objArrayArray', objArrayArray);
    for(let i = 0; i < objArrayArray.length; i++){
        const obj = new ShortCut(objArrayArray[i].keys, objArrayArray[i].description, objArrayArray[i].gifURL, objArrayArray[i].keyCode, objArrayArray[i].score);
        objArray.push(obj);
    }
}else{
    const cutLine = new ShortCut(['ctrl', 'x'], 'Removes selected line.', 'img', [17, 88]);
    const toggleWrap = new ShortCut(['alt', 'z'], 'Toggles word wrap on and off.', 'img/altZ.gif', [18, 90]);
    const lineMove = new ShortCut(['alt', 'down'], 'Moves current line down. If there is a line directly below current line they swap places.', 'img/altDown.gif', [18, 40]);
    const findError = new ShortCut(['f8'], 'Jumps to the next error in your code', 'img/f8.gif', [119]);
    const indent = new ShortCut(['ctrl', ']'], 'Indents selected text one tab to the left.', 'img/ctrlBracket.gif', [17, 221]);
    const matchingOpenClose = new ShortCut(['ctrl', 'shift', '\\'], 'Finds the matching bracket, parentheses, or curly brace.', 'img/ctrlShiftBSlash.gif', [17, 16, 220]);
    const commentLine = new ShortCut(['ctrl', '/'], 'Comment out the current line of code, or currently selected lines.', 'img/ctrlSlash.gif', [17, 191]);
    const selectTerm = new ShortCut(['ctrl', 'f2'], 'Highlights and selects all instances of current word', 'img/ctrlF2.gif', [17, 113]);
    const openConsole = new ShortCut(['ctrl', '`'], 'Opens the console. Here you can access terminal, debug console, problems, and output.', 'img/ctrlAccent.gif', [17, 192]);
    const undo = new ShortCut(['ctrl', 'z'], 'Undo the last change you have made. Continue using and this continues to undo changes. Control Y brings the change back.', 'img/ctrlZ.gif', [17, 90]);

    objArray = [cutLine, toggleWrap, lineMove, findError, indent, matchingOpenClose, commentLine, selectTerm, openConsole, undo];
}

const form = document.getElementById('new-store');
form.addEventListener('submit', function(e){
    e.preventDefault();

    const keys = document.getElementById('keys').value;
    console.log(keys.charCodeAt(0));
    const description = document.getElementById('description').value;
    const keyCodeValueOne = keys.toUpperCase().charCodeAt(0);
    const keyCodeValueTwo = keys.toUpperCase().charCodeAt(1);
    const keyCodeValueThree = keys.toUpperCase().charCodeAt(2);
    const keyCodeValueFour = keys.toUpperCase().charCodeAt(3);
    const keyCode = [];
    keyCode.push(keyCodeValueOne);
    keyCode.push(keyCodeValueTwo);
    keyCode.push(keyCodeValueThree);
    keyCode.push(keyCodeValueFour);

    const newShortCut = new ShortCut(keys, description, '#', keyCode);

    console.log(newShortCut);
    objArray.push(newShortCut);
    localStorage.setItem('objArray', JSON.stringify(objArray));
});

// const sect = 

// function to render key and description elements
ShortCut.prototype.renderCards = function(keys, description){
    const game = document.getElementById('learnGame');
    const sect = document.createElement('section');
    const layer = document.createElement('section');
    game.appendChild(sect);
    sect.appendChild(layer);
    const ele = document.createElement('h2');
    ele.textContent = keys;
    layer.appendChild(ele);
    const eleTwo = document.createElement('h4');
    eleTwo.textContent = description;
    layer.appendChild(eleTwo);
};

function renderByLength(){
    if(objArray[globalI + 2].keys.length === 2){
        ShortCut.prototype.renderCards(objArray[globalI + 2].keys[0] + ' + ' + objArray[globalI + 2].keys[1], objArray[globalI + 2].description);
    }else if(objArray[globalI + 2].keys.length === 3){
        ShortCut.prototype.renderCards(objArray[globalI + 2].keys[0] + ' + ' + objArray[globalI + 2].keys[1] + ' + ' + objArray[globalI + 2].keys[2], objArray[globalI + 2].description);
    }else{
        ShortCut.prototype.renderCards(objArray[globalI + 2].keys[0], objArray[globalI + 2].description);
    }
}

for(let i = 0; i < 3; i++){
    console.log(objArray[i].keys.length);
    if(objArray[i].keys.length === 2){
        ShortCut.prototype.renderCards(objArray[i].keys[0] + ' + ' + objArray[i].keys[1], objArray[i].description);
    }else if(objArray[i].keys.length === 3){
        ShortCut.prototype.renderCards(objArray[i].keys[0] + ' + ' + objArray[i].keys[1] + ' + ' + objArray[i].keys[2], objArray[i].description);
    }else{
        ShortCut.prototype.renderCards(objArray[i].keys[0], objArray[i].description);
    }
}

// keyboard event section
const map = [];
onkeydown = onkeyup = function(e){ //eslint-disable-line
    const game = document.getElementById('learnGame');
    console.log(game);
    const sectElement = game.querySelectorAll('section');
    console.log(sectElement);
    const keyElement = game.querySelectorAll('h2');
    const descElement = game.querySelectorAll('h4');

    e = e || event;
    map[e.keyCode] = e.type == 'keydown';

    if(objArray[globalI].keys.length === 2){
        if(map[objArray[globalI].keyCode[0]] && map[objArray[globalI].keyCode[1]]){
            keyElement[0].remove();
            descElement[0].remove();
            sectElement[0].remove();
            console.log(sectElement);
            globalI++;
            renderByLength();
            return;
        }
    }

    if(objArray[globalI].keys.length === 3){
        if(map[objArray[globalI].keyCode[0]] && map[objArray[globalI].keyCode[1]] && map[objArray[globalI].keyCode[2]]){
            keyElement[0].remove();
            descElement[0].remove();
            sectElement[0].remove();
            globalI++;
            renderByLength();
            return;
        }
    }
    if(objArray[globalI].keys.length === 1){
        if(map[objArray[globalI].keyCode[0]]){
            keyElement[0].remove();
            descElement[0].remove();
            sectElement[0].remove();
            globalI++;
            renderByLength();
            return;
        }
    }
};

// adds click handler to restart button
const restart = document.getElementById('restart');
restart.addEventListener('click', clickHandler);

function clickHandler(e){ //eslint-disable-line
    // creates arrays of key and description elements on the page
    const game = document.getElementById('learnGame');

    // removes all elements rendered to 'game'
    while(game.hasChildNodes()){
        game.removeChild(game.lastChild);
    }

    globalI = 0;
    for(let i = 0; i < 3; i++){
        ShortCut.prototype.renderCards(objArray[i].keys[0] + ' + ' + objArray[i].keys[1], objArray[i].description);
        console.log(globalI);
    }
    return;
}
