'use strict';

// object instances
const cutLine = new ShortCut(['ctrl', 'x'], 'Removes selected line.', 'img', [17, 88]);
const toggleWrap = new ShortCut(['alt', 'z'], 'Will toggle word wrap on and off.', 'img/altZ.gif', [18, 90]);
const lineMove = new ShortCut(['alt', 'down'], 'Moves current line down. If there is a line directly below current line they swap places. You can use the up arrow and it wil do the opposite.', 'img/altDown.gif', [18, 40]);
const findError = new ShortCut(['f8'], 'Will jump to the next error in your code', 'img/f8.gif', [119]);
const indent = new ShortCut(['ctrl', ']'], 'Indents selected text one tab to the left. [ will remove and indent.', 'img/ctrlBracket.gif', [17, 221]);
const matchingOpenClose = new ShortCut(['ctrl', 'shift', '\\'], 'Will find the matching bracket, parentheses, or curly brace.', 'img/ctrlShiftBSlash.gif', [17, 16, 220]);
const commentLine = new ShortCut(['ctrl', '/'], 'Will comment out the current line of code, or currently selected lines.', 'img/ctrlSlash.gif', [17, 191]);
const selectTerm = new ShortCut(['ctrl', 'f2'], 'Highlights and selects all instances of current word', 'img/ctrlF2.gif', [17, 113]);
const openConsole = new ShortCut(['ctrl', '`'], 'Will open the console. Here you can access terminal, debug console, problems, and output.', 'img/ctrlAccent.gif', [17, 192]);
const undo = new ShortCut(['ctrl', 'z'], 'Will undo the last change you have made. You can keep hitting it and it will continue to undo changes. Control Y will bring the change back.', 'img/ctrlZ.gif', [17, 90]);

const objArray = [cutLine, toggleWrap, lineMove, findError, indent, matchingOpenClose, commentLine, selectTerm, openConsole, undo]; //eslint-disable-line

// constructor for keyboard shortcuts
function ShortCut(keys, description, gifURL, keyCode){
    this.keys = keys;
    this.description = description;
    this.gifURL = gifURL;
    this.keyCode = keyCode;
}

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
