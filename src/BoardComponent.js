/// app.js
import React, { Component } from 'react';
import './index.css';
class Board extends Component {

    constructor(props) {

        super(props);
        this.state = {
            rentalData: props.rentalData,
            targetID: null
        };
    }

    render() {
        return (
            <div id='boardContainer'>
                <h1> Board </h1>
                {this.state.rentalData != null &&
                    <div>
                        {this.state.targetID != null && 
                            <h1> target station: {this.state.targetID}</h1>
                    }
                    </div>
                }
            </div>
        )
    }
}

export default Board;
