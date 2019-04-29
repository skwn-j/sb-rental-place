/// app.js
import React, { Component } from 'react';
import { render } from 'react-dom';
// react-map-gl
import readLocalData from './readLocalFiles';
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';

// Board Component
import Map from './MapComponent';
import Board from './BoardComponent';
import TimeSeries from './TimeSeriesComponent';

class App extends Component {
    constructor() {
        super();
        const currTime = new Date(Date.now());
        this.state = {
            stationData: null,
            timeSeriesData: null
        };
    }

    async componentDidMount() {
        const [stationData, timeSeriesData] = await readLocalData();
        this.setState({
            stationData,
            timeSeriesData
        })
    }
    render() {
        return (
            <div>
                
                <div id='mapContainer'>
                    {
                        this.state.stationData != null &&
                        <Map stationData={this.state.stationData}> </Map>
                    }
                </div>
                <div id='timeSeriesContainer'>
                    {this.state.timeSeriesData != null &&
                        <TimeSeries timeSeriesData= {this.state.timeSeriesData}> </TimeSeries>

                    }
                </div>
                <div id='boardContainer'>
                    {
                        this.state.stationData != null &&
                        <Board rentalData={this.state.stationData}> </Board>
                    }
                </div>
            </div>

        )
    }
}

render(
    <App />, document.getElementById('root')
);
