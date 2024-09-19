const EventEmitter = require('events')
const http = require('http')

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales()
myEmitter.on('newSale', () => {
  console.log("There was a new sale!")
})

myEmitter.on('newSale', () => {
  console.log("Costumer name Levani!")
})

myEmitter.on('newSale', (stoke) => {
  console.log(`There are now ${stoke} items left in stock!`)
})

myEmitter.emit('newSale', 9)

////////////////////////

const server = http.createServer()

server.on('request', (req, res) => {
  console.log("Request received")
  res.end("Request received")
})

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for requests...");
});
