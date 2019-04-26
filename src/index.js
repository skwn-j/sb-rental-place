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

import Board , {updateTargetID} from './BoardComponent';
const MAPBOX_TOKEN = 'pk.eyJ1IjoibWluaW11cyIsImEiOiJjanVpMXQ5ZGMxNjQ4NGZwZzA5eXF5N3lsIn0.R_H6mD12p7_M0RcjKjSHnw';

const INITIAL_VIEW_STATE = {
    longitude: 126.98,
    latitude: 37.56,
    zoom: 11,
    maxZoom: 16,
    pitch: 0,
    bearing: 0
};

function getEventsInRange(time, data, range) {
    
    const hourLimit = (time.hour + range)%60;
    const carry = Math.floor((time.hour + range)/60);
    console.log(data);

}




class Map extends Component {
    constructor() {
        super();
        const currTime = new Date(Date.now());
        this.state = {
            stationData: null,
            rentalData: null,
            selectedStation: null,
            currTime: {day: currTime.getDay(), hour: currTime.getHours(), minute: currTime.getMinutes()}
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
        this.setState({
            selectedStation: info.object[1],
            currTime: Date.now()
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
                    getEventsInRange(this.state.currTime, this.state.rentalData[d[1]], 1)
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
                    <div id = 'boardContainer'>
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
