// we can start with add event component to better visualize how data is being passed
// componenet for creating new event which is a form

import { useState } from "react"; //need to handle information
//need this form to send this information to do the post request so we can actually add it on the page
//^ dont want this happening here though, we would do it in events.js since this is the place that is already doing a request
const AddEvent = (props) => {
  //here we are passing in the props, could also call this data because its any data passed to the component from its parent which is events.js
  //This is my state with the initial values empty
  //we want to have a state so we can add events
  //useState will be an object with the keys already bc we want to pass the keys
  // the value of the keys will be empty though bc at the beginning we dont know what the user wants to add
  const [event, setEvent] = useState({
    //we use the useState hook to manage state and update UI elements accordingly.
    //curent state value is initally an object with keys all set to empty strings
    //state here used in line 49
    title: "",
    location: "",
    eventtime: "", //this value used for line 77
  });
  //This is my data
  //{title: 'Women', location: 'Overland'. eventtime: "2023-03-29T07:00:00.000Z"}
  //we need handlechange functions so the browser doesnt reload when user types something new in each time
  //
  const handleTitleChange = (e) => {
    //e is NOT the event(which is our data)
    e.preventDefault(); //in order to see this function we have to call it
    let newTitle = e.target.value; //we get the e target which is the value of the newTitle coming from the input type text field
    //if we console.log(e.target) --> <input type="text" id="add-event-title" placeholder="The Title of your Event" required="" value="">
    //so to target the area where it says value above, we need to do e.target.value
    //e.target is an event property that refers to the element that triggered the event.
    console.log("this is the e.target", e.target); // --> <input type="text" id="add-event-title" placeholder="The Title of your Event" required="" value="hello">
    console.log("this is newTitle", newTitle); //-> this is newTitle hello (this is whats in the console when we changed the e.target.value instead of e.target)
    setEvent((event) => ({ ...event, title: newTitle })); //set as new information for the event, curly braces bc state is an object, its how we are able to access/add info to our state
    //used the spread operator to copy all the events, and just change the title of the event we want to change
    //adding directly into the obj, we just want to change the title
    //spreaad operator bc we dont want to lose all the information when changing only the title, we want to keep location, daate, etc

    //setEvent is a function which recieves the original information from event
    //then an anon func will be passed the events with the spread operator and the new thing we want to change
    //new value of title is newTitle which is the e.target.value which targets the
    console.log(event.title); //this is making sure we are console.logging what the user enters for the title
  };
  const handleLocationChange = (e) => {
    // handle changes to a location input.
    e.preventDefault();
    let newLocation = e.target.value; //targets new location user inputs
    setEvent((event) => ({ ...event, location: newLocation }));
    //console.log(event.location);
  };
  const handleDateChange = (e) => {
    e.preventDefault();
    let newDate = e.target.value;
    setEvent((event) => ({ ...event, eventtime: newDate }));
    //console.log(event.eventtime);
  };

  const handleSubmit = (e) => {
    //e = event of the form
    //handles the submit so not grabbing every single character the user types
    e.preventDefault(); //stop browser reloading bc havent connected to server yet
    setEvent(event); //? --> here is where you would set the whole event
    //when setting event to event, stored each piece in event and at once updating overall state
    //SetEvent sets final updated event
    console.log("this is from handleSubmit", event);
    props.postRequest(event); //passing the postRequest here
    //post req func sending this event data to backend so event can be created

    //data.postRequest(event)
  };

  //below from the return is what we are rendering on the screen
  return (
    //we want to render a form, in the form we need 3 fields
    <form onSubmit={handleSubmit}>
      {" "}
      {/*onSubmit want to run the function handleSubmit to handle the data*/}{" "}
      {/*submit always on the form, not for specific inputs, its the thing that will actually control the form*/}
      <label>Title</label>
      <input
        type="text"
        id="add-event-title" //field 1
        placeholder="The Title of your Event"
        required
        value={event.title} //need state
        onChange={handleTitleChange} //onChange, when user changes something in the title, we will use the handleTitleChange fucntion
        //onChange is very particular to this input, only has access to the value inside --> value {event.title}
        //onChange updates property in inital state
      />
      <label>Place</label> {/*field 2*/}
      <input
        type="text"
        id="add-event-location"
        placeholder="The Location of your Event"
        required
        value={event.location} //state
        onChange={handleLocationChange}
      />
      <label>Date</label> {/*adding another input for dat, field 3*/}
      <input
        type="date"
        id="add-event-date"
        value={event.eventtime} //state
        onChange={handleDateChange}
      />
      <button type="submit">Add Event</button>{" "}
      {/*if have handleSubmit then we need a button so user can actually submit */}
    </form>
  );
};

export default AddEvent;
