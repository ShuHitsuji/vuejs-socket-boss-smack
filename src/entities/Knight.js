import Player from "./Player.js"

class Knight extends Player{
    constructor({name, type}) {
        super({name, type, health: 250, attack: 40, mana: 100,});
    }
}

export default Knight;