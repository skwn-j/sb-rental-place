/// app.js
import React, { Component } from 'react';
import rd3 from 'react-d3-library';
import node, { initTimeSeries } from './timeSeriesContents';
const RD3Component = rd3.Component;



class TimeSeries extends Component {
    constructor(props) {
        super(props);
        initTimeSeries(props.timeSeriesData);
        this.state = {
            timeSeriesData: props.timeSeriesData,
            d3: node
        };
    }

    componentDidMount() {
        initTimeSeries(this.state.timeSeriesData);
        this.setState({d3: node})
    }

    updateContent() {

    }
    componentDidUpdate() {
        this.updateContent();
    }
    render() {
        return (
            <RD3Component data={this.state.d3}></RD3Component>
        )
    }
};

export default TimeSeries;