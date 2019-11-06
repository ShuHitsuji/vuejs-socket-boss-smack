const types = {
  wisp: {
    name: "Wisp",
    img: "wisp.png"
  },
  slime: {
    name: "Slime",
    img: "slime.png"
  },
  fish: {
    name: "Fish",
    img: "fish.png"
  },
  tv: {
    name: "Tv",
    img: "tv.png"
  }
}
class Monster {
    constructor({ name, health, attack, type}) {
      this.name = name;
      this.health = {
        max: health,
        current: health
      }
      this.type = {
        keyName: type,
        ...types[type]
      }
      this.attack = attack;
    }
  }
  
  export default Monster;
  