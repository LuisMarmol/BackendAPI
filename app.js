const express = require('express');

const app = express();
const port = 3000;

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Rotonda',
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Florida',
        creator: 'u2'
    }
];

app.get('/api/places', (req, res, next) => {
    /*console.log('Si funcionó! :D');*/
    const places = DUMMY_PLACES;
    
    res.send(places);
    next();
});

app.get('/api/places/:pid', (req, res, next) => {
    /*console.log('Si funcionó! :D');*/
    const places = DUMMY_PLACES.find(p => {
        return p.id === req.params.pid;
    });
    
    res.send(places);
    next();
});

app.listen(port);