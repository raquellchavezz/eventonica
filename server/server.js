//This is the minimal express server.
const express = require("express"); //lets su use the library express
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const db = require("../server/db/db-connection.js"); //this requires the db conenction js file where we are connecting the dataabse to server
//^ usehis conection here to run queries with postgres, CONNECTION
const app = express(); //takes express library and runs it
const PORT = 8080; //backend server

// Configuring cors middleware
app.use(cors()); //anytime use mddlewear wil do app.use

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// // //creates an endpoint for the route `/`
app.get("/", (req, res) => {
  //when server has a req sent to it it'll look for what url is being used
  res.json("Hello Techtonica Server for an app with Events"); //--> localhost:8080
});
// Backend code using Express.js to handle the HTTP
// request and return a response
app.get("/api/events", async (req, res) => {
  //line 26 macthes line 26 in events. js with the get fetch
  //getting all the events in our current db
  //real connection with the DB eventonica
  try {
    //rows will be renamed to events //so we are getting all the events from the db?
    const { rows: events } = await db.query("SELECT * FROM events"); //uses query to select event
    res.send(events); //we are reassigning source: https://medium.com/@nathanaeldemacon/all-you-need-to-know-about-destructuring-in-javascript-a3af9602a7d7
    //https://www.youtube.com/watch?v=-vR3a11Wzt0
    //db query is how the backend communicates with the database
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

//   //creating routes:

//create a event (add a resource --> POST)
app.post("/api/events", async (req, res) => {
  //fetch here too also a http requeust

  //api allows u to share data its a tool
  //TO - DO - At the end => save this event to the db
  //INSERT INTO events (title, location, eventtime) VALUES ('Women in Tech Techtonica Panel', 'Overland Park Convention Center', '2023-04-21')
  try {
    //console.log(req.body) //tried to console log here to see if I could add an event via postman but didn't work
    const newEvent = {
      title: req.body.title,
      location: req.body.location,
      eventtime: req.body.eventtime,
    };
    const result = await db.query(
      //assigning result to the query that will insert the new event we just created
      "INSERT INTO events(title, location, eventtime) VALUES ($1, $2, $3) RETURNING *",
      [newEvent.title, newEvent.location, newEvent.eventtime]
    );
    let response = result.rows[0]; //first row in the query (what we just added?)
    console.log(response);
    res.json(response);
  } catch (e) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

// update a event (PUT) - not working

// app.put("/api/events/${eventId}"),
//   async (req, res) => {
//     try {
//       const { id } = req.params; //we want to get the id of the requested parameters which will be the event id
//       const updateEvent = {
//         title: req.body.title,
//         location: req.body.location,
//         eventtime: req.body.eventtime,
//       };
//       const result = await db.query(
//         //assigning result to the query that will insert the new event we just created
//         "UPDATE events(title, location, eventtime) VALUES ($1, $2, $3) WHERE id = $4",
//         [updateEvent.title, updateEvent.location, updateEvent.eventtime]
//       );
//       let response = result.rows[0]; //first row in the query (what we just added?)
//       console.log(response);
//       res.json(response);
//     } catch (e) {
//       console.log(error);
//       return res.status(400).json({ error });
//     }
//   };

//delete a event, this is the logic
app.delete(
  "/api/events/:eventId",

  async (req, res) => {
    try {
      const { eventId } = req.params; //we want to get the id of the requested parameters which will be the event id
      //^  using object destructuring to extract the value of id from the req.params object.
      const result = await db.query(
        //assigning result to the query that will insert the new event we just created
        "DELETE FROM events WHERE id = $1;", //where id = specific num instead the placeholder
        [eventId] //the value of the placeholder, would be the num
      );
      let response = result.rows[0]; //first row in the query (what we just added?)
      console.log(response);
      res.json(response);
    } catch (e) {
      console.log(error);
      return res.status(400).json({ error });
    }
  }
);
//add strings that will help see in front of console.log to see where undef is coming from
//search for id in the table to see if got delted
//see if query being executed properly on backedn see how to reload frontend after event isnt in the table on the frontend
//
//hardcode the events response for testing reasons. This call has one more event that the real DB
// const events = [

//     {id: 1, title: 'Women in Tech Techtonica Panel', location: 'Overland Park Convention Center'},
//     {id: 2, title: 'Japanese Cultural Education', location: 'Seattle Convention Center'},
//     {id: 3, title: "Haven 90's Party Night Club", location: 'Hilton Hotel Kansas City'},
//     {id: 4, title: 'Comedy Night at the Station', location: 'SF Hilton Hotel'},
//     {id: 5, title: 'A Decadent Arts Experience', location: 'West Ridge Mall'},
//     {id: 6, title: 'Techtonica Classroom Course', location: 'Techtonica HQ'}
//   ];
// res.json(events);
// });

app.listen(PORT, () =>
  console.log(`Hola! Server running on Port http://localhost:${PORT}`)
);
