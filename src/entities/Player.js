const types = {
  ranger: {
    name: "Ranger",
    keyName: "ranger",
    img: "ranger.png",
    imgIdle: "ranger.png",
    imgHeal: "ranger-heal.png",
    imgAttack: "ranger-attack.png",
    imgDeath: "mage-death.png",
    description: "Elfa guardabosques de los bosques de Jaspe. Armada con un arco bendecido por la diosa Elune misma, el refulgiente acero élfico de sus flechas es lo último que ven (y sienten) aquellos que osan desafiarla. De armadura ligera, los elfos consideran el metal como una debilidad de la cual disponer, prefiriendo emplear su agilidad preternatural para esquivar los golpes de sus adversarios. Un héroe con gran evasión y gran daño sostenido en el tiempo."
  },
  knight: {
    name: "Knight",
    keyName: "knight",
    img: "knight.png",
    imgIdle: "knight.png",
    imgHeal: "knight-heal.png",
    imgAttack: "ranger-attack.png",
    imgDeath: "mage-death.png",
    description: "Caballero errante oriundo de las tierras de Astora. Protegido por una armadura de diamantina reforjada, espada de veraplata, y un escudo de oricalco pulido. Su identidad permanece un misterio, pero sus habilidades en combate son formidables. Un héroe duradero, ideal para las líneas delanteras de cualquier pandilla de aventureros que se consideren a sí mismos serios (y precavidos)."
  },
  mage: {
    name: "Mage",
    keyName: "mage",
    img: "mage.png",
    imgIdle: "mage.png",
    imgHeal: "mage-heal.png",
    imgAttack: "mage-attack.png",
    imgDeath: "mage-death.png",
    description: "Hechicero acólito proveniente del Pantano Meridional. De vestiduras y carácter modesto y discreto, este jóven prodigio dominó las artes de la piromancia a la temprana edad de 10. Adepto y experto en las antiguas artes arcanas, el poder de sus hechizos es capaz de hacerle frente a cualquier acero o metal (y cualquier contendiente/s que lo inhabite/n) que ose cruzársele. Héroe frágil pero con un asombroso poder destructivo, ideal para ofrecer soporte a distancia y controlar el campo de batalla si se lo protege."
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
    let description = this.type.description
    description += `<br /><br />`
    description += `<b>Salud</b>: ${this.health.max} <br />`
    description += `<b>Ataque</b>: ${this.attack} <br />`
    description += `<b>Mana</b>: ${this.mana.max} <br />`

    return description
  }
}

export default Player;
