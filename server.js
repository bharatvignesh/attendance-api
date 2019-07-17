const App = require('./app'),
    cluster = require('cluster');

let app = new App();
if (cluster.isMaster) {
    let numProcessor = process.env.NODE_ENV === 'prod' ? require('os').cpus().length : 1;
    if (numProcessor > 1) {
        for (let i = 0; i < numProcessor; i++) {
            cluster.fork();
        }
        cluster.on('exit', function() {
        });
    } else {
        app.startServer();
    }
} else {
    app.startServer();
}
    