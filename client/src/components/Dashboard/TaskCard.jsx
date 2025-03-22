import React from "react";

const TaskCard = ({ data }) => {
  const showEditDiv = (e,id) => {
    e.preventDefault();
    window.sessionStorage.setItem("editTaskId", id);
    window.location.reload();
  }

  const priority = data.priority === "low" ? "text-green-500 bg-green-100": 
  data.priority==="medium" ? "text-yellow-500 bg-yellow-100" : "text-red-500 bg-red-100" 
  return (
    <button className="bg-gray-100 rounded px-4 w-[100%] py-2 hover:shadow transition-all duration-300" onClick={(event) => showEditDiv(event,data._id)}>
       <div className="flex items-center justify-between">
          <h1 className="">{data.title}</h1>
          <div className={`text-sm ${priority} px-2 rounded-full`}>
            <p>{data.priority}</p>
          </div>
       </div>
       <hr className="my-2" />
       <p className="text-sm text-zinc-500 text-start">{data.description}</p>
    </button>
  )
}
          

export default TaskCard;
