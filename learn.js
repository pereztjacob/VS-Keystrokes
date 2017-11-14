// global variable to keep track of number of rendered items
let globalI = 0;

// constructor for keyboard shortcuts
function ShortCut(keys, description, gifURL, keyCode){
    this.keys = keys;
    this.description = description;
    this.gifURL = gifURL;
    this.keyCode = keyCode;
}

// object instances
const cutLine = new ShortCut(['ctrl', 'x'], 'Removes selected line.', 'img', [17, 88]);
const toggleWrap = new ShortCut(['alt', 'z'], 'Will toggle word wrap on and off.', 'img/altZ.gif', [18, 90]);
const lineMove = new ShortCut(['alt', 'down'], 'Moves current line down. If there is a line directly below current line they swap places. You can use the up arrow and it wil do the opposite.', 'img/altDown.gif', [18, 40]);
const findError = new ShortCut(['f8'], 'Will jump to the next error in your code', 'img/f8.gif', [119]);
const indent = new ShortCut(['ctrl', ']'], 'Indents selected text one tab to the left. [ will remove and indent.', 'img/ctrlBracket.gif', [17, 221]);
const matchingOpenClose = new ShortCut(['ctrl', 'shift', '\\'], 'Will find the matching bracket, parentheses, or curly brace.', 'img/ctrlShiftBSlash.gif', [17, 16, 220]);
const commentLine = new ShortCut(['ctrl', '/'], 'Will comment out the current line of code, or currently selected lines.', 'img/ctrlSlash.gif', [17, 191]);
const autoComplete = new ShortCut(['ctrl', 'spacebar'], 'Will open up autocomplete on the word you are currently typing', 'img/ctrlSpace.gif', [17, 32]);
const openConsole = new ShortCut(['ctrl', '`'], 'Will open the console. Here you can access terminal, debug console, problems, and output.', 'img/ctrlAccent.gif', [17, 192]);
const undo = new ShortCut(['ctrl', 'z'], 'Will undo the last change you have made. You can keep hitting it and it will continue to undo changes. Control Y will bring the change back.', 'img/ctrlZ.gif', [17, 90]);

const objArray = [cutLine, toggleWrap, lineMove, findError, indent, matchingOpenClose, commentLine, autoComplete, openConsole, undo];

// function to render key and description elements
ShortCut.prototype.renderCards = function(keys, description){
    const game = document.getElementById('game');
    const ele = document.createElement('h2');
    ele.textContent = keys;
    game.appendChild(ele);
    const eleTwo = document.createElement('h4');
    eleTwo.textContent = description;
    game.appendChild(eleTwo);
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
    const game = document.getElementById('game');
    const keyElement = game.querySelectorAll('h2');
    const descElement = game.querySelectorAll('h4');

    e = e || event;
    map[e.keyCode] = e.type == 'keydown';

    if(objArray[globalI].keys.length === 2){
        if(map[objArray[globalI].keyCode[0]] && map[objArray[globalI].keyCode[1]]){
            keyElement[0].remove();
            descElement[0].remove();
            globalI++;
            renderByLength();
            return;
        }
    }
    if(objArray[globalI].keys.length === 3){
        if(map[objArray[globalI].keyCode[0]] && map[objArray[globalI].keyCode[1]] && map[objArray[globalI].keyCode[2]]){
            keyElement[0].remove();
            descElement[0].remove();
            globalI++;
            renderByLength();
            return;
        }
    }
    if(objArray[globalI].keys.length === 1){
        if(map[objArray[globalI].keyCode[0]]){
            keyElement[0].remove();
            descElement[0].remove();
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
    const game = document.getElementById('game');
    const keyElement = game.querySelectorAll('h2');
    const descElement = game.querySelectorAll('h4');

    // removes all three elements on the page if there are at least three left
    if(globalI <= 7){
        for(let i = 0; i < 3; i++){
            keyElement[i].remove();
            descElement[i].remove();
        }
    // removes only two elements if there are only two left
    }else if(globalI === 8){
        for(let i = 0; i < 2; i++){
            keyElement[i].remove();
            descElement[i].remove();
        }
    // removes final element if only one is left
    }else if(globalI === 9){
        for(let i = 0; i < 1; i++){
            keyElement[i].remove();
            descElement[i].remove();
        }
    }
    // resets globalI and renders the first three ShortCuts again
    globalI = 0;
    for(let i = 0; i < 3; i++){
        ShortCut.prototype.renderCards(objArray[i].keys[0] + ' + ' + objArray[i].keys[1], objArray[i].description);
        console.log(globalI);
    }
    return;
}