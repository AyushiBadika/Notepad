import { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import Note from "./components/Note";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

export default function App() {
  const [notes, setNotes] = useState([
    { title: "#Enter Title Here", content: "#Enter Title Here" },
  ]);

  const [currentNote, setCurrentNote] = useState(0);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("notes")) != null) {
      setNotes(JSON.parse(localStorage.getItem("notes")));
      if (notes.length > 0) setValue(notes[0].content);
    } else {
      notes[currentNote].title =
        notes[currentNote].content === ""
          ? "#Enter Text Here"
          : value.slice(0, 10) + "...";
      setValue(notes[0].content);
    }
  }, []);

  useEffect(() => {
    console.log("Delete updated");
    if (notes.length > 0) localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes, value]);

  useEffect(() => {
    if (currentNote !== null) {
      setValue(notes[currentNote].content);
    } else {
      setValue("");
    }
  }, [notes, currentNote]);

  const changeCurrent = (index) => {
    setCurrentNote(index);
  };

  const modifyCurrentNote = (value) => {
    const temp = [...notes];
    temp[currentNote].content = value;
    temp[currentNote].title =
      value === "" ? "#Enter Text Here" : value.slice(0, 10) + "...";
    setNotes(temp);
  };

  const addNote = () => {
    const newNote = {
      title: "#Enter Title Here",
      content: "#Enter Title Here",
    };
    setNotes([...notes, newNote]);
    setCurrentNote(notes.length);
  };

  const deleteNote = (index) => {
    const temp = [...notes];
    temp.splice(index, 1);
    setNotes(temp);

    if (temp.length === 0) {
      setCurrentNote(null);
      setValue("");
    } else if (currentNote === index) {
      setCurrentNote(0);
    } else if (currentNote > index) {
      setCurrentNote(currentNote - 1);
    }
  };

  return (
    <div className="flex gap-8 w-full h-full">
      <div className="">
        <div className="flex gap-2 mb-4">
          <h1 className="text-3xl font-bold">Add Notes</h1>
          <button onClick={addNote} className="text-blue-600">
            <ControlPointIcon fontSize="large" />
          </button>
        </div>
        {notes.map((item, index) => (
          <Note
            title={item.title}
            index={index}
            key={index}
            deleteNote={deleteNote}
            changeCurrent={changeCurrent}
          />
        ))}
      </div>
      <div className="grow h-full">
        {currentNote !== null && (
          <MDEditor
            height="100%"
            value={value}
            onChange={(value) => {
              modifyCurrentNote(value);
              setValue(value);
            }}
          />
        )}
      </div>
    </div>
  );
}
