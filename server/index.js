const express = require('express');
const app = express();
const path = require('path');
const createRadixTree = require('../utility/createRadixTree');

createRadixTree(path);

const port = process.env.PORT || 1992;

app.use(express.static(path.join(__dirname, '..', 'public')));

app.listen(port, () => console.log("ready to rock n' roll"));
