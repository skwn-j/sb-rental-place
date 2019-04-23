/// app.js
import React, { Suspense, Component } from 'react';
import { lazy } from '@loadable/component';
// react-map-gl
import ReactMapGL from 'react-map-gl'
import { SVGOverlay } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

//Local File read
import axios from 'axios';
import { Buffer } from 'buffer';


// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibWluaW11cyIsImEiOiJjanVpMXQ5ZGMxNjQ4NGZwZzA5eXF5N3lsIn0.R_H6mD12p7_M0RcjKjSHnw';

// Initial viewport settings

async function readLocalFile() {
    let csvData = []
    await axios.get('station.csv', {
        responseType: 'arraybuffer',
        responseEncoding: 'euk-kr'
    }).then(res => {
        const iconv = require('iconv-lite');
        const Papa = require('papaparse/papaparse.min.js')
        const utf8Res = iconv.decode(Buffer.from(res.data), 'euc-kr')
        Papa.parse(utf8Res, {
            complete: (result) => {
                csvData = result.data;
            }
        });
    })
    return csvData;
}

const mapStyle = defaultMapStyle
    .setIn([])

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                width: 1200,
                height: 900,
                longitude: 126.97,
                latitude: 37.55,
                zoom: 11
            },
            stationLayer: NaN
        };
    }
    
    componentDidMount() {
        readLocalFile().then(success => {
            console.log('add layer')
            function redraw({ project }) {
                const [cx, cy] = project([126.97, 37.55]);
                return <circle cx={cx} cy={cy} r={10} fill="blue" />;
            }
            return (
                <ReactMapGL {...this.state.viewport}>
                    <SVGOverlay redraw={redraw} />
                </ReactMapGL>
            )
        }, failure => {
            console.log(failure);
        })
    }

    componentWillUnmount() {

    }
    render() {
        return (
            <ReactMapGL
                mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
                {...this.state.viewport}
                onViewportChange={(viewport) => this.setState({ viewport })}
            />
        );
    }
}

export default App;
