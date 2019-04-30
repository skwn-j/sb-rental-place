/// app.js
import React, { Component } from 'react';
import rd3 from 'react-d3-library';
import node, { initTimeSeries } from './timeSeriesContents';
const RD3Component = rd3.Component;



class TimeSeries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeSeriesData: props.timeSeriesData,
            d3: ''
        };
    }


    componentDidMount() {
        initTimeSeries(this.state.timeSeriesData);
        this.setState({
            d3: node
        });
    }


    render() {
        if (this.state.d3 !== '') {
            console.log('show');
            return (
                <RD3Component data={this.state.d3}></RD3Component>
            )
        }
        else {
            return <h1>Time Series</h1>
        }

    }
};

export default TimeSeries;