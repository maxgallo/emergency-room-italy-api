import { createFetcherHandler } from "../../src/handler.js";
import { parseHtml } from './src/parse.js';

const handler = createFetcherHandler({
    region: 'emilia-romagna',
    dataSources: [{
        url: 'https://www.auslromagna.it/tempi-attesa-ps',
        parse: parseHtml,
    }]
});

export { handler }

