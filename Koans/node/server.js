var restify = require('restify'),
    _ = require('underscore');

var server = restify.createServer();
server.use(restify.fullResponse());
server.use(restify.bodyParser());
server.use(restify.gzipResponse());


var cars = [
    { id: 1, manufacturer: 'Ford', make: 'Mustang', model: 'GT' },
    { id: 2, manufacturer: 'Ford', make: 'Mustang', model: '5.0' },
    { id: 3, manufacturer: 'Ford', make: 'Focus', model: 'Sport' },
    { id: 4, manufacturer: 'Ford', make: 'Focus', model: 'Rally Sport' },
    { id: 5, manufacturer: 'Chevy', make: 'Corvette', model: 'Base' },
    { id: 6, manufacturer: 'Chevy', make: 'Corvette', model: 'ZR1' },
    { id: 7, manufacturer: 'Chevy', make: 'Corvette', model: 'Z06' },
    { id: 8, manufacturer: 'Chevy', make: 'Camaro', model: '6Cyl' },
    { id: 9, manufacturer: 'Chevy', make: 'Camaro', model: '8Cyl' }
];

server.get('/cars', function (req, res) {
    res.send(cars);
});

server.get('/cars/:id', function (req, res) {
    var result = _.find(cars, function (car) {
        return car.id == req.params.id;
    });
    res.send(result);
});

server.post('/cars', function(req, res) {
    var carToSave = JSON.parse(req.params.payload);

    var existing = _.find(cars, function(car) {
        return car._id == carToSave.id;
    });

    if (existing != null) {
        var i = _.indexOf(cars, existing);
        cars[i] = carToSave;
        res.send('Car Has Been Updated');
    } else {
        carToSave.id = cars.length + 1;
        cars.push(carToSave);
        res.send('Car Has Been Created');
    }
});

server.del('/cars/:id', function (req, res) {
    cars = _.reject(cars, function (car) {
        return car.id == req.params.id;
    });
    res.send('Puppy Has Been Deleted');
});


server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});