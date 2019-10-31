class Player {
  constructor({ name, health, attack, mana}) {
    this.name = name;

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