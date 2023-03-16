//event card is the parent of deleteEvent
import { useState } from "react";

const DeleteEvent = (props) => {
  const [id, setId] = useState(null); //we dont know the id so can be null

  const handleClick = (id) => {
    console.log("this is from handleSubmit given an id of: ", id);
    props.DeleteEvent(id);
  };
  return (
    <div>
      <button onClick={handleClick}>Delete Event </button>
    </div>
  );
};
export default DeleteEvent;
