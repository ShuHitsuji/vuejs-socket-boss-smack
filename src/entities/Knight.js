import Player from "./Player.js"

class Knight extends Player{
    constructor({name, type}) {
        super({name, type, health: 250, attack: 40, mana: 100,});
    }

    getDescription() {
        Player.call(this).getDescription();
    }

}

Knight.prototype = new Player();
Knight.prototype.constructor = Knight;

export default Knight;