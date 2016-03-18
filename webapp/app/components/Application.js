import React from 'react';
import LogStore from '../flux/stores/log-store.js';
import AppActions from '../flux/actions/app-actions';
import LogList from './LogList.js';

const Application = React.createClass({
    getInitialState() {
        return ({ logs: LogStore.getAll() });
    },

    componentDidMount() {
        LogStore.addChangeListener(this._onChange);

        // fetch the initial list of logs from the server
        AppActions.getLogs();
    },

    componentWillUnmount() {
        LogStore.removeChangeListener(this._onChange);
    },

    _onChange() {
        this.setState({ logs: LogStore.getAll() });
    },

    render(){
        return(
            <LogList logs={this.state.logs}/>
        )
    }
});

export default Application;