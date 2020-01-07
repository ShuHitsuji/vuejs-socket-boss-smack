import Monster from "../Monster.js"
import {getRandomValue} from "../../utils/numbers";

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
            health: 175,
            attack: 45,
            type: 'wisp'
        })
    }

    receiveDamage(amount) {

        let chanceOfDodge = getRandomValue(0,10)
        if(chanceOfDodge > 7){
            this.health.current -= Math.floor(amount);
        }else{
            amount = 0;
        }
    
        if (!this.isAlive()) {
          this.setStatus('death');
          this.health.current = 0;
        }
        return Math.floor(amount);
      }
}

export default Wisp;
