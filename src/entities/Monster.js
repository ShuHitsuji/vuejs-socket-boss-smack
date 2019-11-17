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
}

  export default Monster;
