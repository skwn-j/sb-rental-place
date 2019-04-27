/// app.js
import React, { Component } from 'react';

import * as d3 from 'd3';
import rd3 from 'react-d3-library';

const RD3Component = rd3.Component;

const [svgWidth, svgHeight] = [1200, 300];
const margin = {
    left: 30,
    right: 20,
    top: 20,
    bottom: 30
};
const [width, height] = [svgWidth - margin.left - margin.right, svgHeight - margin.top - margin.bottom];

class TimeSeries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeSeriesData: props.timeSeriesData
        };
    }

    componentDidMount() {
        this.setState({
            d3: ''
        })
    }

    render() {
        return (
            
                <h1> TimeseriesBoard </h1>
            
        )
    }
}

export default TimeSeries;