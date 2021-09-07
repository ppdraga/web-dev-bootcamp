import React, { useState } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from './CreateArea';
// import notes from '../notes';

function App() {
  const [notes, setNotes] = useState([]);
  let totalNotes = 0;

  function addNote(note) {
    
    note.key = totalNotes;
    note.id = totalNotes;
    console.log(note);
    setNotes((prevValue) => [...prevValue, note]);
    totalNotes++;
  }

  // function delNote() {

  // }

  

  return (
    <div>
      <Header />
      <CreateArea addNote={addNote}/>
      {notes.map(note => <Note key={note.key} title={note.title} content={note.content} />)}
      <Footer />
    </div>
  );
}

export default App;
