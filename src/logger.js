function generateId(){
    return Math.random().toString(36).substring(2, 15)
        + Math.random().toString(36).substring(2, 15);
}

export function createLogger(prefix) {
    const correlationId = generateId();

    const log = level => message => {
        console.log(JSON.stringify({
            correlationId,
            level,
            message: `${prefix} ${message}`,
        }));
    }

    return {
        info: log('info'),
        warning: log('warning'),
        error: log('error'),
    }
}
