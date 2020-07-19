const connection = require('./connection')

module.exports = {
    getAllRounds,
    getSingleRound,
    addRound,
}

function getAllRounds(id, db = connection) {
    return db('rounds')
        .join("players", "rounds.player", "players.player_id")
        .where('game_id', id)
}

function getSingleRound(gameId, roundNum ,db = connection) {
    return db('rounds')
        .join("players", "rounds.player", "players.player_id")
        .where('game_id', gameId)
        .select('round' + roundNum, 'player_id')
}

// expecting roundData = {roundNumber, roundInfo, player_id} from api

function addRound(roundData ,db = connection) {
    let obj = {}
    console.log("1st", obj);
    obj['round' + roundData.roundNumber] = roundData.roundInfo
        if((roundData.roundNumber)%2 != 1) {
            obj['round' + roundData.roundNumber] = JSON.stringify(roundData.roundInfo) 
            console.log(obj);
        }
    return db('rounds')
    .where('player', roundData.playerId,)
    .update(obj)
}