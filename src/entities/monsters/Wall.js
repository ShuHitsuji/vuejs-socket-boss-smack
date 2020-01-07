import Monster from "../Monster.js"
import {getRandomValue} from "../../utils/numbers";

class Wall extends Monster{
    img = {
        idle: "wall.png",
        attack: "wall-attack.png",
        death: "wall-death.png"
    }

    name = "Wall"

    constructor() {
        super({
            name: 'Wall-y',
            health: 777,
            attack: 1,
            type: 'wall'
        })
    }

    receiveDamage(amount) {

        let chanceOfDodge = getRandomValue(0,10)
        if(chanceOfDodge < 8){
            amount = 1;
        }

        this.health.current -= Math.floor(amount);

        if (!this.isAlive()) {
          this.setStatus('death');
          this.health.current = 0;
        }
        return Math.floor(amount);
      }

      attackRandomHero(heroes) {
        this.setStatus('attack');
        setTimeout(() => { 
          this.isAlive() ? this.setStatus('idle') : this.setStatus('death');
        }, 800)
        let target = this.chooseRandomVictim(heroes);
        
        let random = getRandomValue(1, 100);
        let monsterDamage = random > 10 ? getRandomValue(1, 10) : target.health.current;
    
        let dealedDamage = target.receiveDamage(monsterDamage);
    
        return {
          monsterDamage,
          target,
          dealedDamage
        }
      }
}

export default Wall;
