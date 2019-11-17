import Monster from "../Monster.js"

class Fishlett extends Monster{
    img = {
        idle: "fish.png",
        attack: "fish-attack.png",
        death: "fish-death.png"
    }

    name = "Fishlett"

    constructor() {
        super({
            name: 'Fishlett',
            health: 700,
            attack: 20,
            type: 'fish'
        })
    }

}

export default Fishlett;
