const fs = require('fs')
const path = require('path');
const express = require('express')

const app = express()

// app.get('/', (req, res) => {
//   res.status(200).json({message: "Hello from the server side!", app: "Natours"})
// })

// app.post('/', (req, res) => {
//   res.send("You can post on this endpoint...")
// })

const filePath = path.join(__dirname, '..', 'dev-data', 'data', 'tours-simple.json');
const data = fs.readFileSync(filePath, 'utf-8');
const tours = JSON.parse(data);

app.get('/api/v1/tours', (req,res) => {
  res.status(200).json({status: "success",results: tours.length, data : {tours}})
})

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`)
})