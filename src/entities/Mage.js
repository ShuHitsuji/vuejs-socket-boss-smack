import Hero from "./Hero.js"

class Mage extends Hero {
  img = {
    idle: "mage.png",
    heal: "mage-heal.png",
    attack: "mage-attack.png",
    special: "mage-special.png",
    death: "mage-death.png",
  }

  name = "Mage"

  description = "Hechicero acólito proveniente del Pantano Meridional. De vestiduras y carácter modesto y discreto, este jóven prodigio dominó las artes de la piromancia a la temprana edad de 10. Adepto y experto en las antiguas artes arcanas, el poder de sus hechizos es capaz de hacerle frente a cualquier acero o metal (y cualquier contendiente/s que lo inhabite/n) que ose cruzársele. Héroe frágil pero con un asombroso poder destructivo, ideal para ofrecer soporte a distancia y controlar el campo de batalla si se lo protege."

  constructor({name, type}) {
    super({
      name,
      type,
      health: 150,
      attack: 80,
      mana: 100
    });
  }
}

export default Mage;
