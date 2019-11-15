import Hero from "./Hero.js"

class Knight extends Hero {
  img = {
    idle: "knight.png",
    heal: "knight-heal.png",
    attack: "knight-attack.png",
    special: "knight-special.png",
    death: "knight-death.png",
  }

  name = "Knight"

  description = "Caballero errante oriundo de las tierras de Astora. Protegido por una armadura de diamantina reforjada, espada de veraplata, y un escudo de oricalco pulido. Su identidad permanece un misterio, pero sus habilidades en combate son formidables. Un héroe duradero, ideal para las líneas delanteras de cualquier pandilla de aventureros que se consideren a sí mismos serios (y precavidos)."

  constructor({name, type}) {
    super({
      name,
      type,
      health: 250,
      attack: 40,
      mana: 100,
    });
  }
}

export default Knight;
