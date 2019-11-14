import Player from "./Player.js"

class Mage extends Player{
    constructor({name, type}) {
        super({name, type, health: 150, attack: 80, mana: 100});
    }

    getDescription() {
        Player.call(this).getDescription();
    }

}

Mage.prototype = new Player();
Mage.prototype.constructor = Mage;

export default Mage;