import { Regions } from "../../src/model.js";
import { createFetcherHandler } from "../../src/handler.js";
import { parseAslTeramo } from "./src/parseAslTeramo.js";
import { parseAslPescara } from "./src/parseAslPescara.js";

const handler = createFetcherHandler({
    region: Regions.ABRUZZO,
    dataSources: [
        {
            id: 'asl-teramo',
            url: 'https://pss.aslteramo.it/wtfa',
            parse: parseAslTeramo,
        },
        {
            id: 'asl-pescara',
            url: 'https://webapps.asl.pe.it/situazioneps/',
            parse: parseAslPescara,
        },
        // {
            // id: 'asl-pescara',
            // url: 'https://www.asl.pe.it/situazione_prontosoccorso.jsp',
            // parse: parseHtml,
        // },
        // doesn't work right now
        // {
            // id: '',
            // url: 'https://cup.asl2abruzzo.it/IasiSmartPortaleServizi/#/portaleasl/prontoSo',
            // parse: () => {}
        // }
    ]
});

export { handler }

