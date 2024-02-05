import { Hospital, TriageCategory } from "../../../src/model.js";
import moment from "moment-timezone";

function parseDateTime(dateTimeString) {
    const format = "DD/MM/YYYY HH:mm";
    const timeZone = "Europe/Rome";

    return moment.tz(dateTimeString, format, timeZone).toDate();
}

function parseWaitingTime(timeString) {
    // Split the time string by the colon
    const [hours, minutes] = timeString.split(':').map(Number);

    // Check if hours and minutes are valid numbers
    if (isNaN(hours) || isNaN(minutes)) {
        throw new Error('Invalid time format');
    }

    // Convert hours to minutes and add to minutes
    return hours * 60 + minutes;
}

export function parseAslPescara(responseAsString, log) {
    const response = JSON.parse(responseAsString)
    const lastUpdate = parseDateTime(response.Update);

    const hospitalPopoli = new Hospital('Popoli', lastUpdate);
    hospitalPopoli.setTreatmentStatus(undefined, response.PopoliTotaleInCarico)
    hospitalPopoli.addTriageCategory(new TriageCategory({
        color: 'red',
        description: 'Emergency',
        patientsWaiting: response.PopoliRossoInAttesa,
        patientsWaiting: response.PopoliRossoInCarico,
        averageWaitTimeInMinutes: parseWaitingTime(response.PopoliRossoTempoMedioAttesa)
    }))
    hospitalPopoli.addTriageCategory(new TriageCategory({
        color: 'yellow',
        patientsWaiting: response.PopoliGialloInAttesa,
        patientsWaiting: response.PopoliGialloInCarico,
        averageWaitTimeInMinutes: parseWaitingTime(response.PopoliGialloTempoMedioAttesa)
    }))
    hospitalPopoli.addTriageCategory(new TriageCategory({
        color: 'green',
        patientsWaiting: response.PopoliVerdeInAttesa,
        patientsWaiting: response.PopoliVerdeInCarico,
        averageWaitTimeInMinutes: parseWaitingTime(response.PopoliVerdeTempoMedioAttesa)
    }))
    hospitalPopoli.addTriageCategory(new TriageCategory({
        color: 'white',
        patientsWaiting: response.PopoliBiancoInAttesa,
        patientsWaiting: response.PopoliBiancoInCarico,
        averageWaitTimeInMinutes: parseWaitingTime(response.PopoliBiancoTempoMedioAttesa)
    }))

    const hospitalPenne = new Hospital('Penne', lastUpdate);
    hospitalPenne.setTreatmentStatus(undefined, response.PenneTotaleInCarico)
    hospitalPenne.addTriageCategory(new TriageCategory({
        color: 'red',
        description: 'Emergency',
        patientsWaiting: response.PenneRossoInAttesa,
        patientsWaiting: response.PenneRossoInCarico,
        averageWaitTimeInMinutes: parseWaitingTime(response.PenneRossoTempoMedioAttesa)
    }))
    hospitalPenne.addTriageCategory(new TriageCategory({
        color: 'yellow',
        patientsWaiting: response.PenneGialloInAttesa,
        patientsWaiting: response.PenneGialloInCarico,
        averageWaitTimeInMinutes: parseWaitingTime(response.PenneGialloTempoMedioAttesa)
    }))
    hospitalPenne.addTriageCategory(new TriageCategory({
        color: 'green',
        patientsWaiting: response.PenneVerdeInAttesa,
        patientsWaiting: response.PenneVerdeInCarico,
        averageWaitTimeInMinutes: parseWaitingTime(response.PenneVerdeTempoMedioAttesa)
    }))
    hospitalPenne.addTriageCategory(new TriageCategory({
        color: 'white',
        patientsWaiting: response.PenneBiancoInAttesa,
        patientsWaiting: response.PenneBiancoInCarico,
        averageWaitTimeInMinutes: parseWaitingTime(response.PenneBiancoTempoMedioAttesa)
    }))

    const hospitalPescara = new Hospital('Pescara', lastUpdate);
    hospitalPescara.setTreatmentStatus(undefined, response.PescaraTotaleInCarico)
    hospitalPescara.addTriageCategory(new TriageCategory({
        color: 'red',
        description: 'Emergency',
        patientsWaiting: response.PescaraRossoInAttesa,
        patientsWaiting: response.PescaraRossoInCarico,
        averageWaitTimeInMinutes: parseWaitingTime(response.PescaraRossoTempoMedioAttesa)
    }))
    hospitalPescara.addTriageCategory(new TriageCategory({
        color: 'yellow',
        patientsWaiting: response.PescaraGialloInAttesa,
        patientsWaiting: response.PescaraGialloInCarico,
        averageWaitTimeInMinutes: parseWaitingTime(response.PescaraGialloTempoMedioAttesa)
    }))
    hospitalPescara.addTriageCategory(new TriageCategory({
        color: 'green',
        patientsWaiting: response.PescaraVerdeInAttesa,
        patientsWaiting: response.PescaraVerdeInCarico,
        averageWaitTimeInMinutes: parseWaitingTime(response.PescaraVerdeTempoMedioAttesa)
    }))
    hospitalPescara.addTriageCategory(new TriageCategory({
        color: 'white',
        patientsWaiting: response.PescaraBiancoInAttesa,
        patientsWaiting: response.PescaraBiancoInCarico,
        averageWaitTimeInMinutes: parseWaitingTime(response.PescaraBiancoTempoMedioAttesa)
    }))

    return [
        hospitalPopoli,
        hospitalPenne,
        hospitalPescara,
    ];
}
