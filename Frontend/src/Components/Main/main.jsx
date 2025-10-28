import axios from "axios";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Edit from "../Edit/edit";
import "./main.scss";

export default function Main() {
  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [now, setNow] = useState("");

  const [editTask, setEditTask] = useState([]);
  const [editLoading, setEditLoading] = useState(false);
  const [isDone,setIsDone]=useState(false);

  useEffect(() => {
    getItems();
  }, []);


  console.log(editTask);

  const getItems = async () => {
    setLoading(true);
    try {
      const values = await axios.get(`${import.meta.env.VITE_API_URL}/api/tasks`);
      setTask(values.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  function handleChange(task) {
    setNow(task);
  }

  async function handleAdd() {
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/tasks`, {
        task: now,
      });
      setNow("");
      getItems();
    } catch (err) {
      console.log(err);
    }finally{
        setLoading(false);
    }
  }

  async function handleDelete(id) {
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`);
    getItems();
  }

  async function handleEdit(id) {
    setEdit(true);
    setEditLoading(true);
    try {
      const value = await axios.get(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`);
      setEditTask(value.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setEditLoading(false);    
    }
  }

  console.log( editTask);
  return (
    <>
      <div
        className="body"
        style={edit ? { filter: "blur(5px)" } : { filter: "blur(0px)" }}
      >
        <div className="main">
          <div className="title">
            <p>Task Manager</p>
          </div>
          <div className="add">
            <input
              type="text"
              placeholder="Enter Task..."
              value={now}
              onChange={(e) => handleChange(e.target.value)}
            />
            <button className="button" onClick={() => handleAdd()}>
              <AddIcon className="icon"></AddIcon>
            </button>
          </div>
          {loading ? (
            <h3>Loading your tasks...</h3>
          ) : (
            <div className="tasks">
              <ul type="none">
                {task.map((tasks) => {
                  return (
                    <div className="task" key={tasks._id}>
                      <li><p style={tasks.status==="done"?{textDecoration:"line-through",color:"gray"}:{textDecoration:"none"}}>{tasks.task}</p></li>
                      <div className="buttons">
                        <button
                          className="button"
                          onClick={() => handleEdit(tasks._id)}
                        >
                          <EditIcon className="icon" />
                        </button>
                        <button
                          className="button"
                          onClick={() => handleDelete(tasks._id)}
                        >
                          <DeleteIcon className="icon"></DeleteIcon>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
      <Edit
        editTask={editTask}
        setEditTask={setEditTask}
        editLoading={editLoading}
        setEditLoading={setEditLoading}
        edit={edit}
        setEdit={setEdit}
        isDone={isDone}
        setIsDone={setIsDone}
        getItems={getItems}
      />
    </>
  );
}
