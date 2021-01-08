const { eventNames } = require('./app');
const app = require('./app');

main = async () => {
    await app.listen(process.env.PORT || 3000);
    console.log('Servidor iniciado...')
}

main();