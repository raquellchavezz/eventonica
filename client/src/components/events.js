import { useState, useEffect } from "react";
import EventCard from "./eventCard";
import CardGroup from "react-bootstrap/CardGroup";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/events")
      .then((response) => response.json())
      .then((events) => {
        setEvents(events);
        console.log("Events fetched...", events);
      });
  }, []); //whenever array changes will run useEffect

  return (
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
  );
}

export default Events;
