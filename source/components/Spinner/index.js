// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';

export default class Spinner extends Component {
    render () {
        if (this.props.isSpinning) {
            return <div className = { Styles.spinner } />;
        }

        return null;

    }
}
