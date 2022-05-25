const express = require('express');
const cors = require('cors');
require('dotenv').config();
const getLinkRouter = require('./routes/getLinkRouter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = 5000;

app.get('/', (req, res) => {
    res.send("BE is working")
});

app.use('/getLink', getLinkRouter)

app.listen(PORT);