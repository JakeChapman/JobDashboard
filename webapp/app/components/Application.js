import React from 'react';


export default class Application extends React.Component{
    render(){
        return(
            <div className="ui centered card">
                <div className="content">
                    <div className="header">Job Title Prop goes here</div>
                </div>
                <div className="content">
                    <h4 className="ui sub header">Company goes here</h4>
                </div>
            </div>
        )
    }
}