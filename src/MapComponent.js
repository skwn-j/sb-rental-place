/// app.js
import React, { Component } from 'react';
import * as d3 from 'd3';

// react-map-gl
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer } from '@deck.gl/layers';
import { StaticMap } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';

// Board Component

import { updateTarget } from './BoardComponent';
const MAPBOX_TOKEN = 'pk.eyJ1IjoibWluaW11cyIsImEiOiJjanVpMXQ5ZGMxNjQ4NGZwZzA5eXF5N3lsIn0.R_H6mD12p7_M0RcjKjSHnw';

const INITIAL_VIEW_STATE = {
    longitude: 126.98,
    latitude: 37.56,
    zoom: 11,
    maxZoom: 16,
    pitch: 0,
    bearing: 0
};


export function setDateRange(startDate, endDate) {
    this.setState({ startDate, endDate });
}

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stationData: props.stationData,
            startDate: null,
            endDate: null,
            currDay: 2,
            currHour: 7,
            range: 2

        };
        setDateRange = setDateRange.bind(this);
    }

    onClickHandler = (info, event) => {
        console.log(event);
        console.log(info);
        
        const currTime = new Date(Date.now())
        updateTarget(info.object[1].id, this.state.currDay, this.state.currHour, this.state.range);
    }

    shouldComponentUpdate(nextProps, nextState) {
       
        return true;
    }

    componentDidMount() {

    }


    getEventsInRange(data) {
        let value = 0;
        for (let i = 0; i < this.state.range; i++) {
            let h = this.state.currHour + i;
            let d = this.state.currDay;
            if (h >= 24) {
                h = h % 24;
                d = (d + 1) % 7
            }
    
            const ks = Object.keys(data[0]).filter(key => {
                const datekey = new Date(key);
                return (datekey.getDay() === d) && (Date.parse(key) >= this.state.startDate) && (Date.parse(key) <= this.state.endDate);
            })
    
            const ke = Object.keys(data[1]).filter(key => {
                const datekey = new Date(key);
                return (datekey.getDay() === d) && (Date.parse(key) >= this.state.startDate) && (Date.parse(key) <= this.state.endDate);
            })
            if (ks.length > 0) {
                value -= data[0][ks[0]][h];
            }
    
            if (ke.length > 0) {
                value += data[1][ke[0]][h]
            }
        }
       
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

    getEventSize(data) {
        let value = 0;
        let size = 0;
        for (let i = 0; i < this.state.range; i++) {
            let h = this.state.currHour + i;
            let d = this.state.currDay;
            if (h >= 24) {
                h = h % 24;
                d = (d + 1) % 7
            }
    
            const ks = Object.keys(data[0]).filter(key => {
                const datekey = new Date(key);
                return (datekey.getDay() === d) && (Date.parse(key) >= this.state.startDate) && (Date.parse(key) <= this.state.endDate);
            })
    
            const ke = Object.keys(data[1]).filter(key => {
                const datekey = new Date(key);
                return datekey.getDay() === d && (Date.parse(key) >= this.state.startDate) && (Date.parse(key) <= this.state.endDate);
            })

            for(let s of ks) {
               
                value += data[0][s][h];
                size++;
            }
    
            for(let e of ke) {
                value += data[1][e][h];
                size++;
            }
        }
        
        if (size === 0) {
            return 0;
        }
        value = value/size;
        if(value < 5) {
            return 1;
        }
        else if (value < 15) {
            return 2;
        }
        else if (value < 25) {
            return 3;
        }
        else {
           
            return 4;
        }
    }
    

    renderStations() {
        const {
            data = Object.entries(this.state.stationData),
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
                getPosition: d => [+d[1].lng, +d[1].lat],
                getLineColor: d => [255, 255, 255],

                getFillColor: d => {

                    if (this.state.startDate == null) {
                        return [0, 0, 0]
                    }
                    else {
                        const color = this.getEventsInRange(d[1].rental)
                        return color;
                    }

                },
                getRadius: d => {
                    const rad = this.getEventSize(d[1].rental)
                    return rad;
                },
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