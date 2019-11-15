import Ranger from "./Ranger";
import Knight from "./Knight";
import Mage from "./Mage";

const types = {
  ranger: Ranger,
  knight: Knight,
  mage: Mage
}

export default function createHero({id = null, name, type}) {
  return new types[type]({id, name, type})
}
