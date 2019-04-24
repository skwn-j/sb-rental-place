import iconv from 'iconv-lite'
import Papa from 'papaparse';
import axios from 'axios';
import { Buffer } from 'buffer';



async function readStationData() {
    let localData = null;
    await axios.get('assets/station/station.csv', {
        responseType: 'arraybuffer',
        responseEncoding: 'euk-kr'
    }).then(res => {
        const utf8Res = iconv.decode(Buffer.from(res.data), 'euc-kr')
        Papa.parse(utf8Res, {
            complete: (result) => {
                localData = result.data;
            }
        });
    })
    return localData.filter(d => d.length === 7);
}

function parseRentalData(rawData, stationData) {
    //if it is first time, then create a file 
    //else, open parsed file from local storage
    let parsedData = {};
    for (let station of stationData) {
        // init data structure
        const stationID = station[1];
        let dataOfStation = [{}, {}];
        let startData = rawData.filter(d => d[1].split('.')[0] === stationID)
        let endData = rawData.filter(d => d[3].split('.')[0] === stationID)
        for(let data of startData) {
            const [reantalID, startPlace, startTime, endPlace, endTime, usageTime, bicycleID, travelDistance] = data;
            const [date, time] = startTime.split(' ');
            const value = {
                'time': time,
                'endPlace': endPlace,
                'usageTime': usageTime,
                'travelDistance': travelDistance 
            }
            if (!(date in dataOfStation[0])) {
                dataOfStation[0][date] = [];
            }
            dataOfStation[0][date].push(value)
        }
        for(let data of endData) {
            const [reantalID, startPlace, startTime, endPlace, endTime, usageTime, bicycleID, travelDistance] = data;
            const [date, time] = endTime.split(' ');
            const value = {
                'time': time,
                'startPlace': startPlace,
                'usageTime': usageTime,
                'travelDistance': travelDistance 
            }
            
            if (!(date in dataOfStation[1])) {
                dataOfStation[1][date] = [];
            }
            dataOfStation[1][date].push(value)
        }
        parsedData[stationID] = dataOfStation;
    }
    
    return parsedData;
}

async function readRentalData() {
    let localData = null;
    await axios.get('assets/rental/201705_sample.csv', {
        responseType: 'arraybuffer',
        responseEncoding: 'utf8'
    }).then(res => {
        const utf8Res = iconv.decode(Buffer.from(res.data), 'utf8')
        Papa.parse(utf8Res, {
            complete: (result) => {
                localData = result.data;
            }
        });
    })
    return localData.filter(d => d.length === 8);
}

export async function readLocalData() {
    const stationData = await readStationData();
    const rawRentalData = await readRentalData();
    //const parsedRentalData = parseRentalData(rawRentalData, stationData);
    //console.log(parsedRentalData);
    return [stationData, rawRentalData];
}
