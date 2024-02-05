import { JSDOM } from "jsdom";
import { Hospital, TriageCategory } from "../../../src/model.js";
import moment from "moment-timezone";

function parseDateTime(dateTimeString) {
    const format = "DD/MM/YYYY, HH:mm:ss";
    const timeZone = "Europe/Rome";

    return moment.tz(dateTimeString, format, timeZone).toDate();
}

function parseInfo(str) {
    const numberPattern = /^\d+/; // Matches any number at the start of the string
    const timePattern = /(\d+)h:(\d+)m/; // Matches the time format "Xh:Ym"

    const firstNumberMatch = str.match(numberPattern);
    const timeMatch = str.match(timePattern);

    let firstNumber = firstNumberMatch
        ? parseInt(firstNumberMatch[0], 10)
        : null;
    let totalTimeInMinutes = 0;

    if (timeMatch) {
        const hours = parseInt(timeMatch[1], 10);
        const minutes = parseInt(timeMatch[2], 10);
        totalTimeInMinutes = hours * 60 + minutes;
    }

    return [firstNumber, totalTimeInMinutes];
}

function parseSingleRow(lastUpdate) {
    return (tableRow, index) => {
        const hospitalName = tableRow.cells[0].textContent.trim();

        const hospital = new Hospital(hospitalName, lastUpdate);

        const fields = [
            { color: "red", description: "Immediate" },
            { color: "yellow", description: "Non-deferrable Urgency" },
            { color: "blue", description: "Deferrable Urgency" },
            { color: "green", description: "Minor Urgency" },
            { color: "white", description: "Non-Urgency" },
        ];

        fields.forEach(({ color, description }, index) => {
            const raw = tableRow.cells[index+1].textContent;
            const [colorPatientsInWaiting, colorWaitingTimeInMinutes] =
                parseInfo(raw);
            hospital.addTriageCategory(
                new TriageCategory({
                    color,
                    description,
                    patientsWaiting: colorPatientsInWaiting,
                    averageWaitTimeInMinutes: colorPatientsInWaiting,
                })
            );
        });

        const inTreatment = tableRow.cells[6].textContent;
        hospital.setTreatmentStatus(undefined, parseInt(inTreatment))

        return hospital;
    };
}

export function parseAslTeramo(htmlAsString, log) {
    const dom = new JSDOM(htmlAsString);

    // no idea what are the other 3
    const tbody = dom.window.document.querySelectorAll("tbody")[4];
    const allRows = [...tbody.querySelectorAll("tr")];

    const dateAndTimeRaw = dom.window.document
        .querySelectorAll("tfoot > tr > td > div")[4]
        .textContent.trim();
    const lastUpdate = parseDateTime(dateAndTimeRaw);

    const data = allRows.map(parseSingleRow(lastUpdate));
    return data;
}
