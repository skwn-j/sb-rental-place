/// app.js
import React, { Component } from 'react';

class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rentalData: null
        };
    
    }
    updateState(rentalData) {
        this.setState({rentalData})
    }

    render() {
        if (this.state.data != null) {
            return (
                <div>
                    <h1> {this.state.data[0]}</h1>
                    <h1> Loading Board</h1>
                    <h1> Loading Board</h1>
                    <h1> Loading Board</h1>
                </div>
            )

        } else {
            return (<h1> Loading Board</h1>)
        }
    }
}

export default Board;