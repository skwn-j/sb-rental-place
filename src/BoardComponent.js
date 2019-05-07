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
            targetSUm: null,
            d3: ''
        };
        // eslint-disable-next-line no-func-assign
        updateTarget = updateTarget.bind(this);
    }



    shouldComponentUpdate(nextProps, nextState) {
        if ((nextState.targetID !== this.state.targetID) || (this.state.targetID === null)) {
            const sum = initBoardContents(this.state.rentalData[nextState.targetID],
                nextState.targetDay, nextState.targetHour, nextState.targetRange);
            const targetData = nextState.rentalData[nextState.targetID]
            this.setState({
                d3: node,
                targetName: targetData.name,
                targetAddr: targetData.addr,
                targetSum: sum
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
            return (
                <div >
                    <RD3Component data={this.state.d3}> </RD3Component>
                    <div>
                        <h2> ID: {this.state.targetID} </h2>
                        <h2> Name: {this.state.targetName} </h2>
                        <h2> Address: {this.state.targetAddr} </h2>
                        <h2> Day: {days[this.state.targetDay]} </h2>
                        <h2> Hour: {this.state.targetHour} </h2>
                        <h2> Range: {this.state.targetRange} </h2>
                        <h2> Sum: {this.state.targetSum} </h2>

                    </div>
                </div>
            );
        }

    }
}

export default Board;