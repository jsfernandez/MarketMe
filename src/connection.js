const mongoose = require('mongoose');
module.exports = {
    start: () => {
        mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('connection successful'))
        .catch((err) => console.error(err));
        
        mongoose.Promise = global.Promise
        var db = mongoose.connection
        db.on('error', console.error.bind(console, 'connection error: '))
        db.once('open', ()=>{
            console.log('Base de datos conectada')
        })
    }
}
