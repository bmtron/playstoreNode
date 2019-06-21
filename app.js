const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(morgan('dev'));

const store = require('./playstore.js');

app.get('/apps', (req, res) => {
    const { genres, sort } = req.query;
    if(sort) {
        if(!['rating', 'app'].includes(sort)) {
            return res.status(400).send('Must sort by rating or app.');
        }
    }
    let results = store;
    
    if(sort && sort === 'rating') {
        let upSort = sort.charAt(0).toUpperCase() + sort.slice(1);
        results.sort((a, b) => {
            return a[upSort] > b[upSort] ? -1 : a[upSort] < b[upSort] ? 1 : 0;
        });
    }
    if(sort && sort === 'app') {
        let upSort = sort.charAt(0).toUpperCase() + sort.slice(1);
        results.sort((a, b) => {
            return a[upSort] > b [upSort] ? 1 : a[upSort] < b[upSort] ? -1 : 0;
        });
    }

    if(genres) {
        if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
            return res.status(400).send('Must include Action, Puzzle, Strategy, Casual, Arcade, Card');
        }
    }
    if(genres) {
        return results.filter(app => app.Genres.includes(genres));
    }

    res.json(results.Genres);
});

app.listen(8000, () => {
    console.log('Server started on port 8000');
})