import React, {useState} from "react";

function CreateArea(props) {
  const [note, setNote] = useState({title: "", content: ""});

  function onChange(event) {
    const {name, value} = event.target;
    setNote(prevValue => {
        return {
            ...prevValue,
            [name]: value
        }
    });
  }

  function submitNote(event) {
    event.preventDefault();
    props.addNote(note);
    setNote({title: "", content: ""});
  }

  return (
    <div>
      <form>
        <input onChange={onChange} name="title" placeholder="Title" value={note.title} />
        <textarea onChange={onChange} name="content" placeholder="Take a note..." rows="3" value={note.content} />
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;