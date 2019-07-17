'use strict';

const nconf = require('nconf'),
    app = require('express')(),
    routers = require('./lib/router');

class App {
    constructor(configPath) {        
        this.loadConfig(configPath);
    }

    async loadConfig() {
        let env = 'dev',
        configPath = 'config/';

        if (nconf.get('env')) {
            env = nconf.get('env');  
        }
        
        configPath = configPath + env + '/config.json';
        
        if (nconf.get('configPath')) {
            configPath = nconf.get('configPath');
        }

        this.config = require('./config/dev/config.json');
    }

    async startServer() {
        app.listen(this.config.server.port, () => {
            console.log(`${this.config.name} listening on port ${this.config.server.port} !!!`);
        });

        app.get('/', (req, res) => {
            res.send("Server is Running !!!");
        });

        new routers(app, this.config);
    }
}


module.exports = App;