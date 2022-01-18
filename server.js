//start express.js app 
const express = require('express');
var app = express()

//call out the port 
app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});

