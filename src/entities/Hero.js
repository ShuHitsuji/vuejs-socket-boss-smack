class Hero {
  status = 'idle'
  img = {}
  description = ''

  constructor({name, type, health, attack, mana}) {
    this.name = name;
    this.keyName = type;
    this.type = type;
    this.health = {
      max: health,
      current: health
    }
    this.mana = {
      max: mana,
      current: mana
    }
    this.attack = attack;
  }

  setStatus(status) {
    this.status = status
  }

  getImage() {
    return this.img[this.status]
  }

  getDescription() {
    let description = this.description;
    description += `<br /><br />`;
    description += `<b>Salud</b>: ${this.health.max} <br />`;
    description += `<b>Ataque</b>: ${this.attack} <br />`;
    description += `<b>Mana</b>: ${this.mana.max} <br />`;

    return description
  }
}

export default Hero;
