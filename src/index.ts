import { server } from './server/server';
import 'dotenv/config';
import { Knex } from './database/knex';

// Node Poc from Lucas Souza Dev course at https://www.youtube.com/watch?v=SVepTuBK4V0&list=PL29TaWXah3iaaXDFPgTHiFMBF6wQahurP&index=1

const port = process.env.PORT || 3333;

const startServer = () => server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
}); 

if (process.env.IS_LOCALHOST === 'true') {
    Knex.migrate.latest()
        .then(() => {
            startServer();
        })
        .catch(console.log);
} else {
    startServer();
}