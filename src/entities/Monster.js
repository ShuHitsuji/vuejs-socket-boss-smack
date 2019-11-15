const types = {
  wisp: {
    name: "Wisp",
    img: "wisp.png",
    imgDeath: "wisp-death.png"
  },
  slime: {
    name: "Slime",
    img: "slime.png",
    imgDeath: "slime-death.png"
  },
  fish: {
    name: "Fish",
    img: "fish.png",
    imgDeath: "fish-death.png"
  },
  tv: {
    name: "Tv",
    img: "tv.png",
    imgDeath: "tv-death.png"
  }
}
class Monster {
  status = 'idle'

  constructor({name, health, attack, type}) {
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

  setStatus(status) {
    this.status = status
  }

  isAlive() {
    return this.status !== 'dead' && this.health.current > 0;
  }

  getImage() {
    return this.isAlive() ? this.type.img : this.type.imgDeath;
  }
}

  export default Monster;
