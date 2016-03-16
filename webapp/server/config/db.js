import mongoose from 'mongoose';
import uriUtil from 'mongodb-uri';

let mongoUri = 'mongodb://jacob:jacob@ds015849.mlab.com:15849/jobapplogdb';

let options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };

let mongooseUri = uriUtil.formatMongoose(mongoUri);
mongoose.connect(mongooseUri, options);


const db = mongoose.connection;

// Log errors, connections and disconnections from DB to the console
db.on('error', function(){
    console.error.bind(console, 'connection error:')
});
db.on('disconnecting', function(){
    console.log('Database', db.name, 'disconnecting.')
});
db.on('connecting', function()  {
   console.log('Database', db.name, 'connecting.');
});
db.once('open', function(){
    console.log('Connection to', db.name, 'established.');
});

export default db;