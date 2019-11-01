const types = {
  ranger: {
    img: "mage-hero.png"
  },
  warrior: {
    img: "mage-hero.png"
  },
  mage: {
    img: "mage-hero.png"
  }
}

class Player {
  constructor({ name, type, health, attack, mana}) {
    this.name = name;
    this.type = types[type]
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
}

export default Player;