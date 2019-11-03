class Monster {
    constructor({ name, health, attack}) {
      this.name = name;
      this.health = {
        max: health,
        current: health
      }
      this.attack = attack;
    }
  }
  
  export default Monster;
  