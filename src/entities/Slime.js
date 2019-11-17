import Monster from "./Monster.js"

class Slime extends Monster{
    img = {
        idle: "slime.png",
        attack: "slime-attack.png",
        death: "slime-death.png"
    }

    name = "Slime"

    constructor() {
        super({
            name: 'Badass Slime',
            health: 525,
            attack: 25,
            type: 'slime'
        })
    }

}

export default Slime;