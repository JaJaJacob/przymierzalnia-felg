import React from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import './CalendarPage.css';

export class CalendarPageConstExp extends React.Component {

  calendarRef = React.createRef()
  
  render() {

    document.title = "Kalendarz"

    return (
      <div className="CalendarPageDiv">
        <div className="CalendarPageLabel">
          Wybierz datę
        </div>
        <div className="CalendarDiv">
          <FullCalendar ref={this.calendarRef} 
            plugins={[ dayGridPlugin, interactionPlugin ]}
            dateClick={this.handleDateClick}
            locale={'pl'}
            weekends={false}
            selectable={true}
            events={'/get-appointments'}
            allDay={true}
            dayMaxEvents={true}
            views={{
              timeGrid: {
                dayMaxEvents: 3
              }
            }}
            validRange={{ start: new Date(),
              end: '2025-06-01'
            }}    
          />
        </div>
      </div>      
    )}

  handleDateClick = (arg) => { 
      var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
      var sameDayCounter = 0
      var selectedDate = arg.dateStr
      var url = "/umow-wizyte/" + selectedDate
      var codedURL = encodeURIComponent(url)
      let calendarApi = this.calendarRef.current.getApi()
      let array = calendarApi.getEvents()
      for (let zmienna = 0; zmienna < array.length; zmienna++)
      {        
        if (selectedDate == array[zmienna].start.toLocaleDateString("fr-CA", options))
        {
          sameDayCounter++
        }
      }
      if (sameDayCounter >= 3)
      {
        alert("Brak wolnych miejsc " + sameDayCounter)
      }
      else
      {
        sameDayCounter = 0
        window.open("/umow-wizyte/"+selectedDate,"_self")
      }
  } 
}

