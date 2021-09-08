import React, { useState } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from './CreateArea';
// import notes from '../notes';

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(note) {
    console.log(note);
    setNotes((prevValue) => [...prevValue, note]);
  }

  function delNote(id) {
    setNotes((prevValue) => {
      return prevValue.filter((note, idx) => {
        return idx !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea addNote={addNote}/>
      {notes.map((note, idx) => <Note key={idx} id={idx} title={note.title} content={note.content} onDelete={delNote}/>)}
      <Footer />
    </div>
  );
}

export default App;
