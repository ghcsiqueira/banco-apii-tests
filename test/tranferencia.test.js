const request = require('supertest');
const { expect } = require('chai');


describe('Transferencia API', () => {
    describe('POST /transferencia', () => {
        it('should return 201 when valor is more or equal to 10', async () => {

            const responseLogin = await request('http://localhost:3000')
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    username: 'julio.lima',
                    senha: '123456'
                });

            const token = responseLogin.body.token;

            const responseTransfer = await request('http://localhost:3000')
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 11.00,
                    token: ""
                });

            expect(responseTransfer.status).to.be.equal(201);
            expect(responseTransfer.body.message).to.be.equal('Transferência realizada com sucesso.');

        });

        it('should return 422 when valor is less than 10', async () => {
            const responseLogin = await request('http://localhost:3000')
            .post('/login')
            .set('Content-Type', 'application/json')
            .send({
                username: 'julio.lima',
                senha: '123456'
            });

        const token = responseLogin.body.token;
            
            const responseTransfer = await request('http://localhost:3000')
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 9.99,
                    token: ""
                });

            expect(responseTransfer.status).to.be.equal(422);
            expect(responseTransfer.body.error).to.be.equal('O valor da transferência deve ser maior ou igual a R$10,00.');

        });
    });
});
