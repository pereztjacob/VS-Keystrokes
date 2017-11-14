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
const search = new ShortCut(['ctrl', 'f'], 'Will find text on the page that matches the text you type in the search box.', 'img/ctrlF.gif', [17, 70]);
const lineMove = new ShortCut(['alt', 'down'], 'Moves current line down. If there is a line directly below current line they swap places. You can use the up arrow and it wil do the opposite.', 'img/altDown.gif', [18, 40]);
const findMatch = new ShortCut(['ctrl', 'd'], 'Will find the next instance of selected text. You can keep pressing it until it cycles through the whole page.', 'img/ctrlD.gif', [17, 68]);
const indent = new ShortCut(['ctrl', ']'], 'Indents selected text one tab to the left. [ will remove and indent.', 'img/ctrlBracket.gif', [17, 221]);
const shortcuts = new ShortCut(['ctrl', 'k', 's'], 'The most useful shortcut! This will open a new file in VSCode that wil show you all the other shortcuts! WOW!', 'img/ctrlKS.gif', [17, 75, 83]);
const matchingOpenClose = new ShortCut(['ctrl', 'shift', '\\'], 'Will find the matching bracket, parentheses, or curly brace.', 'img/ctrlShiftBSlash.gif', [17, 17, 220]);
const commentLine = new ShortCut(['ctrl', '/'], 'Will comment out the current line of code, or currently selected lines.', 'img/ctrlSlash.gif', [17, 191]);
const autoComplete = new ShortCut(['ctrl', 'spacebar'], 'Will open up autocomplete on the word you are currently typing', 'img/ctrlSpace.gif', [17, 32]);
const openConsole = new ShortCut(['ctrl', '`'], 'Will open the console. Here you can access terminal, debug console, problems, and output.', 'img/ctrlAccent.gif', [17, 192]);
const undo = new ShortCut(['ctrl', 'z'], 'Will undo the last change you have made. You can keep hitting it and it will continue to undo changes. Control Y will bring the change back.', 'img/ctrlZ.gif', [17, 90]);

objArray = [cutLine, search, lineMove, findMatch, indent, shortcuts, matchingOpenClose, commentLine, autoComplete, openConsole, undo];

// function to render key and description elements
ShortCut.prototype.renderCards = function(keys, description){
    const game = document.getElementById('game');
    const ele = document.createElement('h2');
    ele.textContent = keys;
    game.appendChild(ele);
    const eleTwo = document.createElement('h4');
    eleTwo.textContent = description;
    game.appendChild(eleTwo);
}
for(let i = 0; i < 3; i++){
    ShortCut.prototype.renderCards(objArray[i].keys[0] + ' + ' + objArray[i].keys[1], objArray[i].description);
}

// keyboard event section
var map = [];
onkeydown = onkeyup = function(e){
    const game = document.getElementById('game');
    const keyElement = game.querySelectorAll('h2');
    const descElement = game.querySelectorAll('h4');

    e = e || event;
    map[e.keyCode] = e.type == 'keydown';

    if(map[objArray[globalI].keyCode[0]] && map[objArray[globalI].keyCode[1]]){
        keyElement[0].remove();
        descElement[0].remove();
        globalI++;
    }
    return;
};