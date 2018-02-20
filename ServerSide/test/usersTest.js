let chai = require('chai');
let expect = chai.expect;
let request = require('request');
let should = chai.should();
let config = require('./config');
let token = config.token;
let user = {
  email: 'test@gmail.com',
  password: 'password',
  role: 'user'
}
let userID = null;

describe('Tests for router', function () {
  it("should add a new User", function (done) {
    let option = {
      'url': 'http://127.0.0.1:3000/user?token=' + token,
      'method': 'POST',
      'json': user,
    };
    request(option, function (err, res, body) {
      console.log('oooooooooo', body);
      expect(res).to.have.property('statusCode').and.equal(200);
      expect(body._id).to.be.a('String');
      expect(body.email).to.be.a('String');     
      expect(body.password).to.be.a('String');
      expect(body.role).to.be.a('String');
      userID = body._id;
      done();
    });
  });
  it("should return all Accidents", function (done) {
    let option = {
      'url': 'http://127.0.0.1:3000/user?token=' + token,
      'method': 'GET'
    };
    request(option, function (err, res, body) {
      body = JSON.parse(body);
      expect(res).to.have.property('statusCode').and.equal(200);
      expect(body).to.be.instanceof(Array);
      for (let i = 0; i < body.length; i++) {
        expect(body[i]._id).to.be.a('String');
        expect(body[i].email).to.be.a('String');     
        expect(body[i].password).to.be.a('String');
        expect(body[i].role).to.be.a('String');
      }
      done();
    });
  });
  it("should return Accident by _id", function (done) {
    let option = {
      'url': 'http://127.0.0.1:3000/user/' + userID + '?token=' + token,
      'method': 'GET'
    };
    request(option, function (err, res, body) {
      body = JSON.parse(body);
      expect(res).to.have.property('statusCode').and.equal(200);
      expect(body._id).to.be.a('String');
      expect(body.email).to.be.a('String');     
      expect(body.password).to.be.a('String');
      expect(body.role).to.be.a('String');
      done();
    });
  });
  it("should update accident by id", function (done) {
    let option = {
      'url': 'http://127.0.0.1:3000/user/' + userID + '?token=' + token,
      'method': 'POST',
      'json': {
        indiceGravite: 13
      }
    };
    request(option, function (err, res, body) {
      expect(res).to.have.property('statusCode').and.equal(200);
      expect(body._id).to.be.a('String');
      expect(body.email).to.be.a('String');     
      expect(body.password).to.be.a('String');
      expect(body.role).to.be.a('String');
      done();
    });
  });
  it("should delete Accident by id ", function (done) {
    let option = {
      'url': 'http://127.0.0.1:3000/user/' + userID + '?token=' + token,
      'method': 'DELETE',
      'json': {},
    };
    request(option, function (err, res, body) {
      expect(res).to.have.property('statusCode').and.equal(200);
      expect(body._id).to.be.a('String');
      expect(body.email).to.be.a('String');     
      expect(body.password).to.be.a('String');
      expect(body.role).to.be.a('String');
      done();
    });
  });
});