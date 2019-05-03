import Papa from 'papaparse';


const rentalCSVFiles = [
    //'201701-02.csv',
    //'201703-04.csv',
    '201705.csv',
    '201706.csv',
    '201707.csv',
    //'201708.csv',
    //'201709.csv',
    //'201710.csv',
    //'201711-12.csv'
]




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
function parseTimeSeriesData(rawData) {
    let timeSeriesData = {};
    for(let data of rawData) {
        const startDate = Date.parse(data[2].split(' ')[0]);
        if(!timeSeriesData.hasOwnProperty(startDate)) {
            timeSeriesData[startDate] = 0
        }
        timeSeriesData[startDate] += 1  
        
        const endDate = Date.parse(data[4].split(' ')[0]);
        if(!timeSeriesData.hasOwnProperty(endDate)) {
            timeSeriesData[endDate] = 0
        }
        timeSeriesData[endDate] += 1
    }
    console.log(timeSeriesData);
    return timeSeriesData;
}

function parseRentalData(rawData, stationData) {
    //if it is first time, then create a file 
    //else, open parsed file from local storage
    let parsedData = {};
    stationData.map(st => 
        parsedData[st[1]] = {
            id: st[1],
            name: st[2],
            addr: st[3],
            num_holder: st[4],
            lat: st[5],
            lng: st[6],
            rental: [{}, {}]
        }
    );
    for (let data of rawData) {
        const [serialNum, startPlace, startDateTime, endPlace, endDateTime, usageTime, bicycleID, travelDistance] = data;
        const startPlaceID = startPlace.split('.')[0];
        const [startDate, startTime] = startDateTime.split(' ');
        const endPlaceID = endPlace.split('.')[0];
        const [endDate, endTime] = endDateTime.split(' ');
        if (startPlaceID in parsedData) {
            if (!(startDate in parsedData[startPlaceID].rental[0])) {
                parsedData[startPlaceID].rental[0][startDate] = [];
                for (let i =0; i<24; i++) {
                    parsedData[startPlaceID].rental[0][startDate].push(0);
                }
            }
            const [startHour, startMinute] = startTime.split(":");
            parsedData[startPlaceID].rental[0][startDate][+startHour] += 1;
        }
        if (endPlaceID in parsedData) {
            if (!(endDate in parsedData[endPlaceID].rental[1])) {
                parsedData[endPlaceID].rental[1][endDate] = []
                for (let i =0; i<24; i++) {
                    parsedData[endPlaceID].rental[1][endDate].push(0);
                }
            }
            const [endHour  , endMinute] = endTime.split(":");
            parsedData[endPlaceID].rental[1][endDate][+endHour] += 1;
        }
    }
    return parsedData;
}


async function readRentalData() {
    let localData = []
    for(let fileName of rentalCSVFiles) {
        console.log(fileName);
        const monthlyData = await fetch('assets/rental/'+fileName).then(response => {
            return response.text();
        }).then(text => {
            const parsedText = Papa.parse(text, {
                complete: (res) => {
                    return res;
                }
            })
            return parsedText.data.filter(d => (d.length === 8) && (d[1].split('.').length === 2) && (d[3].split('.').length === 2));
        })
        
        localData = localData.concat(monthlyData);
    }  
    return localData;
}

async function readLocalData() {
    const stationData = await readStationData();
    const rawRentalData = await readRentalData();
    const parsedRentalData = parseRentalData(rawRentalData, stationData);
    const timeSeriesData = parseTimeSeriesData(rawRentalData);
    console.log(timeSeriesData);
    console.log(parsedRentalData);
    console.log(parsedRentalData[390]);
    return [parsedRentalData, timeSeriesData];
}

export default readLocalData;