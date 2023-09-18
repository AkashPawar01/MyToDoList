"use client"
import React, { useState } from 'react';
// import { toast } from 'react-toastify';
import { ToastContainer, toast } from 'react-toastify';

export const page = () => {
  const [title, settitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setstatus] = useState("due");

  const [tasks, setTasks] = useState([]);

  const [activeTask, setActiveTask] = useState(null);

  const SubmitHandler = (event) => {
    event.preventDefault()

    // validation
    if (title.length < 5 || description.length < 15) {
      toast.error(
        "Title and description must be more then 5 and 15 characters respectively"
      );
      return;
    }

    const newtask = {
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
      title,
      description,
      status,
    }

    setTasks([...tasks, newtask])

    settitle("")
    setDescription("")
    setstatus("due")
    // const copytasks = [...tasks]
    // copytasks.push(newtask)
    // settasks(copytasks)
    // console.log(newtask);
  }
  const UpdateHandler = (index) => {
    const {title,description,status} = tasks[index];
    settitle(title);
    setDescription(description);
    setstatus(status);
    setActiveTask(index)
    // console.log(tasks[index])
  }
  const UpdateTask = (event) => {
    event.preventDefault();
    const copyTask = [...tasks];
    copyTask[activeTask] = {
      ...copyTask[activeTask],
      title, 
      description, 
      status
    };
    setTasks(copyTask);
    setActiveTask(null);
    settitle("");
    setDescription("");
    setstatus("due");
  }
  const DeleteHandler = (index) => {
    // const copytasks = [...tasks];
    // copytasks.splice(index, 1);
    // setTasks(copytasks);
    // console.log(index)
    setTasks(tasks.filter((t, i) => i !== index));
  }


  let taskslist = <h1 className='mt-5 w-100 text-center text-danger'>Loading....</h1>
  if (tasks.length > 0) {
    taskslist = tasks.map((task, index) => {
      return (
        <div key={index} className="card  mb-3 me-3" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 style={{color: "blue"}} className="card-title">{task.title}</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">
              {task.status}
            </h6>
            <p className="card-text">
              {task.description}
            </p>
            <button onClick={() => UpdateHandler(index)} className="me-2 btn btn-sm  btn-dark">
              Update Task
            </button>
            <button onClick={() => DeleteHandler(index)} className="btn btn-sm  btn-outline-danger">
              Delete Task
            </button>
          </div>
        </div>
      )
    })
  }
  return (
    <div className="mt-5 container p-5">
      <form className="w-50">
        <h2>Create Your Tasks</h2>
        <input
          onChange={(event) => settitle(event.target.value)}
          value={title}
          className="form-control mb-3"
          type="text"
          placeholder="Title"
        />
        <textarea
          onChange={(event) => { setDescription(event.target.value) }}
          value={description}
          className="form-control mb-3"
          placeholder="description here..."
        >

        </textarea>
        <select
          onChange={(event) => { setstatus(event.target.value) }}
          value={status}
          className="form-control mb-3"
        >
          <option value="due">Due</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        {activeTask === null ? (
        <button
          onClick={SubmitHandler}
          className="btn btn-primary" >
            Create Task
        </button> 
        ): (
        <button 
            onClick={UpdateTask} 
            className="btn btn-primary">
              Update Task
            </button>
          )}
        <hr />
      </form>
      <h2>Pending Tasks</h2>
      <div className="d-flex flex-wrap">
        {taskslist}
        {/* <div className="card  mb-3 me-3" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">
              Card subtitle
            </h6>
            <p className="card-text">
              Some quick example text to build on the card title
              and make up the bulk of the card's content.
            </p>
            <button className="me-2 btn btn-sm  btn-dark">
              Update Task
            </button>
            <button className="btn btn-sm  btn-outline-danger">
              Delete Task
            </button>
          </div>
        </div> */}
      </div>
      {/* {JSON.stringify(tasks)} */}
    </div>
  );
};

export default page;
