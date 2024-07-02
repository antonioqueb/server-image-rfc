// src/index_rfc.js
const express = require('express');
const uploadRFCRouter = require('./routes/upload_rfc');

const app = express();
const port = 3010;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/upload_rfc', uploadRFCRouter);

app.listen(port, () => {
  console.log(`RFC Server is running at http://149.50.128.198:${port}`);
});
