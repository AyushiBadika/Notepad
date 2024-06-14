import { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import Note from "./components/Note";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

export default function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")).length === 0
      ? [{ title: "#Enter Title Here", content: "#Enter Title Here" }]
      : [...JSON.parse(localStorage.getItem("notes"))]
  );

  const [currentNote, setCurrentNote] = useState(0);
  const [value, setValue] = useState(notes[0].content);

  // useEffect(() => {
  //   setNotes(JSON.parse(localStorage.getItem("notes")));
  // }, []);

  useEffect(() => {
    notes[currentNote].title =
      notes[currentNote].content == ""
        ? "#Enter Text Here"
        : value.slice(0, 10) + "...";
    if (notes.length > 1) localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes, value]);

  useEffect(() => {
    setValue(notes[currentNote].content);
  }, [notes, currentNote]);

  const changeCurrent = (index) => {
    setCurrentNote(index);
  };

  const modifyCurrentNote = (value) => {
    const temp = notes;
    temp[currentNote].content = value;
    setNotes(temp);
  };
  const addNote = () => {
    setNotes([
      ...notes,
      { title: "#Enter Title Here", content: "#Enter Title Here" },
    ]);
    setCurrentNote(notes.length);
  };

  const deleteNote = (index) => {
    const tmp = notes;
    tmp.splice(index, 1);

    setNotes(tmp);
  };
  return (
    <div className="flex gap-8 w-full h-full">
      <div className="">
        <div className="flex gap-2  mb-4">
          <h1 className="text-3xl font-bold ">Add Notes</h1>
          <button onClick={addNote} className="text-blue-600">
            {" "}
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
        <MDEditor
          height="100%"
          value={value}
          onChange={(value) => {
            modifyCurrentNote(value);
            setValue(value);
          }}
        />
      </div>
    </div>
  );
}
