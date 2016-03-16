import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";
import AppActions from'../flux/actions/app-actions.js';

export default class AppForm extends React.Component{

    DisplayFields(){
        $("#followUp").toggleClass('hidden');
    }

    handleAppEntry(){
        //Create object for Application Insert
        let title = $("#jobTitle").val();
        let company = $("#companyName").val();
        let descrip = $("#jobDescrip").val();
        let comment = $("#comment").val();
        let url = $("#jobUrl").val();



        let doc = {
            title: title,
            descrip: descrip,
            company: company,
            comments: [{
                comment: comment,
                timestamp: Date.now()
            }],
            url: url,
            resume: ""
        };

        //TODO insert doc object into MongoDb
        console.log(doc);

        AppActions.addLog(doc);

        //Go back to home back
        ReactDOM.render(<App content={<Application/>} calendar={true}/>, document.getElementById('root'));
    }

    render(){
        return(
            <div>
                <form className="ui form" id="entryForm">
                    <div className="field">
                        <label>Company Name</label>
                        <input name="company-name" placeholder="Company Name" type="text" className="entryInput" id="companyName"/>
                    </div>
                    <div className="field">
                        <label>Job Title</label>
                        <input name="job-title" placeholder="Job Title" type="text" className="entryInput" id="jobTitle"/>
                    </div>
                    <div className="field">
                        <label>Job Description</label>
                        <textarea rows="4" className="entryInput" id="jobDescrip"></textarea>
                    </div>
                    <div className="field">
                        <label>Comments</label>
                        <textarea rows="2" className="entryInput" id="comment"></textarea>
                    </div>
                    <div className="field">
                        <label>Job Listing Url</label>
                        <input name="job-url" placeholder="www.thisjob.com" className="entryInput" id="jobUrl"/>
                    </div>
                    <div id="followUp" className="hidden">
                        <label>Comments</label>
                        <textarea rows="2" className="entryInput"></textarea>
                    </div>
                </form>
                <button className="ui black button" onClick={this.DisplayFields}>Add Follow-Up</button>
                <button className="ui blue button" onClick={this.handleAppEntry}>Submit</button>
            </div>
    )
    }
}