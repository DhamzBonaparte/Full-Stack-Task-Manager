import "./edit.scss";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Edit({
  editTask,
  setEditTask,
  editLoading,
  setEditLoading,
  edit,
  setEdit,
  isDone,
  setIsDone,
  getItems,
}) {
  const [update, setUpdate] = useState("");

  useEffect(() => {
    setUpdate(editTask?.task);
    setIsDone(editTask?.status === "done");
  }, [editTask]);

  async function handleUpdate() {
    try {
      await axios.patch(`http://localhost:3000/api/tasks/${editTask._id}`, {
        task: update,
        date: new Date().toISOString(),
        status: isDone ? "done" : "pending",
      });
    } catch (error) {
      console.log(error);
    }
    setEdit(false);
    getItems();
    setIsDone(false);
  }

  function handleChange() {
    setIsDone(!isDone);
  }

  function handleCancel() {
    setIsDone(false);
    setEdit(false);
  }
  console.log(isDone);
  return (
    <>
      <div
        className="edit"
        style={!edit ? { display: "none" } : { display: "block" }}
      >
        {editLoading ? (
          <h2>Loading edit menu...</h2>
        ) : (
          <>
            <div className="top">
              <p>Edit Task</p>
              <hr />
            </div>
            <div className="mid">
              <div className="task" key={editTask._id}>
                {editTask && (
                  <>
                    <label htmlFor="text">Your Task:</label>
                    <input
                      type="text"
                      id="text"
                      value={update}
                      onChange={(e) => setUpdate(e.target.value)}
                    />
                  </>
                )}
              </div>
              <p>Created on: {editTask?.date?.slice(0, 10)}</p>
              <p>Status: {editTask.status}</p>
              <div className="tog">
                {editTask && (
                  <>
                    <label htmlFor="check">Done</label>
                    <input
                      id="check"
                      type="checkbox"
                      checked={isDone}
                      onChange={() => setIsDone(!isDone)}
                    />
                  </>
                )}
              </div>
            </div>
            <div className="bottom">
              <button
                style={{ backgroundColor: "#4caf50" }}
                onClick={() => handleUpdate()}
              >
                Apply
              </button>
              <button
                style={{ backgroundColor: "#f44336" }}
                onClick={() => handleCancel()}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
