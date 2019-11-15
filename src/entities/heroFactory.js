import Ranger from "./Ranger";
import Knight from "./Knight";
import Mage from "./Mage";

const types = {
  ranger: Ranger,
  knight: Knight,
  mage: Mage
}

export default function createHero({name, type}) {
  return new types[type]({name, type})
}
