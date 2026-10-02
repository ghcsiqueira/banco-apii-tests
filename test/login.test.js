const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const bodyLogin = require('../fixtures/postLogin.json');


describe('Login API', () => {
    describe('POST /login', () => {

        it('should return 200 OK', async () => {

            const login = {...bodyLogin};

            const response = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(login);
            
            expect(response.status).to.be.equal(200);
            expect(response.body.token).to.be.a('string');

        });

        it('should return 400 Bad request password is required', async () => {
            const login = {...bodyLogin};
            delete login.senha;

            const response = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(login);
            
            expect(response.status).to.be.equal(400);
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.be.equal('Usuário e senha são obrigatórios.');

        });

        it('should return 400 Bad request username is required', async () => {
            const login = {...bodyLogin};
            delete login.username;

            const response = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(login);
            
            expect(response.status).to.be.equal(400);
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.be.equal('Usuário e senha são obrigatórios.');

        });
        
        it('should return 401 unauthorized', async () => {

            const login = {...bodyLogin};
            login.senha = '12345';
            
            const response = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(login);
            

            expect(response.status).to.be.equal(401);
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.be.equal('Credenciais inválidas.');

        });

        it('should return 405 Not Allowed', async () => {

            const login = {...bodyLogin};
            
            const response = await request(process.env.BASE_URL)
                .get('/login')
                .set('Content-Type', 'application/json')
                .send(login);
            
            expect(response.status).to.be.equal(405);
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.be.equal('Método não permitido.');

        });

        it('should return 500 internal server error', async () => {

            const login = {...bodyLogin};
            login.password = true;
            
            const response = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(login);

            expect(response.status).to.be.equal(500);
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.be.equal('internal server error');

        });
    });
});

