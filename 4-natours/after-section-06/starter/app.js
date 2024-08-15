const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the Middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.get('/', (req, res) => {
//   res.status(200).json({message: "Hello from the server side!", app: "Natours"})
// })

// app.post('/', (req, res) => {
//   res.send("You can post on this endpoint...")
// })

const filePath = path.join(
  __dirname,
  '..',
  'dev-data',
  'data',
  'tours-simple.json'
);
const data = fs.readFileSync(filePath, 'utf-8');
const tours = JSON.parse(data);

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res
    .status(200)
    .json({
      status: 'success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: { tours }
    });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id);
  // if(id > tours.length){ or -->
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id'
    });
  }
  console.log(req.params);
  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
};

const updateTour = (req, res) => {
  if (req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id'
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>'
    }
  });
};

const deleteTour = (req, res) => {
  if (req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id'
    });
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(filePath, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  });
};

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour);

app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
