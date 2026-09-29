const request = require('supertest');
const { expect } = require('chai');

describe('Login API', () => {
    describe('POST /login', () => {

        it('should return 200 OK', async () => {

            const response = await request('http://localhost:3000')
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    username: 'julio.lima',
                    password: '123456'
                });
            
            expect(response.status).to.be.equal(200);
            expect(response.body.token).to.be.a('string');

        });

        it('should return 400 Bad request password is required', async () => {

            const response = await request('http://localhost:3000')
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    username: 'julio.lima'
                });
            
            expect(response.status).to.be.equal(400);
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.be.equal('Usuário e senha são obrigatórios.');

        });

        it('should return 400 Bad request username is required', async () => {

            const response = await request('http://localhost:3000')
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    password: '123456'
                });
            
            expect(response.status).to.be.equal(400);
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.be.equal('Usuário e senha são obrigatórios.');

        });
        
        it('should return 401 unauthorized', async () => {

            const response = await request('http://localhost:3000')
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    username: 'julio.lima',
                    password: '12345'
                });
            

            expect(response.status).to.be.equal(401);
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.be.equal('Credenciais inválidas.');

        });

        it('should return 405 Not Allowed', async () => {

            const response = await request('http://localhost:3000')
                .get('/login')
                .set('Content-Type', 'application/json')
                .send({
                    username: 'julio.lima',
                    password: '12345'
                });
            
            expect(response.status).to.be.equal(405);
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.be.equal('Método não permitido.');

        });

        it('should return 500 internal server error', async () => {

            const response = await request('http://localhost:3000')
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    username: 'julio.lima',
                    password: true
                });

            expect(response.status).to.be.equal(500);
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.be.equal('internal server error');

        });
    });
});

