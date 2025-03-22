import React, { useEffect, useState } from "react";
import Header from "../components/Dashboard/Header";
import AddTask from "../components/Dashboard/AddTask";
import StackTitle from "../components/Dashboard/StackTitle";
import YetToStart from "../components/Dashboard/YetToStart";
import InProgress from "../components/Dashboard/InProgress";
import Completed from "../components/Dashboard/Completed";
import axios from "axios";
import EditTask from "../components/EditTask";

const Dashboard = () => {
  const [addTaskDiv, setAddTaskDiv] = useState("hidden");
  const [tasks, setTasks] = useState();
  const [editTaskDiv, setEditTaskDiv] = useState("hidden")
  const [editTaskId,setEditTaskId] = useState()

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
     
        const res = await axios.get("https://mern-task-manager-app-eiby.onrender.com/api/v1/userDetails",{
            withCredentials:true,
          })
          console.log(res.data)
          setTasks(res.data.tasks)
        
      } catch(error) {
        console.log(error)
      } 
    }
    fetchUserDetails();
    if(window.sessionStorage.getItem("editTaskId")) {
      setEditTaskDiv("block")
      setEditTaskId(window.sessionStorage.getItem("editTaskId"))
    }
  },[addTaskDiv])
  //console.log(tasks)
  return (
    <div className="w-full relative">
      <div className="bg-white">
        <Header setAddTaskDiv={setAddTaskDiv} />
      </div>
      <div className="px-12 py-4 flex gap-12 bg:zin-100 min-h[89vh] max-h-auto">
        <div className="w-1/3 ">
          <StackTitle title={"Yet To Start"} />
          <div className="pt-2">
            {tasks && <YetToStart  task={tasks[0].yetToStart}/>}
          </div>
        </div>
        <div className="w-1/3 ">
          <StackTitle title={"In Progress"} />
          <div className="pt-2">
          {tasks && <InProgress  task={tasks[1].inProgress}/>}
          </div>
        </div>
        <div className="w-1/3 ">
          <StackTitle title={"Completed"} />
          <div className="pt-2">
          {tasks && <Completed  task={tasks[2].completed}/>}
          </div>
        </div> 
      </div>
      <div
        className={`w-full ${addTaskDiv} block h-screen fixed top-0 left-0 bg-zinc-800 opacity-85`}
      ></div>
      <div
        className={`w-full ${addTaskDiv} h-screen fixed top-0 left-0 flex items-center justify-center`}
      >
        <AddTask setAddTaskDiv={setAddTaskDiv} />
      </div>

      <div
        className={`w-full ${editTaskDiv} block h-screen fixed top-0 left-0 bg-zinc-800 opacity-85`}
      ></div>
      <div
        className={`w-full ${editTaskDiv} h-screen fixed top-0 left-0 flex items-center justify-center`}
      >
        <EditTask editTaskId={editTaskId} setEditTaskDiv={setEditTaskDiv} />
      </div>
    </div>
  );
};

export default Dashboard;
