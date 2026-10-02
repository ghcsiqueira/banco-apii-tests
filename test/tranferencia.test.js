const request = require('supertest');
const { expect } = require('chai');
const { obtainToken } = require('../helpers/autenticacao');
const bodyTransfer = require('../fixtures/postTransfer.json');

describe('Transferencia API', () => {
    describe('POST /transferencia', () => {
 
        let token;

        before(async () => {
            token = await obtainToken('julio.lima', '123456');
        });

        it('should return 201 when valor is more or equal to 10', async () => {

            const transfer = {...bodyTransfer};
            
            const responseTransfer = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(transfer);

            expect(responseTransfer.status).to.be.equal(201);
            expect(responseTransfer.body.message).to.be.equal('Transferência realizada com sucesso.');

        });

        it('should return 422 when valor is less than 10', async () => {
            const transfer = {...bodyTransfer};
            transfer.valor = 9.99;
            
            const responseTransfer = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(transfer);

            expect(responseTransfer.status).to.be.equal(422);
            expect(responseTransfer.body.error).to.be.equal('O valor da transferência deve ser maior ou igual a R$10,00.');

        });
    });
});
