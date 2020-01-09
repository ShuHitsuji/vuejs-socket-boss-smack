import Monster from "../Monster.js"
import {getRandomValue} from "../../utils/numbers";

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
            attack: 30,
            type: 'fish'
        })
    }

    attackRandomHero(heroes) {
        this.setStatus('attack');
        setTimeout(() => { 
          this.isAlive() ? this.setStatus('idle') : this.setStatus('death');
        }, 800)
        let monsterDamage = ""
        let target = ""
        let dealedDamage = ""
        let random = getRandomValue(0,10);
        if(random > 6){
            for(let hero of heroes){
                monsterDamage = getRandomValue(this.attack, this.attack * 2);
                hero.receiveDamage(monsterDamage);
            }   
            monsterDamage = 'all hero'
            target = ""
            dealedDamage = 'all hero'
        }else{
            target = this.chooseRandomVictim(heroes);
            monsterDamage = getRandomValue(this.attack, this.attack * 2);
            dealedDamage = target.receiveDamage(monsterDamage);
        }

        return {
          monsterDamage,
          target,
          dealedDamage
        }
      }

}

export default Fishlett;
