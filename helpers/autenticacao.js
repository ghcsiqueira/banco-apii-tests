const request = require('supertest');
const bodyLogin = require('../fixtures/postLogin.json');

const obtainToken = async (username, senha) => {
    const login = {...bodyLogin}

    const response = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(login);
    return response.body.token;
}

module.exports = {
    obtainToken
}