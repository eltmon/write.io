var should = require('should');
var Nightmare = require('nightmare');

describe('my first test', function () {
    it('is running', function () {
        true.should.equal(true);
    });
});

// Web tests
require('../server');

// describe('Homepage', function () {
//     it('Sanity', function () {
//         yield Nightmare()
//             .goto('http://localhost:3000/')
//             .visible('#home-pagez')
//     });
// });

var url = 'http://localhost:3000';

describe('Start page', function () {
    this.timeout(15000); // Set timeout to 15 seconds, instead of the original 2 seconds

    it('should show login form when loaded', function (done) {
        new Nightmare()
            .goto(url)
            .evaluate(function () {
                return document.querySelectorAll('#home-page').length;
            }).run(function (err, result) {
                result.should.equal(1);
                done();
            });
    });
});

describe('Game page', function () {
    this.timeout(15000); // Set timeout to 15 seconds, instead of the original 2 seconds

    it("should contain the list of players", function (done) {
        new Nightmare()
            .goto(url)
            .type('#choosenickname', 'ripper234')
            .click('#write-btn')
            .evaluate(function () {
                return document.querySelectorAll('#game-page h1')[0].innerHTML;
            }).run(function (err, result) {
                result.should.equal("List of players");
                done();
            });
    });

    it("should contain the current user's name", function (done) {
        var username = 'sinbad';
        new Nightmare()
            .goto(url)
            .type('#choosenickname', username)
            .click('#write-btn')
            .evaluate(function () {
                return document.querySelectorAll('#game-page')[0].innerHTML;
            }).run(function (err, result) {
                result.should.containEql(username);
                done();
            });
    });
});