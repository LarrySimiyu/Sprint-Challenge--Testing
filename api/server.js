const express = require('express');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ message: 'server is working' });
});


function logger(req, res, next) {
    console.log(`${req.method} to ${req.url}`);
    next();
}

server.use(logger);

const games = [
    {
        title: 'Final Fantana',
        genre: 'Booper',
        releaseYear: 1973
    },
    {
        title: 'NBA 2K19',
        genre: 'Shooter',
        releaseYear: 2019
    },
    {
        title: 'Black Plague',
        genre: 'Horror',
        releaseYear: 1881
    }
];

server.get('/games', (req, res) => {
    res.status(200).json(games);
})

server.post('/games', (req, res) => {
    let { title, genre, releaseYear } = req.body;
    
    
//looking if the required field was added,if not leave an error
    if (!title || !genre) {
        return res.status(422).json({ error: 'You must include a title and genre.' })
    }

// status sent 
    return res.status(201).json({ message: `${title} added to games database.` })
})

module.exports = server;
