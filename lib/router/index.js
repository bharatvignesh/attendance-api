const expressRouter = require('express').Router(),
    bodyParser = require('body-parser'),
    swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./../../config/swagger.json'),
    userRouter = require('./user');
        
class Routers {

    constructor(app, config) {
        expressRouter.use(bodyParser.urlencoded({ extended: true }));
        expressRouter.use(bodyParser.json());
        expressRouter.use('/api-docs', swaggerUi.serve);
        expressRouter.get('/api-docs', swaggerUi.setup(swaggerDocument));
        app.use(expressRouter);
        this.config = config;
        this.registerUrlToRoute(expressRouter);
    }

    registerUrlToRoute(router)  {
        (new userRouter(this.config)).registerUrlToRoute(router);
    }

}
module.exports = Routers;