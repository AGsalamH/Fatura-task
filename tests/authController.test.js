const chai  = require('chai');
const { expect } = chai;
const chaiHTTP = require('chai-http');
const faker = require('faker');

const server = require('../src/app');

chai.use(chaiHTTP);

const { signup, login, refreshTokenHandler, logout } = require('../src/controllers/auth');



describe('Auth controller', () => {
    // --------- Signup -------------
    describe('signup', () => {
        it('Should create new user', function (done) {
            chai.request(server)
                .post('/api/auth/signup')
                .send({
                    username: 'testuser',
                    password: '123456'
                })
                .end((err, res) => {
                    expect(res.status).to.equal(201)
                    expect(res.body.user.roles[0]).to.equal('user');
                    done();
                });
        });

        it('Should throw validation error', function (done) {
            chai.request(server)
                .post('/api/auth/signup')
                .send({
                    username: 'test user',
                    password: '1234'
                })
                .end((err, res) => {
                    expect(res.status).to.equal(422)
                    expect(res.body).to.have.property('errors');
                    done();
                });
        });

    });


    // -------------- Login ----------------
    describe('login', () => {
        it('Should return a valid accessToken and refreshToken', function (done) {
            chai.request(server)
                .post('/api/auth/login')
                .send({
                    username: 'testuser',
                    password: '123456'
                })
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.have.property('accessToken');
                    expect(res.body).to.have.property('refreshToken');
                    done();
                })
        });

        it('Invalid password', function (done) {
            chai.request(server)
                .post('/api/auth/login')
                .send({
                    username: 'testuser',
                    password: '654321'
                })
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                    expect(res.body).to.have.property('error');
                    expect(res.body.error).to.equal('Invalid Password!!');
                    done();
                })
        });


        it('Email does NOT Exist', function(done) {
            chai.request(server)
                .post('/api/auth/login')
                .send({
                    username: 'fakeuser',
                    password: '123456'
                })
                .end((err, res) => {
                    expect(res.status).to.equal(404);
                    expect(res.body).to.have.property('error')
                    expect(res.body.error).to.equal('User not found!');
                    done();
                })
        });

    })

});