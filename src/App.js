import React from "react";
import "./App.css";
import uuid from "react-uuid";
import Editor from "./components/Editor";
import Sidebar from "./components/Sidebar";

function App() {
  const [notes, setNotes] = React.useState(
    JSON.parse(localStorage.notes) || []
  );
  const [activeNote, setActiveNote] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function onAddNote() {
    const newNote = {
      id: uuid(),
      title: "Untitled",
      body: "",
    };
    setNotes([newNote, ...notes]);
  }
  const onDeleteNote = (idToDelete) => {
    setNotes(notes.filter((note) => note.id !== idToDelete));
  };
  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };
  const onUpdateNote = (updatedNote) => {
    const updatedNotesArray = notes.map((note) => {
      if (note.id === activeNote) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArray);
  };
  return (
    <div className="app">
      <Sidebar
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Editor activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  );
}

export default App;
