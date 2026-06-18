const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');

const apiRoutes = require('./routes/api');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}).catch((error) => {
  console.error('Database sync failed:', error);
});
