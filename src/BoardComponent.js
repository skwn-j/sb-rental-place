/// app.js
import React, { Component } from 'react';
import { render } from 'react-dom';

import './index.css';
import * as d3 from 'd3';

import rd3 from 'react-d3-library';

const RD3Component = rd3.Component;

const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export function updateTargetID(id) {
    this.setState({targetID: id});
    console.log(this.state);
}

class Board extends Component {

    constructor(props) {

        super(props);
        this.state = {
            rentalData: props.rentalData,
            targetID: null,
            targetDay: null,
            d3: ''
        };
        this.onRadioButtonClick = this.onRadioButtonClick.bind(this);
        updateTargetID = updateTargetID.bind(this);
    }

    onRadioButtonClick(id, e) {
        console.log(id);
    }

    componentDidMount() {
        this.setState({
            d3: ''
        })
    }

    

    render() {
        return (
            <div id='boardContainer'>
                <h1> Board </h1>
                {days.map(day => {
                    return <button
                        key={days.indexOf(day)}
                        value={days.indexOf(day)}
                    
                        onClick={(e) => this.onRadioButtonClick(day, e)}
                    > {day} </button>
                })}
            </div>
        )
    }
}

export default Board;