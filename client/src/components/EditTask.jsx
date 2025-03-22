import React, { useEffect, useState } from "react";
import axios from "axios";

const EditTask = ({setEditTaskDiv, editTaskId}) => {
  const [values, setValues] = useState({
    title: "",
    description: "",
    priority: "low",
    status: "yetToStart",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    const fetch = async () => {
        try {
            const res = await axios.get(
                `https://mern-task-manager-app-eiby.onrender.com/api/v1/getTask/${editTaskId}`,
                {
                    withCredentials:true,
                }
            )
            setValues(res.data.taskDetails);
        } catch(error){
            console.log(error)
        }
    }
    fetch();
  },[editTaskId])

  const editTask = async (e, id) => {
    e.preventDefault();

    try {
        const res = await axios.put(
          `https://mern-task-manager-app-eiby.onrender.com/api/v1/editTask/${id}`,
          values,
          { withCredentials: true }
        );
        console.log(res.data);
        alert(res.data.success);
        window.sessionStorage.clear("editTaskId")
        setEditTaskDiv("hidden")
        window.location.reload()
      } catch (error) {
        console.log(error)
        alert(error.response.data.error);
      }
  };

  const deleteTask = async (id) => {
    console.log("Deleting task with ID:", id);

    try {
        const res = await axios.delete(
          `https://mern-task-manager-app-eiby.onrender.com/api/v1/deleteTask/${id}`,
          { withCredentials: true }
        );
        console.log(res.data);
        alert(res.data.success);
        window.sessionStorage.clear("editTaskId")
        setEditTaskDiv("hidden")
        window.location.reload()
      } catch (error) {
        console.log(error)
        alert(error.response.data.error);
      }
  };

  return (
    <div className="bg-white rounded px-4 py-4 w-[40%]">
      <h1 className="text-center font-semibold text-xl ">Edit Task</h1>
      <hr className="mb-4 mt-2" />
      <form onSubmit={(e) => editTask(e,values._id)} className="flex flex-col gap-4">
        <input
          type="text"
          className="border px-2 py-1 rounded border-zinc-300 outline-none"
          placeholder="Title"
          name="title"
          value={values.title}
          onChange={handleChange}
        />
        <div className="flex items-center justify-between gap-4">
          <div className="w-full">
            <h3 className="mb-2">Select priority</h3>
            <select
              name="priority"
              id=""
              className="border px-2 py-1 rounded border-zinc-300 outline-none w-full"
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="w-full">
            <h3 className="mb-2">Select Status</h3>
            <select
              name="status"
              id=""
              className="border px-2 py-1 rounded border-zinc-300 outline-none w-full
                  "
              onChange={handleChange}
            >
              <option value="yetToStart">Yet to Start</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        <textarea
          className="border px-2 py-1 rounded border-zinc-300 outline-none h-[25vh]"
          name="description"
          placeholder="Description"
          id=""
          value={values.description}
          onChange={handleChange}
        ></textarea>
        <div className="flex items-center justify-between gap-4">
          <button
            className="w-full bg-blue-800 py-2 hover:bg-blue-700 transition-all duration-300 text-white rounded"
            type="submit"
          >
            Edit Task
          </button>
          <button
            type="button"
            className="w-full border border-red-600 py-2 hover:bg-red-100 transition-all duration-300 text-red-600 rounded"
            onClick={() => deleteTask(values._id)}
          >
            Delete
          </button>
          <button
            type="button"
            className="w-full border border-black py-2 hover:bg-zinc-100 transition-all duration-300 text-black rounded"
            onClick={(event) => {
                event.preventDefault();
                window.sessionStorage.clear("editTaskId");
                setEditTaskDiv("hidden")
            }}
          >
            Cancel
          </button>

        </div>
      </form>
    </div>
  );
};

export default EditTask;
