import { useState, useEffect } from "react";
import EventCard from "./eventCard";
import CardGroup from "react-bootstrap/CardGroup";
import AddEvent from "./AddEvent";
import UpdateEvent from "./UpdateEvent"; //this is a child of events.js
//we want to pass the AddEvent component to events.js so we can use the handle change functions thru out all the events
// similar to get request on event, we want to do post request on event bc if have new data we want
// that events to update itself and update the new event
// want to handle all the logic with this state [events, setEvents] so we want this to happen HERE not in the form itself
//so we need to use a function to do so
//1. start clean new react app see how this behaves
//2. edit to do less
//template for all the events pass data back and forth from events.js

function Events() {
  const [events, setEvents] = useState([]); //setting intial valye of events as an empty array
  console.log("Events initial render of events, empty array", events); //happening each time events i sbeing rendered
  //we want to fetch data from the url below
  //once successfully fetch data will update using state using setEvents with the data we get back

  //fetch is used to send HTTP requests to the backend to retrieve data or send data for processing.
  useEffect(() => {
    //cant use async here using the useEffect hook which will run at the minute the component first renders & only time will run bc has empty dependency array inside of it
    //fetch this data ONCE when this component first renders
    //this is a fetch request to the backend
    fetch("http://localhost:8080/api/events") //default method is get—so this here is a get request , specifying url fetching frm this is our endpoint
      //get req = retrieve and return a specific resource (usually a web page or data) from a specified URL.
      //this returns to us a promise
      //HTTP request to the backend, specifying the endpoint and any necessary
      // data in the request body or query parameters -->  two ways to send additional data to the server.
      //.then will fire a function once the promise is resolved and we have the data back
      .then((response) => response.json()) //this response obj isnt actually the data, its just a response object
      //in order to get the data need to do something with the response object which is when we use the fetch api
      //to get the data we do response.json --> passes the data into JSON into a javascript object for us
      .then((responseEvents) => {
        //refers to the parsed JSON data after first .then
        console.log("Events fetched...", responseEvents);
        //responseEvents is the actual data
        //fires this function once the above .then is complete
        //^ this takes in(as a param)the actual data that response.json gets us
        setEvents(responseEvents); //updates the state of the component with the fetched data
        // so that the UI can be re-rendered with the new data.

        console.log("events after the fetch", events);
      });
  }, []); //whenever array changes will run useEffect, controls when component rerenders
  //empty array =  indicates that the effect should only be executed once, when the component is mounted/loads.

  const postRequest = (newEvent) => {
    //we want to send a post req to the back end to add event
    //with the newEvent data in the request body
    // goal: updates the state of the component with the newly created event data returned by the server.
    //need to use this in the child, so need to pass as props
    //console.log("From the parent", newEvent);
    //newEvent in param = data to be sent in the request body.
    return fetch("http://localhost:8080/api/events", {
      //
      method: "POST",
      headers: { "Content-Type": "application/json" }, //when req made from web browser to backend server, req has multiple parts
      //header has extra info
      body: JSON.stringify(newEvent), // request body as a JSON string representation of the newEvent object.
    })
      .then((response) => {
        // receives the response object returned by the server(backend).
        return response.json(); //change format to JSON so we can use it
      })
      .then((data) => {
        // receives the JSON data returned by the first .then()
        //console.log("From the front", data);
        setEvents((events) => [...events, data]); //updates the state of the component
        //add the new event data to the existing list of events in the state
        // ... to copy the existing events array and adding the new event data at the end of the array.
      });
  };

  //put request
  const putRequest = (eventId, updatedEvent) => {
    //need to use this in the child, so need to pass as props
    //console.log("From the parent", newEvent);
    return fetch("http://localhost:8080/api/${eventId}", {
      //
      method: "PUT",
      headers: { "Content-Type": "application/json" }, //when req made from web browser to backend server, req has multiple parts
      //header has extra info
      body: JSON.stringify(updatedEvent), //updatedEvent is an object containing the updated data for the event now transformed to JSON format
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //receives the JSON data returned by the first .then()
        //data object contains the updated information for the event that was just edited.
        //console.log("From the front", data);
        //so witht this data
        setEvents(
          (
            events //we want to set the events to the current newest state using setEvents function
          ) => events.map((event) => (event.id === data.id ? data : event))
          //we want to map over
        );
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
      <AddEvent postRequest={postRequest} />

      <UpdateEvent putRequest={putRequest} />
      {/*passing the prop to the AddEvent component so it will have access to the prop postRequest with a value of postRequest*/}
      {/*this allows the component to get the data/functions from its parent component*/}
      {/*, the AddEvent component will have access to the postRequest
 function as a prop, which it can then use to make a request to the server or 
 update the state of the parent component.*/}
      {/*dont want to render addEvent until we have an output */}
    </div>
  );
}

export default Events;
