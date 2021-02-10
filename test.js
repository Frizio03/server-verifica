const { _: [testName, exNumber = 0] } = require("simple-argv")
const test = require(`./tests/${testName}.js`)

const ex = test.ex[exNumber]

const data = ex.data()
const solution = ex.solution({ data })
console.log(ex.message)
console.log("\ndata:")
console.log(data)
console.log("\nsolution:")
console.log(solution)
