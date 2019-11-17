import Monster from "./Monster.js"

class TheHand extends Monster{
    img = {
        img: "tv.png",
        imgDeath: "tv-death.png"
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