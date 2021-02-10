const e = module.exports = {}

e.rnd = (min, max) => Math.floor((Math.random() * (max - min)) + min)
e.choice = array => array[e.rnd(0, array.length)]
e.rndNumList = (count, min, max) => {
  const out = []
  for (let i = 0; i < count; i++) {
    out.push(e.rnd(min, max))
  }
  return out
}

e.rndFruit = count => {
  const out = []
  for (let i = 0; i < count; i++) {
    out.push(e.choice(["mela", "pera", "banana", "ciliegia", "limone", "ananas", "cocomero", "fragola", "uva"]))
  }
  return out
}
