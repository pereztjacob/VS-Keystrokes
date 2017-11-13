function ShortCut(keys, description, gifURL){
    this.keys = keys;
    this.description = description;
    this.gifURL = gifURL;
}

const save = new ShortCut(['ctrl', 'S'], 'saves file locally', '#');
const search = new ShortCut(['ctrl', 'f'], 'searches for term within a page', '#');
const lineMove = new ShortCut(['ctrl', 'up'], 'moves line up or down within your code', '#');

objArray = [save, search, lineMove];

ShortCut.prototype.renderCards = function(keys, description){
    const game = document.getElementById('game');
    const ele = document.createElement('h2');
    ele.textContent = keys;
    for(let i = 0; i < 3; i++){
        game.appendChild(ele);
    }
    const eleTwo = document.createElement('h4');
    eleTwo.textContent = description;
    game.appendChild(eleTwo);
}

for(let i = 0; i < 3; i++){
    ShortCut.prototype.renderCards(objArray[i].keys[0] + ' + ' + objArray[i].keys[1], objArray[i].description);
}