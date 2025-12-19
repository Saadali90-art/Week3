import { useEffect, useState } from "react";
import "./animation.css";
import TaskModal from "./Components/TaskModal";
import MoreInfo from "./Components/MoreInfo";
import Navigation from "./Components/Navigation";
import Tasks from "./Components/Tasks";

const TaskManager = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [userTasks, setUserTasks] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState(null);
  const [moreInfo, setMoreInfo] = useState(null);
  const [editModal, setEditModal] = useState(null);

  const filters = ["All", "Completed"];

  // === GETTING ALL OF THE TASKS
  const fetchTasks = async () => {
    try {
      let reqOpt = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };

      let result = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}gettasks`,
        reqOpt
      );

      if (result.ok) {
        let response = await result.json();
        setUserTasks(response.message);
        setFilteredTasks(response.message);
      } else {
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // === CREATING THE TASKS
  const handleSubmit = async (e) => {
    e.preventDefault();

    let userData = new FormData(e.target);
    let formEntry = Object.fromEntries(userData.entries());

    try {
      let reqOpt = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formEntry),
      };

      let result = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}addtask`,
        reqOpt
      );

      if (result.ok) {
        let response = await result.json();
        console.log(response);
        setShowModal(false);
        fetchTasks();
      } else {
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ========== COMPLETING FUCNTION
  const toggleComplete = async (item) => {
    try {
      let reqOpt = {
        method: "POST",
        body: JSON.stringify(item),
        headers: { "Content-Type": "application/json" },
      };

      let result = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}updatetasks`,
        reqOpt
      );

      if (result.ok) {
        let response = await result.json();
        fetchTasks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // DELETING FUNCTION
  const deleteitem = async (item) => {
    try {
      let reqOpt = {
        method: "DELETE",
        body: JSON.stringify(item),
        headers: { "Content-Type": "application/json" },
      };

      let result = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}deletetask`,
        reqOpt
      );

      if (result.ok) {
        let response = await result.json();
        fetchTasks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ======== FILTERING TASKS
  const filteringTask = (filterType) => {
    setActiveFilter(filterType);
    if (filteredTasks !== null && filterType === "Completed") {
      setFilteredTasks(filteredTasks.filter((task) => task.completed == true));
    } else {
      setFilteredTasks(userTasks);
    }
  };

  // ====== EDIT TASK
  const editTask = async (e) => {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(e.target);
    const taskData = Object.fromEntries(formData.entries());

    const dataObj = {
      id: editModal._id,
      task: taskData.task,
      description: taskData.description,
      date: taskData.date,
    };

    console.log(dataObj);

    try {
      // Prepare POST request
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataObj),
      };

      // Send data to backend
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}changetask`,
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();

        setEditModal(null);

        // Refresh task list
        fetchTasks();
      } else {
        console.error(
          "Failed to add task:",
          response.status,
          response.statusText
        );
      }
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  return (
    <main className="bg-[#F4F5FF] min-h-screen relative">
      <TaskModal
        handleSubmit={handleSubmit}
        showModal={showModal}
        setShowModal={setShowModal}
      />

      {editModal && (
        <div
          onClick={() => setEditModal(false)}
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[480px] bg-white rounded-xl shadow-xl p-6 animate-[fadeScaleIn_0.25s_ease-out_forwards]"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Update Task
                </h2>
                <p className="text-xs text-gray-500">
                  Modify task details below
                </p>
              </div>

              <button
                onClick={() => setEditModal(false)}
                className="text-gray-400 hover:text-red-500 text-xl transition"
              >
                x
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={editTask} className="space-y-4">
              {/* TITLE */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Task Title
                </label>
                <input
                  required
                  type="text"
                  name="task"
                  defaultValue={editModal?.task}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Edit task title"
                />
              </div>

              {/* DATE */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  required
                  type="date"
                  name="date"
                  defaultValue={editModal?.date}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  required
                  rows={4}
                  name="description"
                  defaultValue={editModal?.description}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Edit task description"
                />
              </div>

              {/* ACTION */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
                >
                  Update Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <MoreInfo moreInfo={moreInfo} setMoreInfo={setMoreInfo} />

      <Navigation setShowModal={setShowModal} />

      {/* ======= FILTERS  */}
      <section className="w-[97%] mx-auto flex gap-3 py-1">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => filteringTask(item)}
            className={`
            px-2 py-1.5 rounded-sm text-sm font-medium transition-all
            ${
              activeFilter === item
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }
          `}
          >
            {item}
          </button>
        ))}
      </section>

      {/* ==== TASKS =  */}

      {filteredTasks == null || filteredTasks.length < 1 ? (
        <div className="w-full flex flex-col items-center justify-center">
          <img src="/nodata.svg" className="w-[400px] h-[400px]" />
          <p className="text-sm font-semibold">
            No tasks found.{" "}
            <span
              className="text-blue-500 underline cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              Add your first task
            </span>
          </p>
        </div>
      ) : (
        <Tasks
          filteredTasks={filteredTasks}
          setMoreInfo={setMoreInfo}
          toggleComplete={toggleComplete}
          deleteitem={deleteitem}
          editTask={editTask}
          setEditModal={setEditModal}
        />
      )}
    </main>
  );
};

export default TaskManager;
