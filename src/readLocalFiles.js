import iconv from 'iconv-lite'
import Papa from 'papaparse';
import axios from 'axios';
import { Buffer } from 'buffer';

export async function readStationData() {
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
    return localData;
}

export async function readRentalData() {
    let localData = null;
    await axios.get('assets/rental/201708.csv', {
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
    return localData;
}
