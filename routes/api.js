var express = require('express');
var router = express.Router();
var State = require('../state');
var server = require('../server');
var assert = require('assert');

// GET /state
router.get('/state', function (req, res, next) {
    res.json(State.state);
});

// GET /error
router.get('/error', function (req, res, next) {
    assert.fail("This returns an error");
});

// GET /clearAll
router.post('/clearAll', function (req, res, next) {
    State.clearAll();
    server.io.emit('server:state', State.state);
    res.send(true);
});

// POST /login
router.post('/login', function (req, res, next) {
    State.state.players.push({
        nickname: req.body.nickname
    });
    server.io.emit('server:state', State.state);
    res.send(true);
});

// POST /quit
router.post('/quit', function (req, res, next) {
    // remove me from the list of players
    var myindex = state.players.findIndex(function (element) {
        return element.nickname == req.body.nickname;
    })
    console.assert(myindex !== -1, "Failed to find current player");
    State.state.players.splice(myindex, 1);
    server.io.emit('server:state', State.state);
    res.send(true);
});

module.exports = router;
