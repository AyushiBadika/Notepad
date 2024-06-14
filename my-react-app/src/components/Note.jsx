/* eslint-disable react/prop-types */
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
export default function Note({ title, deleteNote, index, changeCurrent }) {
  return (
    <div className="flex justify-between mb-4">
      <h3 className="text-lg">{title}</h3>
      <div className="flex gap-1">
        <button onClick={() => deleteNote(index)}>
          <DeleteIcon />
        </button>
        <button
          onClick={() => {
            changeCurrent(index);
          }}
        >
          <EditIcon />
        </button>
      </div>
    </div>
  );
}
