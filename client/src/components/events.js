import { useState, useEffect } from "react";
import EventCard from "./eventCard";
import CardGroup from "react-bootstrap/CardGroup";
import AddEvent from "./AddEvent";
//we want to pass the AddEvent component to events.js so we can use the handle change functions thru out all the events
// similar to get request on event, we want to do post request on event bc if have new data we want
// that events to update itself and update the new event
// want to handle all the logic with this state [events, setEvents] so we want this to happen HERE not in the form itself
//so we need to use a function to do so
//1. start clean new react app see how this behaves
//2. edit to do less
function Events() {
  const [events, setEvents] = useState([]);
  console.log("Events start render of state events", events); //happening each time events i sbeing rendered
  useEffect(() => {
    fetch("http://localhost:8080/api/events") //default method is get , specifying url fetching frm
      .then((response) => response.json())
      .then((responseEvents) => {
        setEvents(responseEvents);
        console.log("Events fetched...", responseEvents);
        console.log("events after the fetch", events);
      });
  }, []); //whenever array changes will run useEffect, controls when component rerenders

  const postRequest = (newEvent) => {
    //need to use this in the child, so need to pass as props
    //console.log("From the parent", newEvent);
    return fetch("http://localhost:8080/api/events", {
      //
      method: "POST",
      headers: { "Content-Type": "application/json" }, //when req made from web browser to backend server, req has multiple parts
      //header has extra info
      body: JSON.stringify(newEvent),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //console.log("From the front", data);
        setEvents((events) => [...events, data]);
      });
  };

  return (
    <div>
      <CardGroup className="Events">
        {events.map(
          (event) => (
            <EventCard
              key={event.id}
              title={event.title}
              location={event.location}
              time={event.eventtime}
            />
          ) //passing props here
        )}
      </CardGroup>
      <AddEvent postRequest={postRequest} /> {/*passing the prop but why?*/}
    </div>
  );
}

export default Events;
