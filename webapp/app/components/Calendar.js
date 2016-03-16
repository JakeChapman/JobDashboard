import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
BigCalendar.momentLocalizer(moment);

export default class Calendar extends React.Component{
    render(){
        let events = [{}];
        return(
            <BigCalendar
                events={events}
                defaultDate={new Date(2015,3,1)}
                />
        )
    }
}