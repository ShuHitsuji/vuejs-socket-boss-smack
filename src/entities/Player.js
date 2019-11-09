const types = {
  ranger: {
    name: "Ranger",
    keyName: "ranger",
    img: "ranger.png",
    imgIdle: "ranger.png",
    imgHeal: "ranger-heal.png",
    imgAttack: "ranger-attack.png",
    description: "Ranger..."
  },
  knight: {
    name: "Knight",
    keyName: "knight",
    img: "knight.png",
    imgIdle: "knight.png",
    imgHeal: "knight-heal.png",
    imgAttack: "ranger-attack.png",
    description: "Knight..."
  },
  mage: {
    name: "Mage",
    keyName: "mage",
    img: "mage.png",
    imgIdle: "mage.png",
    imgHeal: "mage-heal.png",
    imgAttack: "mage-attack.png",
    description: "Mage..."
  }
}

class Player {
  constructor({ name, type, health, attack, mana}) {
    this.name = name;
    this.keyName = type;
    this.type = {
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

  getDescription() {
    return `${this.type.description}
    
Salud: ${this.health.max}
Ataque: ${this.attack}
Mana: ${this.mana.max}
`
  }
}

export default Player;
