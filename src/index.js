/// app.js
import React, { Component } from 'react';
import { render } from 'react-dom';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer } from '@deck.gl/layers';
// react-map-gl
import { StaticMap } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';

import Board from './BoardComponent';
import { readLocalData } from './readLocalFiles';
const MAPBOX_TOKEN = 'pk.eyJ1IjoibWluaW11cyIsImEiOiJjanVpMXQ5ZGMxNjQ4NGZwZzA5eXF5N3lsIn0.R_H6mD12p7_M0RcjKjSHnw';



export const INITIAL_VIEW_STATE = {
    longitude: 126.98,
    latitude: 37.56,
    zoom: 11,
    maxZoom: 16,
    pitch: 0,
    bearing: 0
};

export class Map extends Component {
    state = {
        stationData: null,
        board: new Board()
    };

    async componentDidMount() {
        const [stationData, rentalData] = await readLocalData();
        console.log('data loading complete');
        this.setState({
            stationData,
        })
        
        this.state.board.updateState(rentalData);
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
                radiusScale: radius,
                radiusMinPixels: 0.25,
                getPosition: d => [+d[6], +d[5]],
                getRadius: 1
            });
        return sclayer;
    }


    render() {
        const { viewState, controller = true, baseMap = true } = this.props;
        if (this.state.stationData != null) {
            return (
                <div>
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
                    <div id='boardContainer'>
                        <Board {...this.state.board}></Board>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <h1> Loading......</h1>
                    <Board {...this.state.board}></Board>
                </div>
            )
        }
    }
}


render(
    <Map />, document.getElementById('root')
);
