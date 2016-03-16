import React from 'react';
import $ from "jquery";
import styles from './App.css';

import Header from './components/Header.js';
import Calendar from './components/Calendar.js';
import Application from './components/Application.js';

import '../semantic/dist/components/menu.css';
import '../semantic/dist/components/item.css';
import '../semantic/dist/components/button.css';
import '../semantic/dist/components/divider.css';
import '../semantic/dist/components/container.css';
import '../semantic/dist/components/segment.css';
import '../semantic/dist/components/card.css';
import '../semantic/dist/components/form.css';


export default class App extends React.Component {
    render() {
        return (
          <div id="page-wrapper">
            <Header/>
              <div className="ui horizontal divider">
                  Application Calendar
              </div>
              {this.props.calendar ?
                  <div className="ui raised container segment">
                      <Calendar/>
                  </div>
                  : ""
              }
              <div className="ui raised container segment">
                {this.props.content}
              </div>
          </div>
        );
    }
}
