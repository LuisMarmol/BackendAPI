const express = require('express');
const { v4: uuidv4 } = require('uuid');
// Otra manera de declarar el UUID: const uuid = require('uuid');
const HttpError = require('../models/http-error');

const router = express.Router();

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Rotonda',
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Centro Cívico',
        creator: 'u2'
    }
];

router.get('/', (req, res, next)=>{
    res.json({places : DUMMY_PLACES});
});

router.get('/:pid', (req, res, next) => {    
    const place = DUMMY_PLACES.find(p => {
        return p.id === req.params.pid;
    });
    if (!place){        
        const error = new Error('Lugar no existe para el id especificado');
        error.code = 404;
        next(error);
    }
    else{
        res.json({place});
    }    
});

router.get('/users/:uid', (req, res, next)=>{
    const places = DUMMY_PLACES.find(p => {
        return p.creator === req.params.uid
    });    

    if (!places){
        const error = new HttpError('Lugar no existe para el id de usuario especificado', 404);
        throw error;
    }

    res.json({places});
});

router.post('/', (req, res, next)=>{
    const {title, creator} = req.body;
/*En caso de colocar el uuid directamente en el JSON, quitar el const id = uuidv4;*/
    const id = uuidv4();
    const createdPlace = {        
/*También se puede colocarlo directamente en las variables de esta forma: id: uuid.v4(),*/
        id,
        title,
        creator
    };
    DUMMY_PLACES.push(createdPlace);
    res.status(201).json({place:createdPlace});

    res.json({places});
});

module.exports = router;