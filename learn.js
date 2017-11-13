function ShortCut(keys, description, gifURL){
    this.keys = keys;
    this.description = description;
    this.gifURL = gifURL;
}

const save = new ShortCut(['ctrl', 'S', '#'], 'saves file locally');

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
    ShortCut.prototype.renderCards(save.keys[0] + ' + ' + save.keys[1], save.description);
}