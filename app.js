const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('New version deployed');
});

app.listen(3000, '0.0.0.0', () => {
  console.log("App listening on http://0.0.0.0:3000");
});

