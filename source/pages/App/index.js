// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Scheduler from '../../components/Scheduler/index'

@hot(module)
export default class App extends Component {
    render () {
        return (
            <h1
                style = { {
                    display:         'flex',
                    justifyContent:  'center',
                    alignItems:      'center',
                    minHeight:       '100vh',
                    backgroundColor: '#070A13',
                    color:           'white',
                    fontSize:        24,
                    fontWeight:      '600',
                    textAlign:       'center',
                } }>
                <Scheduler/>
            </h1>
        );
    }
}
