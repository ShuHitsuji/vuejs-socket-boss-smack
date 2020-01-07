import Wisp from "./monsters/Wisp";
import Slime from "./monsters/Slime";
import Fishlett from "./monsters/Fishlett";
import TheHand from "./monsters/TheHand"
import Wall from "./monsters/Wall";

const types = {
  wisp: Wisp,
  wall: Wall,
  slime: Slime,
  fish: Fishlett,
  tv: TheHand
}

export default function createMonster({type}) {
    return new types[type]()
}
