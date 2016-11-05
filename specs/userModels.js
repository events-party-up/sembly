var chai = require('chai');
var expect = chai.expect;
var userModels = require('../server/models/userModels');
var User = require('../server/schemas/userSchema');
const testUser = require('./testHelpers').generateTestUsers(1)[0];


describe('User Models', function() {
  before(function(done){
    User.remove({}).exec()
    .then(function(){
      done();
    });
  });

  describe('add User', function() {
    it('should add a new user to the database', function(done) {
      userModels.addUser(testUser)
      .then(function() {
        return User.findOne({'email': testUser.email}).exec()
      })
      .then(function(user) {
        expect(user.email).to.equal(testUser.email);
        done();
      });
    });
    it('should throw an error when email already exists', function(done) {
      userModels.addUser(testUser)
      .catch(function(error) {
        expect(error.message.includes('duplicate key error')).to.equal(true);
        done();
      });
    });
  });

  describe('login', function(){
    it('should retrieve the user if the passwords match', function(done){
      userModels.logIn(testUser.email, testUser.password)
      .then(function(user) {
        expect(user.firstName).to.equal('Test');
        done();
      })
    });
    it('should return "Incorrect Password" if the password is incorrect', function(done){
      userModels.logIn(testUser.email, 'WAHHHPIZZAAWOOOO')
      .then(function(err) {
        expect(err).to.equal('Incorrect Password');
        done();
      });
    });
    it('should return "User does not exist" if the password is incorrect', function(done){
      userModels.logIn('WOOGOOO', 'WAHHHPIZZAAWOOOO')
      .then(function(err) {
        expect(err).to.equal('User does not exist');
        done();
      });
    });
  });

  describe('user Search', function() {
    it('should return users based on email', function(done) {
      userModels.userSearch('test')
      .then(function(users) {
        expect(users[0].email).to.equal(testUser.email);
        done();
      });
    });
    it('should return users based on name', function(done) {
      userModels.userSearch('User')
      .then(function(users) {
        expect(users[0].email).to.equal(testUser.email);
        done();
      });
    });
  });

});
