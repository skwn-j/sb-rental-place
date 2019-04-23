/// app.js
import React, { Component } from 'react';
import { render } from 'react-dom';

import { Map } from './MapComponent';

// Set your mapbox access token here

// Initial viewport settings

class App extends Component {
    render() {
        return <Map></Map>
    }
}
render(
    <App />, document.getElementById('root')
);
