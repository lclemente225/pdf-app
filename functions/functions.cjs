const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname,'..')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'../index.html'));
});

app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname,'../pages/pdf.html'));
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
