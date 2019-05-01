/// app.js
import React, { Component } from 'react';
import rd3 from 'react-d3-library';
import node, { initBoardContents } from './boardContents';

const RD3Component = rd3.Component;

const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export function updateTarget(id, day, hour, range) {
    this.setState({
        targetID: id,
        targetHour: hour,
        targetDay: day,
        targetRange: range
    });
}

class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rentalData: props.rentalData,
            targetID: null,
            targetDay: null,
            targetHour: null,
            targetRange: null,
            d3: ''
        };
        // eslint-disable-next-line no-func-assign
        updateTarget = updateTarget.bind(this);
    }



    shouldComponentUpdate(nextProps, nextState) {
        if ((nextState.targetID != this.state.targetID) || (this.state.targetID === null)) {
            console.log(nextState.targetID)
            initBoardContents(this.state.rentalData[nextState.targetID],
                nextState.targetDay, nextState.targetHour, nextState.targetRange);
            this.setState({
                d3: node
            })
            return true;
        }
        else {
            console.log('false')
            return false;
        }
    }


    render() {
        if (this.state.targetID == null) {
            return <h1> board </h1>;
        }
        else {
            return <RD3Component data={this.state.d3}> </RD3Component>;
        }

    }
}

export default Board;