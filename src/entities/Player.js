const types = {
  ranger: {
    name: "Ranger",
    img: "ranger.png"
  },
  knight: {
    name: "Knight",
    img: "knight.png"
  },
  mage: {
    name: "Mage",
    img: "mage-hero.png"
  }
}

class Player {
  constructor({ name, type, health, attack, mana}) {
    this.name = name;
    this.type = {
      keyName: type,
      ...types[type]
    }
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
