/// app.js
import React, { Component } from 'react';
import rd3 from 'react-d3-library';
import Select from 'react-select';
import node, { initTimeSeries } from './timeSeriesContents';
const RD3Component = rd3.Component;

const days = [
    { label: 'SUN', value: 0 },
    { label: 'MON', value: 1 },
    { label: 'TUE', value: 2 },
    { label: 'WED', value: 3 },
    { label: 'THU', value: 4 },
    { label: 'FRI', value: 5 }, 
    { label: 'SAT', value: 6 }
 ]
const hours = [
    { label: '0', value: 0 },
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6', value: 6 },
    { label: '7', value: 7 },
    { label: '8', value: 8 },
    { label: '9', value: 9 },
    { label: '10', value: 10 },
    { label: '11', value: 11 },
    { label: '12', value: 12 },
    { label: '13', value: 13 },
    { label: '14', value: 14 },
    { label: '15', value: 15 },
    { label: '16', value: 16 },
    { label: '17', value: 17 },
    { label: '18', value: 18 },
    { label: '19', value: 19 },
    { label: '20', value: 20 },
    { label: '21', value: 21 },
    { label: '22', value: 22 },
    { label: '23', value: 23 }
];

class TimeSeries extends Component {
    constructor(props) {
        super(props);
        initTimeSeries(props.timeSeriesData);
        this.state = {
            timeSeriesData: props.timeSeriesData,
            d3: node,
            dayOption: 0,
            hourOption: 0,
            rangeOption: 1
            
        };
    }


    componentDidMount() {
        initTimeSeries(this.state.timeSeriesData);
        this.setState({
            d3: node
        });
    }

    onDayChange = (dayOption) => {
        this.setState({ dayOption });
        console.log(dayOption)
    }

    onHourChange = (hourOption) => {
        this.setState({ hourOption })
        console.log(hourOption);
    }
    onRangeChange = (rangeOption) => {
        this.setState({ rangeOption })
        console.log(rangeOption);
    }


    render() {
        if (this.state.d3 === node) {
            console.log('show');
            const { _, __, dayOption, hourOption, rangeOption  } = this.state;
            return (
                <div>
                    <RD3Component data={this.state.d3}></RD3Component>
                    <Select
                        value = {dayOption}
                        onChange={this.onDayChange}
                        options= {days}
                    />
                     <Select
                        value = {hourOption}
                        onChange={this.onHourChange}
                        options= {hours}
                    />
                     <Select
                        value = {rangeOption}
                        onChange={this.onRangeChange}
                        options= {hours}
                    />
                </div>

            )
        }
        else {
            return <h1>Time Series</h1>
        }

    }
};

export default TimeSeries;