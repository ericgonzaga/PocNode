import { StatusCodes } from 'http-status-codes';
import { testServer } from './jest.setup';

describe('Pessoa - Create', () => {

    it ('criar pessoa', async () => {
        const res1 = await testServer.post('/pessoa').send({ name: 'eric', age: 35 });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(res1.body).toHaveProperty('id');
    });
});

describe('Pessoa - List', () => {

    it ('listar pessoas', async () => {
        const res1 = await testServer.get('/pessoa?filter=teste').send();
        expect(res1.statusCode).toEqual(StatusCodes.OK);
        expect(Number(res1.header['x-total-count'])).toBeGreaterThan(0);
        expect(res1.body.length).toBeGreaterThan(0);
    });
});
