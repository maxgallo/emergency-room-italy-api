import fetch from 'node-fetch';

export const get = async function(url, log, timeout = 30000) {
    log.info(`fetching url ${url}`);

    try {
        const response = await fetch(url, { timeout });

        if (!response.ok) {
            throw new Error('Failed to load page, status code: ' + response.status);
        }

        const body = await response.text();
        return body;
    } catch (err) {
        log.error(err);
        throw err;
    }
};
