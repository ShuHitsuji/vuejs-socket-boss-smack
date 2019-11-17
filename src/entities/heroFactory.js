import Ranger from "./heroes/Ranger";
import Knight from "./heroes/Knight";
import Mage from "./heroes/Mage";

const types = {
  ranger: Ranger,
  knight: Knight,
  mage: Mage
}

export default function createHero({name, type}) {
  return new types[type]({name, type})
}
