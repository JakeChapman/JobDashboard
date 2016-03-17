import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App.js';
import Application from './Application.js';
import AppForm from './AppForm.js';

export default class ResumeForm extends React.Component{
    NavToHome(){
        ReactDOM.render(<App content={<Application/>} calendar={true}/>, document.getElementById('root'));
    }

    render(){
        return(<form method='post' action='upload' encType="multipart/form-data" onSumbit={this.NavToHome}>
            <div className="field">
                <label>Resume</label>
                <input name="resume" type="file" className="entryInput" id="resume"/>
            </div>
            <input className="ui black button" type='submit'/>
        </form>)
    }
};