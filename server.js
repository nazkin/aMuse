const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const port = process.env.PORT || 8080;
const app = express();

mongoose.connect("mongodb://localhost:27017/aMuse_collab", {useNewUrlParser: true, useUnifiedTopology: true});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet());

//Routes
require("./routes/apiRoutes")(app);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));