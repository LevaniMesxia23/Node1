// console.log(arguments)
// console.log(require('module').wrapper)

//Module.exports
const C = require('./test-module-1')
const calc1 = new C()
console.log(calc1.add(2,5))

// exports
// const calc2 = require('./test-module-2')
// console.log(multiply(3,5))

const { add, multiply, divide } = require('./test-module-2')
console.log(add(3,5))