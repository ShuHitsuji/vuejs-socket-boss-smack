import Monster from "../Monster.js"
import {getRandomValue} from "../../utils/numbers";

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
            attack: 35,
            type: 'slime'
        })
    }

    attackRandomHero(heroes) {
        this.setStatus('attack');
        setTimeout(() => { 
          this.isAlive() ? this.setStatus('idle') : this.setStatus('death');
        }, 800)
        let target = this.chooseRandomVictim(heroes);
        let monsterDamage = getRandomValue(this.attack, this.attack * 2);
    
        let dealedDamage = target.receiveDamage(monsterDamage);
        let random = getRandomValue(0,10)
        if(random > 5){
            this.health.current += dealedDamage;
            if(this.health.current > this.health.max){
                this.health.current = this.health.max
            }
        }
        
        return {
          monsterDamage,
          target,
          dealedDamage
        }
      }

}

export default Slime;
