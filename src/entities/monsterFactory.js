import Wisp from "./Wisp";
import Slime from "./Slime";
import Fishlett from "./Fishlett";
import TheHand from "./TheHand"

const types = {
  wisp: Wisp,
  slime: Slime,
  fish: Fishlett,
  tv: TheHand
}

export default function createMonster({type}) {
    return new types[type]()
}