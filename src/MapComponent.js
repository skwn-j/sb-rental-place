/// app.js
import React, { Component } from 'react';
import { render } from 'react-dom';
import * as d3 from 'd3';

// react-map-gl
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer } from '@deck.gl/layers';
import { StaticMap } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';

// Board Component

import Board, { updateTargetID } from './BoardComponent';
import Timeseries from './TimeSeriesComponent';
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
        if (ks.length > 0) {
            value -= data[0][ks[0]][h];
        }

        if (ke.length > 0) {
            value += data[1][ke[0]][h]
        }
    }
    console.log(value)
    if (value > 10) {
        value = Math.max(value, 10)
    }
    else if (value < -10) {
        value = Math.min(value, -10)
    }

    const color = d3.interpolateRdBu(0.5 + value / 20);
    let [red, green, blue] = color.split(',')
    red = red.substring(4)
    green = green.trim()
    blue = blue.trim()
    blue = blue.substring(0, blue.length - 1)

    return [+red, +green, +blue]

}


class Map extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        const currTime = new Date(Date.now());
        this.state = {
            stationData: props.stationData,
            selectedStation: null,
            currHour: 18,   //6 o clock
            currDay: 2      //monday
            //currHour: currTime.getHours(),
            //currDay: currTime.getDay()
        };
    }

    onClickHandler = (info, event) => {
        console.log(info);
        const currTime = new Date(Date.now())
        this.setState({
            selectedStation: info.object[1],
            //currHour: currTime.getHours()
        })
        updateTargetID(info.object[1].id);

    }

    renderStations() {
        const {
            data = Object.entries(this.state.stationData),
            radius = 30,
        } = this.props;
        console.log(data);
        const sclayer =
            new ScatterplotLayer({
                id: 'stationLayer',
                data,
                filled: true,
                pickable: true,
                radiusScale: radius,
                radiusMinPixels: 0.25,
                getPosition: d => [+d[1].lng, +d[1].lat],
                /*getFillColor: d => {
                    const color = getEventsInRange(this.state.currDay, this.state.currHour, this.state.rentalData[d[1]], 2)
                    return color;
                },*/
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

        )
    }
}

export default Map;