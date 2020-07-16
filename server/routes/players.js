const express = require('express')
const router = express.Router()

const db = require('../db/players')

router.get('/:id', (req, res) => {
    console.log(req.params.id);
    
    db.getPlayers(req.params.id)
        .then(player => { 
            res.send(player)
        })
        .catch(error => {
            res.status(500).send(error.message)
        })
})

router.post('/', (req, res) => {
    const newPlayer = req.body
    db.addPlayer(newPlayer)
        .then(player => {
            db.getPlayers(newPlayer.game_id)
                .then(group => {
                    res.send(group)
                })
            // res.send(player)
        })
        .catch(error => {
            res.status(500).send(error.message)
        })
})

module.exports = router