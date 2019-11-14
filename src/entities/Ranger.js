import Player from "./Player.js"

class Ranger extends Player{
    constructor({name, type}) {
        super({name, type, health: 175, attack: 60, mana: 100});
    }

    getDescription() {
        Player.call(this).getDescription();
    }

}

export default Ranger;