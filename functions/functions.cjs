const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(selectFile('..')))

app.get('/', (req, res) => {
  res.sendFile(selectFile('../index.html'));
});

app.get('/test', (req, res) => {
  res.sendFile(selectFile('../pages/pdf.html'));
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

function selectFile(fileName){
  return path.join(__dirname, fileName)
}