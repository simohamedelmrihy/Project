let chai = require('chai');
let expect = chai.expect;
let request = require('request');
let should = chai.should();
let config = require('./config');
let token = config.token;
let comment = {
    message: "message test"
};
let commentID = null;

describe('Tests for router', function () {
    it("should add a new comment", function (done) {
        let option = {
            'url': 'http://127.0.0.1:3000/commentaire?token='+token,
            'method': 'POST',
            'json': comment,
        };
        request(option, function (err, res, body) {
            console.log('oooooooooo', body);
            expect(res).to.have.property('statusCode').and.equal(200);
            expect(body._id).to.be.a('String');
            expect(body.user).to.be.a('Object');
            expect(body.message).to.be.a('String');
            commentID = body._id;
            done();
        });
    });
    it("should return all Comments", function (done) {
        let option = {
            'url': 'http://127.0.0.1:3000/commentaire?token='+token,
            'method': 'GET'
        };
        request(option, function (err, res, body) {
            body = JSON.parse(body);
            expect(res).to.have.property('statusCode').and.equal(200);
            expect(body).to.be.instanceof(Array);
            for (let i = 0; i < body.length; i++) {
              expect(body[i]._id).to.be.a('String');
              expect(body[i].message).to.be.a('String');
            }
            done();
        });
    });
    it("should return comment by _id", function (done) {
        let option = {
            'url': 'http://127.0.0.1:3000/commentaire/'+commentID+'?token='+token,
            'method': 'GET'
        };
        request(option, function (err, res, body) {
            body = JSON.parse(body);
            expect(res).to.have.property('statusCode').and.equal(200);
            expect(body._id).to.be.a('String');
            expect(body.user).to.be.a('Object');
            expect(body.message).to.be.a('String');
            done();
        });
    });
    it("should update comment by id ", function (done) {
        let option = {
            'url': 'http://127.0.0.1:3000/commentaire/'+commentID+'?token='+token,
            'method': 'POST',
            'json': {
                message: "Nouveau message"
            },
        };
        request(option, function (err, res, body) {
            expect(res).to.have.property('statusCode').and.equal(200);
            expect(body._id).to.be.a('String');
            expect(body.user).to.be.a('Object');
            expect(body.message).to.be.a('String');
            done();
        });
    });
    it("should delete Comment by id ", function (done) {
        let option = {
            'url': 'http://127.0.0.1:3000/commentaire/'+commentID+'?token='+token,
            'method': 'DELETE',
            'json': {},
        };
        request(option, function (err, res, body) {
            expect(res).to.have.property('statusCode').and.equal(200);
            expect(body._id).to.be.a('String');
            expect(body.user).to.be.a('Object');
            expect(body.message).to.be.a('String');
            done();
        });
    });
});