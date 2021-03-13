require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const db = process.env.MONGODB_URI;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))
;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const songSchema = mongoose.Schema({ 
    name: String
})

const Song = mongoose.model('Song', songSchema);

app.post('/addSongs', async (req,res) => {
    try {
        await Song.insertMany([
            { name: 'Drivers license' },
            { name: 'Up' },
            { name: 'Blinding lights' },
            { name: '34+35' },
            { name: 'Go Crazy' },
            { name: 'Save your tears' },
            { name: 'Mood' },
            { name: 'Calling my phone' },
            { name: 'What you know about love' },
            { name: 'Levitating' },
            { name: 'Positions' },
            { name: 'Therefore I am' },
            { name: 'Back in blood' },
            { name: 'For the night' },
            { name: 'Beat box' },
            { name: 'Dakiti' },
            { name: 'You broke me first' },
            { name: 'Whoopty' },
            { name: 'Youre mines still' },
            { name: 'Good time' },
            { name: 'My exs best friend' },
            { name: 'good days' },
            { name: 'I hope' },
            { name: 'On me' },
            { name: 'Streets' },
            { name: 'Better together' },
        ])

        res.send('added');
    } catch (error) {
        res.send(error);
    }
})

app.get('/search', async (req, res) => {
    try {
        let result = await Song.aggregate([
            {
                "$search": {
                    "index": "SongsSearch",
                    "autocomplete": {
                        "query": `${req.query.name}`,
                        "path": "name"
                    }
                }
            }
        ]);

        res.send({ 
            result,
            len: result.length
        });
    } catch (error) {
        console.log(error);
    }
})

app.get('/get/:id', async (req, res) => {
    try {
        let result = await User.findOne({ _id: ObjectID(req.params.id) });
        res.send(result);
    } catch (error) {
        res.status(500).send('MongoDB error');
    }
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})