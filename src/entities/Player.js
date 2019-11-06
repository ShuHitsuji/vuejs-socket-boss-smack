const types = {
  ranger: {
    name: "Ranger",
    img: "ranger.png",
    imgIdle: "ranger.png",
    imgHeal: "ranger-heal.png",
    imgAttack: "ranger-attack.png"
  },
  knight: {
    name: "Knight",
    img: "knight.png",
    imgIdle: "knight.png",
    imgHeal: "knight-heal.png",
    imgAttack: "ranger-attack.png"
  },
  mage: {
    name: "Mage",
    img: "mage.png",
    imgIdle: "mage.png",
    imgHeal: "mage-heal.png",
    imgAttack: "mage-attack.png"
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
