const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const fileupload = require('express-fileupload');
require('dotenv').config();
const port = process.env.PORT || 6688;
const initRouter = require('./src/routes/api');
const mongoose = require('mongoose');

app.use(express.json());
app.use(morgan('dev'));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(cors());
app.use(
  fileupload({
    useTempFiles: true,
  })
);
const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
const url = process.env.URL_MONGODB;

mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log('Connected database successfully ');
  })
  .catch((err) => {
    console.log(err);
    console.error(`Error \n${err}`);
  });
initRouter(app);

app.listen(port, () => {
  console.log('start successfully PORT: ' + port);
});
