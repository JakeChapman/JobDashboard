import React from 'react';
import LogItem from './LogItem.js';


const LogList = React.createClass({

    getDefaultProps(){
        return {
            logs: {}
        };
    },

    render(){
        let logs = Object.keys(this.props.logs).map(log_id => {
            let log = this.props.logs[log_id];
            return (
                    <LogItem key={log._id} log={log} />
            );
        });

        return(
        <div>
            {logs}
        </div>
        )
    }

});

export default LogList;