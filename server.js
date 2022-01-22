//start express.js app 
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express()
//accept incoming data, parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//pase incoming JSON data 
app.use(express.json());
const { animals } =require('./data/animals.json');


function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        //Save personality traits as dedicated array 
        //if personality traits is a string, place it into a new array and save
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        }else {
            personalityTraitsArray = query.personalityTraits;
        }
        // Loop through each trait in the personalityTraits array:
        personalityTraitsArray.forEach(trait => {
            // Check the trait against each animal in the filteredResults array.
            // Remember, it is initially a copy of the animalsArray,
            // but here we're updating it for each trait in the .forEach() loop.
            // For each trait being targeted by the filter, the filteredResults
            // array will then contain only the entries that contain the trait,
            // so at the end we'll have an array of animals that have every one 
            // of the traits when the .forEach() loop is finished.
            filteredResults = filteredResults.filter(
            animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }

    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
};
//This function creates an object of each animal and finds it by id. 
function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0]; 
    return result;
};
//adding route to json animals package
app.get('/api/animals', (req, res) => {
    let results = animals;
    
    if (req.query) {
        results = filterByQuery(req.query, results);

    }
    res.json(results);
});

//this route will return a single animal because of :id this will pick a unique id
app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        //the client enters a number that doesn't exist then it shows undefined. 
        res.send(404);
    }
});

//get routes that we have created
app.post('api/animals', (req, res) => {
    //req body is where our incoming content will be
    console.log(req.body);
    res.json(req.body);
});

//call out the port 
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

/*IMPORTANT:  */
