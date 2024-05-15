const { v4: uuidv4 } = require('uuid'); //Otra manera de declarar el UUID: const uuid = require('uuid');
const HttpError = require('../models/http-error');

let DUMMY_PLACES = [
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

const getAllPlaces = (req, res, next)=>{
    res.json({places : DUMMY_PLACES});
};

const getPlacesById = (req, res, next) => {    
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
};

const getPlacesByUser = (req, res, next)=>{
    const places = DUMMY_PLACES.find(p => {
        return p.creator === req.params.uid
    });    

    if (!places){
        const error = new HttpError('Lugar no existe para el id de usuario especificado', 404);
        throw error;
    }

    res.json({places});
};

const savePlace = (req, res, next)=>{
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
};

const updatePlace = (req, res, next)=>{
    const { title } = req.body;
    const placeId = req.params.pid;

    console.log(placeId);

    const updatedPlace = {... DUMMY_PLACES.find(p => p.id === placeId)};
    const placesIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);

    updatedPlace.title = title;

    DUMMY_PLACES[placesIndex] = updatedPlace;

    res.status(200).json({place: updatedPlace});

};

const deletePlace = (req, res, next) => {
    const placeId = req.params.pid;
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId)
    res.status(200).json({message: 'Lugar eliminado exitosamente'});
};

exports.getAllPlaces = getAllPlaces;
exports.getPlacesById = getPlacesById;
exports.getPlacesByUser = getPlacesByUser;
exports.savePlace = savePlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;