const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./network/routes');
const db = require('./db')

db('mongodb+srv://camiloAdmin:madrid321431462@cluster0-rszgv.mongodb.net/test?retryWrites=true&w=majority')

let app = express()

app.use(bodyParser.json());
app.use(cors({
    origin: '*'
}))

router(app)
app.use('/app', express.static('public'));

app.set('port',process.env.PORT || 3000)

app.listen(app.get('port')), () => {
    console.log(`la app esta escuchando en ${app.get('port')}`);
}