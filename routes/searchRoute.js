const express = require('express');
const musicFactory = require('../musicFactory');

const router = new express.Router;

router.get('/filterMusic', (req, res) => {
    const queryStr = req.query;
    const filteredMusic = musicFactory.filterMusic(queryStr);
    res.status(200).json(filteredMusic);
})

router.get('/favorite', (req, res) => {
    const id = req.query.id;
    const favoriteMusic = musicFactory.addFavorite(id);
    res.status(200).json(favoriteMusic);
})

module.exports = router;