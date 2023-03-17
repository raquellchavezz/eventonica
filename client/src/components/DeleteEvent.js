//event card is the parent of deleteEvent
import { useState } from "react";

const DeleteEvent = (props) => {
  //   const [id, setId] = useState(null); //we dont know the id so can be null
  const handleClick = (e) => {
    e.preventDefault();
    props.deleteEvent(props.id); //passing func thru props
  };
  return (
    <div>
      <button onClick={handleClick}>Delete </button>
    </div>
  );
};
export default DeleteEvent;
