import { createLogger } from "./logger.js";
import { get } from './http.js';
import { Regions, RegionalData } from "./model.js";

const getResponse = (statusCode, messageTemplate) => message => {

    const stringyfiedMessage = (typeof message === 'string')
        ? message
        : JSON.stringify(message);

    return {
        statusCode: statusCode ,
        headers: {
            'Content-Type': 'application/json',
        },
        body: messageTemplate.replace('__MESSAGE__', stringyfiedMessage)
    }
};

const getErrorResponse = getResponse(500, '{ message: "__MESSAGE__" }');
const getSuccessResponse = getResponse(200, '__MESSAGE__');

export function createFetcherHandler({ region, dataSources }) {
    return async function handler(event, context, callback) {
        const log = createLogger(`[${region}]`);

        const regionData = new RegionalData(region);

        try {
            // Use Promise.all to wait for all promises to resolve
            const results = await Promise.all(dataSources.map(async ({ id, url, parse }) => {
                log.info(`fetching ${id}...`);
                const rawData = await get(url, log);
                log.info(`fetching ${id}...COMPLETED`);

                log.info(`parsing ${id}...`);
                const hospitals = parse(rawData, log);
                log.info(`parsing ${id}...COMPLETED`);

                return hospitals; // assuming `parse` returns hospital data
            }));

            // Flatten the results array if each 'hospitals' is an array
            const data = results.flat();

            // Assuming you want to add the data to regionData
            data.forEach(hospital => {
                regionData.addHospital(hospital);
            });

            // Use the regionData for the response
            callback(null, getSuccessResponse(regionData));
        } catch (error) {
            // Handle errors
            log.error(error.message);
            callback(error);
        }
    }
}
