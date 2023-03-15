import "./App.css";
import Events from "./components/events"; //this is the child of app.js

function App() {
  return (
    <div className="App">
      <h1>Techtonica 2023 events</h1>
      <Events />
      {/* calling the events */}
    </div>
  );
}

export default App;
