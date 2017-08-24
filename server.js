'use strict';

const mongoose = require('mongoose');
const app = require('./app-express');
const config = require('config');
let morgan = require('morgan');

mongoose.Promise = global.Promise;

//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}


mongoose.connect(config.mongoDB.connectionString, {
        useMongoClient: true})
    .then(()=>{
        console.log(`Established connection to data base`);
        console.log(config.app.webServer.port)

        // app.use('/', express.static(path.join(__dirname,'/public')));
        
        app.get('/', (req, res) => {
            res.sendFile(__dirname+'/src/index.html')
        });
        app.listen(config.app.webServer.port, ()=>{
            console.log(`API RESTful en localhost: ${config.app.webServer.port}`);
        });

    }).catch(
        (error)=>{return `Error al conectar a la base de datos: ${error}`}
    )


    module.exports = app; //export for testing
