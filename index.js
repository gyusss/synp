const express = require('express');
const app = express();

const mongoose = require('mongoose');
const db = mongoose.connection;
const Schema = mongoose.Schema;

db.on('error', console.error);
db.once('open', function () {
    console.log("Conntcted to mongod server");
});
mongoose.connect('mongodb://localhost/RainDB');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const User = require('./models/user.js');

//const router = require('./routes')(app, User);

module.exports = function (app, User) {
    //////////
};

app.get('/create', function (req, res) {
    
    console.log("Create Access");
    const user = new User();
    user.name = req.query.name;
    user.score = req.query.score;
    
    user.save(function (err) {
        if (err) {
            console.error(err);
            res.end("Error : cannot create");
            return 0;
        }

        return 0;
    });


});

app.get('/find', function (req, res) {
    console.log("FIND ACCESS");
    const target_name = req.query.name;


    User.find(function (err, users) {
        if (err) return res.end("Error : error in finding");
        if (users.length === 0) return res.status(404).json({ error: 'user not found' })
        //document.body.innerHTML = "LeaderBoard";
        res.json(users);
    }).limit(10).sort({ "score": -1 });
});

app.get('/update', function (req, res) {
    console.log("Update access")
    const target_name = req.query.name;
    const change_score = req.query.score;

    User.findOne({ name: target_name }, function (err, user) {
        if (err) return res.end("Error : error in finding");
        if (!user) return res.status(404).json({ error: 'user not found' })

        user.score = change_score;

        user.save(function (err) {
            if (err) return res.status(500).end("Error : cannot update");
            return res.end("Successfully update");
        });
    })
});


app.use(express.static('static'))
    app.use(express.static('wordkor.dat'));

    app.set('views', __dirname + '/public');
    app.engine('html', require('ejs').renderFile);


    app.get('/', (req, res) => {
        res.render('acidRain.html');
    })

    app.get('/leaderboard', (req, res) => {
        res.render('leaderBoard.html');
    })

    app.get('/wordkor.dat', (req, res) => {
        res.sendFile('/Users/15529/synp/public/wordkor.dat');
    })

    app.get('/gmusic.mp3', (req, res) => {
        res.sendFile('/Users/15529/synp/public/gmusic.mp3');
    })
    const server = app.listen(8000, () => {
        console.log('server is running at 8000');
    });
