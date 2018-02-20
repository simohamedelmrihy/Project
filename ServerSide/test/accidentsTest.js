let chai = require('chai');
let expect = chai.expect;
let request = require('request');
let should = chai.should();
let config = require('./config');
let token = config.token;
let accident = {
  indiceGravite: 10.8,
  nbreDeces: 12,
  nbreHosspitalise: 11,
  nbreBlesseleger: 10,
  lumiere: "Nuit sans éclairage public",
  departement: "9723",
  codeInsee: "972270",
  adresse: "Paris, France",
  numAccident: "381780"
}
let accidentID = null;

describe('Tests for router', function () {
  it("should add a new Accident", function (done) {
    let option = {
      'url': 'http://127.0.0.1:3000/caracteristique?token=' + token,
      'method': 'POST',
      'json': accident,
    };
    request(option, function (err, res, body) {
      console.log('oooooooooo', body);
      expect(res).to.have.property('statusCode').and.equal(200);
      expect(body._id).to.be.a('String');
      expect(body.indiceGravite).to.be.a('number');     
      expect(body.nbreDeces).to.be.a('number');
      expect(body.nbreHosspitalise).to.be.a('number');
      expect(body.nbreBlesseleger).to.be.a('number');
      expect(body.lumiere).to.be.a('String');
      expect(body.departement).to.be.a('String');
      expect(body.codeInsee).to.be.a('String');
      expect(body.adresse).to.be.a('String');
      expect(body.cordonnees).to.be.a('Object');
      accidentID = body._id;
      done();
    });
  });
  it("should return all Accidents", function (done) {
    let option = {
      'url': 'http://127.0.0.1:3000/caracteristique?token=' + token,
      'method': 'GET'
    };
    request(option, function (err, res, body) {
      body = JSON.parse(body);
      expect(res).to.have.property('statusCode').and.equal(200);
      expect(body).to.be.instanceof(Array);
      for (let i = 0; i < body.length; i++) {
        expect(body[i]._id).to.be.a('String');
        expect(body[i].indiceGravite).to.be.a('number');     
        expect(body[i].nbreDeces).to.be.a('number');
        expect(body[i].nbreHosspitalise).to.be.a('number');
        expect(body[i].nbreBlesseleger).to.be.a('number');
        expect(body[i].lumiere).to.be.a('String');
        expect(body[i].departement).to.be.a('String');
        expect(body[i].codeInsee).to.be.a('String');
        expect(body[i].adresse).to.be.a('String');
        expect(body[i].cordonnees).to.be.a('Object');
      }
      done();
    });
  });
  it("should return Accident by _id", function (done) {
    let option = {
      'url': 'http://127.0.0.1:3000/caracteristique/' + accidentID + '?token=' + token,
      'method': 'GET'
    };
    request(option, function (err, res, body) {
      body = JSON.parse(body);
      expect(res).to.have.property('statusCode').and.equal(200);
      expect(body._id).to.be.a('String');
      expect(body.indiceGravite).to.be.a('number');     
      expect(body.nbreDeces).to.be.a('number');
      expect(body.nbreHosspitalise).to.be.a('number');
      expect(body.nbreBlesseleger).to.be.a('number');
      expect(body.lumiere).to.be.a('String');
      expect(body.departement).to.be.a('String');
      expect(body.codeInsee).to.be.a('String');
      expect(body.adresse).to.be.a('String');
      expect(body.cordonnees).to.be.a('Object');
      done();
    });
  });
  it("should update accident by id", function (done) {
    let option = {
      'url': 'http://127.0.0.1:3000/caracteristique/' + accidentID + '?token=' + token,
      'method': 'POST',
      'json': {
        indiceGravite: 13
      }
    };
    request(option, function (err, res, body) {
      expect(res).to.have.property('statusCode').and.equal(200);
      expect(body._id).to.be.a('String');
      expect(body.indiceGravite).to.be.a('number');
      expect(body.nbreDeces).to.be.a('number');
      expect(body.nbreHosspitalise).to.be.a('number');
      expect(body.nbreBlesseleger).to.be.a('number');
      expect(body.lumiere).to.be.a('String');
      expect(body.departement).to.be.a('String');
      expect(body.codeInsee).to.be.a('String');
      expect(body.adresse).to.be.a('String');
      expect(body.cordonnees).to.be.a('Object');
      done();
    });
  });
  it("should delete Accident by id ", function (done) {
    let option = {
      'url': 'http://127.0.0.1:3000/caracteristique/' + accidentID + '?token=' + token,
      'method': 'DELETE',
      'json': {},
    };
    request(option, function (err, res, body) {
      expect(res).to.have.property('statusCode').and.equal(200);
      expect(body._id).to.be.a('String');
      expect(body.indiceGravite).to.be.a('number');
      expect(body.nbreDeces).to.be.a('number');
      expect(body.nbreHosspitalise).to.be.a('number');
      expect(body.nbreBlesseleger).to.be.a('number');
      expect(body.lumiere).to.be.a('String');
      expect(body.departement).to.be.a('String');
      expect(body.codeInsee).to.be.a('String');
      expect(body.adresse).to.be.a('String');
      expect(body.cordonnees).to.be.a('Object');
      done();
    });
  });
});