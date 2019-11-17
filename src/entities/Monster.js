class Monster {
  status = 'idle'
  img = {}

  constructor({name, health, attack, type}) {
    this.name = name;
    this.health = {
      max: health,
      current: health
    }
    this.type = type;
    this.attack = attack;
  }

  setStatus(status) {
    if (status === 'death') {
      this.health.current = 0
    }
    this.status = status
  }

  isAlive() {
    return this.status !== 'death' && this.health.current > 0;
  }

  getImage() {
    return this.isAlive() ? this.img.idle : this.img.death;
  }

  receiveDamage(amount) {
    this.health.current -= amount;

    if (!this.isAlive()) {
      this.health.current = 0;
      this.setStatus('death');
    }
  }

  attackRandomHero(heroes) {
    let target = this.chooseRandomVictim(heroes);
    let monsterDamage = this.getRandomValue(this.attack, this.attack * 2);

    target.receiveDamage(monsterDamage);

    return {
      monsterDamage,
      target
    }
  }

  chooseRandomVictim(heroes) {
    const index = Math.max(Math.floor(Math.random() * 3));
    return (heroes[index].isAlive()) ? heroes[index] : this.chooseRandomVictim(heroes)
  }

  getRandomValue(min, max) {
    return Math.max(Math.floor(Math.random() * max) + 1, min);
  }
}

  export default Monster;
