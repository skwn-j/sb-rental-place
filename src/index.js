/// app.js
import React, { Component } from 'react';
import { render } from 'react-dom';
import * as d3 from 'd3';

// react-map-gl
import readLocalData from './readLocalFiles';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer } from '@deck.gl/layers';
import { StaticMap } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';

// Board Component

import Board, { updateTargetID } from './BoardComponent';
const MAPBOX_TOKEN = 'pk.eyJ1IjoibWluaW11cyIsImEiOiJjanVpMXQ5ZGMxNjQ4NGZwZzA5eXF5N3lsIn0.R_H6mD12p7_M0RcjKjSHnw';

const INITIAL_VIEW_STATE = {
    longitude: 126.98,
    latitude: 37.56,
    zoom: 11,
    maxZoom: 16,
    pitch: 0,
    bearing: 0
};

function getEventsInRange(day, hour, data, range) {
    let value = 0;
    for (let i = 0; i < range; i++) {
        let h = hour + i;
        let d = day;
        if (h >= 24) {
            h = h % 24;
            d = (d + 1) % 7
        }

        const ks = Object.keys(data[0]).filter(key => {
            const datekey = new Date(key);
            return datekey.getDay() === d;
        })

        const ke = Object.keys(data[1]).filter(key => {
            const datekey = new Date(key);
            return datekey.getDay() === d;
        })
        if (ks.length > 0 ) {
            value += data[0][ks[0]][h];
        }
            
        if (ke.length > 0) {
            value -= data[1][ke[0]][h]
        }
    }
    console.log(value)
    const color = d3.interpolateRdBu(0.5 + value / 10);
    let [red, green, blue] = color.split(',')
    red = red.substring(4)
    green = green.trim()
    blue = blue.trim()
    blue = blue.substring(0, blue.length-1)

    return [+red, +green, +blue]

}




class Map extends Component {
    constructor() {
        super();
        const currTime = new Date(Date.now());
        this.state = {
            stationData: null,
            rentalData: null,
            selectedStation: null,
            currHour: 7,   //6 o clock
            currDay: 1      //monday
            //currHour: currTime.getHours(),
            //currDay: currTime.getDay()
        };
    }

    async componentDidMount() {
        const [stationData, rentalData] = await readLocalData();
        this.setState({
            stationData,
            rentalData
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextState);
        return true;
    }

    onClickHandler = (info, event) => {
        console.log(info);
        const currTime = new Date(Date.now())
        this.setState({
            selectedStation: info.object[1],
            //currHour: currTime.getHours()
        })
        updateTargetID(info.object[1]);

    }

    renderStations() {
        const {
            data = this.state.stationData,
            radius = 30,
        } = this.props;

        const sclayer =
            new ScatterplotLayer({
                id: 'stationLayer',
                data,
                filled: true,
                pickable: true,
                radiusScale: radius,
                radiusMinPixels: 0.25,
                getPosition: d => [+d[6], +d[5]],
                getFillColor: d => {
                    const color = getEventsInRange(this.state.currDay, this.state.currHour, this.state.rentalData[d[1]], 2)
                    return color;
                },
                getRadius: 1,
                onClick: (info, event) => {
                    this.onClickHandler(info, event);
                }
            });
        return sclayer;
    }

    render() {
        const { viewState, controller = true, baseMap = true } = this.props;
        return (
            <div>
                {
                    this.state.stationData != null &&
                    <div id='mapContainer'>
                        <DeckGL
                            layers={this.renderStations()}
                            width={1200}
                            height={900}
                            initialViewState={INITIAL_VIEW_STATE}
                            viewState={viewState}
                            controller={controller}
                        >
                            {baseMap && (
                                <StaticMap
                                    reuseMaps
                                    mapStyle="mapbox://styles/mapbox/light-v9"
                                    preventStyleDiffing={true}
                                    mapboxApiAccessToken={MAPBOX_TOKEN}
                                />
                            )}
                        </DeckGL>
                    </div>
                }
                {
                    this.state.rentalData != null &&
                    <div id='boardContainer'>
                        <Board rentalData={this.state.rentalData}> </Board>
                    </div>
                }
            </div>

        )
    }
}

render(
    <Map />, document.getElementById('root')
);
