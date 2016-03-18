import React from 'react';



const LogItem = React.createClass({

    getDefaultProps(){
        return {
            log: {}
        };
    },

    render(){
        return(
            <div className="ui centered card">
                <div className="content">
                    <div className="header">{this.props.log.title}</div>
                </div>
                <div className="content">
                    <h4 className="ui sub header">{this.props.log.company}</h4>
                </div>
            </div>
        )
    }

});

export  default LogItem;