var DbConnection = function (mongoose) {
    this.mongoose = mongoose.module;
}

DbConnection.prototype.connect = function (connectionString) {
    this.mongoose.connect(connectionString);
    var db = this.mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback) {
        console.log('Conectado a DB');
    });
    process.on('SIGINT', function() {
        db.close(function() {
            console.log("Desconectando la base de datos");
            process.exit(0);
        });
    });
}

module.exports = DbConnection;