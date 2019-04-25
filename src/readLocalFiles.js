import Papa from 'papaparse';

async function readStationData() {
    const localData = await fetch('assets/station/station.csv').then(response => {
        return response.text();
    }).then(text => {
        const parsedText = Papa.parse(text, {
            complete: (res) => {
                return res;
            }
        })
        return parsedText.data.filter(d => d.length === 7);
    })
    return localData;
}

function parseRentalData(rawData, stationData) {
    //if it is first time, then create a file 
    //else, open parsed file from local storage
    let parsedData = {};
    stationData.map(d => parsedData[d[1]] = [{}, {}])
    for (let data of rawData) {
        const [serialNum, startPlace, startDateTime, endPlace, endDateTime, usageTime, bicycleID, travelDistance] = data;
        const startPlaceID = startPlace.split('.')[0];
        const [startDate, startTime] = startDateTime.split(' ');
        const endPlaceID = endPlace.split('.')[0];
        const [endDate, endTime] = endDateTime.split(' ');
        if (startPlaceID in parsedData) {
            if (!(startDate in parsedData[startPlaceID][0])) {
                parsedData[startPlaceID][0][startDate] = []
            }
            parsedData[startPlaceID][0][startDate].push(startTime);
        }
        if (endPlaceID in parsedData) {
            if (!(endDate in parsedData[endPlaceID][1])) {
                parsedData[endPlaceID][1][endDate] = []
            }
            parsedData[endPlaceID][1][endDate].push(endTime);
        }
    }
    return parsedData;
}

async function readRentalData() {
    const localData = await fetch('assets/rental/201705_sample.csv').then(response => {
        return response.text();
    }).then(text => {
        const parsedText = Papa.parse(text, {
            complete: (res) => {
                return res;
            }
        })
        return parsedText.data.filter(d => (d.length === 8) && (d[1].split('.').length === 2) && (d[3].split('.').length === 2));
    })
    return localData;
}

async function readLocalData() {
    const stationData = await readStationData();
    const rawRentalData = await readRentalData();
    const parsedRentalData = parseRentalData(rawRentalData, stationData);
    console.log(parsedRentalData);
    return [stationData, parsedRentalData];
}

export default readLocalData;