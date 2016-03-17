import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App.js';
import Application from './Application.js';
import AppForm from './AppForm.js';
import ResumeForm from './ResumeForm.js';
export default class Header extends React.Component{
    NavToHome(){
        ReactDOM.render(<App content={<Application/>} calendar={true}/>, document.getElementById('root'));
    }

    EnterApp(){
        ReactDOM.render(<App content={<AppForm/>} calendar={false}/>, document.getElementById('root'));
    }

    UploadResume(){
        ReactDOM.render(<App content={<ResumeForm/>} calendar={false}/>, document.getElementById('root'));
    }

    render(){
        return (
            <div className="ui top attached menu">
                <div className="ui item" onClick={this.NavToHome}>
                    Job Application Log
                </div>
                <div className="right menu">
                    <button className="ui black button" onClick={this.UploadResume}>
                        New Resume
                    </button>
                    <button className="ui black button" onClick={this.EnterApp}>
                        New Job App
                    </button>
                </div>
            </div>
        )
    }
}