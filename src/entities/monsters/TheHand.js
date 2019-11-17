import Monster from "../Monster.js"

class TheHand extends Monster{
    img = {
        idle: "tv.png",
        attack: "tv-attack.png",
        death: "tv-death.png"
    }

    name = "Tv"

    constructor() {
        super({
            name: 'The hand',
            health: 999,
            attack: 25,
            type: 'tv'
        })
    }

}

export default TheHand;
