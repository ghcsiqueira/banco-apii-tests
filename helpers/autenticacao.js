const request = require('supertest');

const obtainToken = async (username, senha) => {
    const response = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({
            username: username,
            senha: senha
        });
    return response.body.token;
}

module.exports = {
    obtainToken
}