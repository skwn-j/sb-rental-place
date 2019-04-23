/// app.js
import React, { Component } from 'react';
import { render } from 'react-dom';

import { Map } from './MapComponent';
import { Board } from './BoardComponent';
// Set your mapbox access token here

import './index.css';
// Initial viewport settings

class App extends Component {
    render() {
        return (
            <div>
                <div id='mapContainer'>
                    <Map id='map'></Map>
                </div>
                <div id='boardContainer'>
                    <Board id='board'></Board>
                </div>
            </div>
        )
    }
}

render(
    <App />, document.getElementById('root')
);
