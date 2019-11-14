import Player from "./Player.js"

class Mage extends Player{
    constructor({name, type}) {
        super({name, type, health: 150, attack: 80, mana: 100});
    }
}

export default Mage;