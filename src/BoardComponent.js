/// app.js
import React, { Component } from 'react';

export class Board extends Component {
    state = {
        data: 'This is board component'
    };
    render() {
        return  <h1>{this.state.data}</h1>
    }
}
