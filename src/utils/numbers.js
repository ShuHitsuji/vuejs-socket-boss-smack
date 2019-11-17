function getRandomValue(min, max) {
  return Math.max(Math.floor(Math.random() * max) + 1, min);
}

export {
  getRandomValue
}
