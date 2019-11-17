import Monster from "./Monster.js"

class Wisp extends Monster{
    img = {
        idle: "wisp.png",
        attack: "wisp-attack.png",
        death: "wisp-death.png"
    }

    name = "Wisp"

    constructor() {
        super({
            name: 'Wisp',
            health: 250,
            attack: 45,
            type: 'wisp'
        })
    }

}

export default Wisp;