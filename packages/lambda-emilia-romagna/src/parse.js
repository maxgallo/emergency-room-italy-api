import { JSDOM } from 'jsdom'

function extractDateTime(str) {
    const regex = /(\d{2}:\d{2}) del (\d{2})-(\d{2})-(\d{4})/;
    const matches = str.match(regex);

    if (matches) {
        const [_, time, day, month, year] = matches;
        // Constructing a Date object
        const date = new Date(`${year}-${month}-${day}T${time}:00`);
        return date;
    } else {
        return null; // or handle the error as needed
    }
}

function parseSingleHospital(titleElement) {
    const name = titleElement.textContent;

    const timeAndDateRawText = titleElement.nextElementSibling.textContent
    const dateTime = extractDateTime(timeAndDateRawText);

    const aaa = titleElement.nextElementSibling.nextElementSibling.querySelectorAll('td.numero')

    const totalWaitingForConsultation = aaa[0].textContent
    const totalTreatment = aaa[1].textContent
    const totalObservation = aaa[2].textContent
    const totalWaitingForTransfer = aaa[3].textContent


    const hospital = {
        name,
        dateTime,
        totalWaitingForConsultation,
        totalTreatment,
        totalObservation,
        totalWaitingForTransfer,
    }
    console.log(hospital)
}

export function parseHtml(htmlAsString, log) {
    const dom = new JSDOM(htmlAsString);

    const allRows = [...dom.window.document.querySelectorAll('h2.sep')];
    const data = allRows.map(parseSingleHospital)
    // const allRows = [...dom.window.document.querySelectorAll('tr.dati')];
    // const data = allRows.map(parseSingleRow);
    // return data;
    return [];
}

// uncomment for local test
import fs from 'fs'
const mockResponse = fs.readFileSync('./mocks/mock.html', 'utf-8')
parseHtml(mockResponse)

