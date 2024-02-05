export const Regions = Object.freeze({
    ABRUZZO: "Abruzzo",
    BASILICATA: "Basilicata",
    CALABRIA: "Calabria",
    CAMPANIA: "Campania",
    EMILIA_ROMAGNA: "Emilia-Romagna",
    FRIULI_VENEZIA_GIULIA: "Friuli Venezia Giulia",
    LAZIO: "Lazio",
    LIGURIA: "Liguria",
    LOMBARDIA: "Lombardia",
    MARCHE: "Marche",
    MOLISE: "Molise",
    PIEMONTE: "Piemonte",
    PUGLIA: "Puglia",
    SARDEGNA: "Sardegna",
    SICILIA: "Sicilia",
    TOSCANA: "Toscana",
    TRENTINO_ALTO_ADIGE: "Trentino-Alto Adige",
    UMBRIA: "Umbria",
    VALLE_DAOSTA: "Valle d'Aosta",
    VENETO: "Veneto",
});

export class RegionalData {
    constructor(region) {
        this.region = region;
        this.hospitals = [];
    }

    addHospital(hospital) {
        this.hospitals.push(hospital);
    }
}

export class Hospital {
    constructor(name, timestamp) {
        this.name = name;
        this.timestamp = timestamp; // Time when the data was reported
        this.triageCategories = [];
        this.treatmentStatus = {
            waitingForVisit: 0,
            inTreatment: 0,
            inObservation: 0,
            waitingForDischargeOrTransfer: 0,
        };
    }

    addTriageCategory(triageCategory) {
        this.triageCategories.push(triageCategory);
    }

    setTreatmentStatus(
        waitingForVisit,
        inTreatment,
        inObservation,
        waitingForDischargeOrTransfer
    ) {
        this.treatmentStatus.waitingForVisit = waitingForVisit;
        this.treatmentStatus.inTreatment = inTreatment;
        this.treatmentStatus.inObservation = inObservation;
        this.treatmentStatus.waitingForDischargeOrTransfer =
            waitingForDischargeOrTransfer;
    }
}

export class TriageCategory {
    constructor({
        color,
        description,
        patientsWaiting,
        patientsInTreatment,
        averageWaitTimeInMinutes,
    }) {
        this.color = color;
        this.description = description;
        this.patientsWaiting = patientsWaiting;
        this.patientsInTreatment = patientsInTreatment;
        this.averageWaitTimeInMinutes = averageWaitTimeInMinutes; // Clearly indicates that the time is in minutes
    }

    // Getter for totalPatients
    get totalPatients() {
        return this.patientsWaiting + this.patientsInTreatment;
    }
}
