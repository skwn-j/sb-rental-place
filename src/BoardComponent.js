/// app.js
import React, { Component } from 'react';
import './index.css';

import rd3 from 'react-d3-library';

//import { node, drawBarChart } from './boardContent';

const RD3Component = rd3.Component;

const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export function updateTargetID(id) {
    this.setState({ targetID: id });
}

class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rentalData: props.rentalData,
            targetID: null,
            targetDay: 0,
            d3: ''
        };
        this.onRadioButtonClick = this.onRadioButtonClick.bind(this);
        // eslint-disable-next-line no-func-assign
        updateTargetID = updateTargetID.bind(this);
    }

    componentDidMount() {
        this.setState({
            d3: ''
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        //console.log(nextState);
        const id = nextState.targetID;
        const day = nextState.targetDay;
        const data = nextState.rentalData[id]
        if(id != null && data != null) {
            //drawBarChart(id, data, day);
            return true;
        }
        else {
            return false;
        }
       
    }


    onRadioButtonClick(day, e) {
        this.setState({ targetDay: days.indexOf(day) })
    }





    render() {
        return (
            <div id='boardContainer'>
                <h1> Board </h1>
                {this.state.targetID != null &&
                    days.map(day => {
                        return <button
                            key={days.indexOf(day)}
                            onClick={(e) => this.onRadioButtonClick(day, e)}
                        > {day} </button>
                    })}
            </div>
        )
    }
}

export default Board;