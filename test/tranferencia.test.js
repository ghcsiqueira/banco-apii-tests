const request = require('supertest');
const { expect } = require('chai');
const { obtainToken } = require('../helpers/autenticacao');
const bodyTransfer = require('../fixtures/postTransfer.json');

describe('Transferencia API', () => {

    let token;

    before(async () => {
        token = await obtainToken('julio.lima', '123456');
    });

    describe('POST /transferencias', () => {

        it('should return 201 when valor is more or equal to 10', async () => {

            const transfer = { ...bodyTransfer };

            const responseTransfer = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(transfer);

            expect(responseTransfer.status).to.be.equal(201);
            expect(responseTransfer.body.message).to.be.equal('Transferência realizada com sucesso.');

        });

        it('should return 422 when valor is less than 10', async () => {
            const transfer = { ...bodyTransfer };
            transfer.valor = 9.99;

            const responseTransfer = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(transfer);

            expect(responseTransfer.status).to.be.equal(422);
            expect(responseTransfer.body.error).to.be.equal('O valor da transferência deve ser maior ou igual a R$10,00.');

        });

        it('should return 405 Not Allowed when using GET', async () => {

            const responseTransfer = await request(process.env.BASE_URL)
                .get('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)

            expect(responseTransfer.status).to.be.equal(405);
            expect(responseTransfer.body.error).to.be.a('string');
            expect(responseTransfer.body.error).to.be.equal('Método não permitido.');

        });

        it('should return 405 Not Allowed when using PUT', async () => {

            const responseTransfer = await request(process.env.BASE_URL)
                .put('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)

            expect(responseTransfer.status).to.be.equal(405);
            expect(responseTransfer.body.error).to.be.a('string');
            expect(responseTransfer.body.error).to.be.equal('Método não permitido.');

        });

        it('should return 405 Not Allowed when using DELETE', async () => {

            const responseTransfer = await request(process.env.BASE_URL)
                .delete('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)

            expect(responseTransfer.status).to.be.equal(405);
            expect(responseTransfer.body.error).to.be.a('string');
            expect(responseTransfer.body.error).to.be.equal('Método não permitido.');

        });

        it('should return 401 Unauthorized when using Bearer token invalid', async () => {

            const responseTransfer = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer token_invalido')
                .send(bodyTransfer);

            expect(responseTransfer.status).to.equal(401);
        })

        it('should return 422 when contaOrigem is not provided', async () => {
            const transfer = { ...bodyTransfer };
            delete transfer.contaOrigem

            const responseTransfer = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(transfer);

            expect(responseTransfer.status).to.be.equal(422);
            expect(responseTransfer.body.error).to.be.equal('Conta de origem ou destino não encontrada.');

        });
    });

    describe('GET /transferencias/{id}', async () => {
        it('It should return a 200 success status and data matching the transfer record in the database when the ID is valid.', async () => {


            const responseTransfer = await request(process.env.BASE_URL)
                .get('/transferencias/40')
                .set('Authorization', `Bearer ${token}`)

            expect(responseTransfer.status).to.equal(200)
            expect(responseTransfer.body.id).to.equal(40)
            expect(responseTransfer.body.id).to.be.a('number')
            expect(responseTransfer.body.conta_origem_id).to.equal(1)
            expect(responseTransfer.body.conta_destino_id).to.equal(2)
            expect(responseTransfer.body.valor).to.equal(11.00)

        });

    });

    describe('GET /transferencias', () => {
        it('It should return 10 elements in the pagination when a limit of 10 records is specified.', async () => {
            const responseTransfer = await request(process.env.BASE_URL)
                .get('/transferencias?page=1&limit=10')
                .set('Authorization', `Bearer ${token}`)

            expect(responseTransfer.status).to.equal(200)
            expect(responseTransfer.body.limit).to.equal(10)
            expect(responseTransfer.body.transferencias).to.have.lengthOf(10)

        })
    })
});
