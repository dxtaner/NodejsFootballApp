const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();

const coachRoutes = require('./routes/coachRoute');
const footballerRoutes = require('./routes/footballerRoute');

// Import models
const Coach = require('./models/coach');
const Stadium = require('./models/stadium');
const Footballer = require('./models/footballer');
const Team = require('./models/team');

// Middleware to parse JSON request bodies
// Body Parser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dbURL = "mongodb+srv://taner16:taner123@cluster0.guofsiq.mongodb.net/test3";
mongoose.connect(dbURL
    , { useNewUrlParser: true }).then(() =>
        console.log("DB connect succesfully"))
    .catch((err) => console.log(err));


// app.get('/', (req, res) => {
//   res.send('Hello, world!');
// });

app.use('/coach', coachRoutes);
app.use('/footballer', footballerRoutes);

// Server
const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));