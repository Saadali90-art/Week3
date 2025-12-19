import React from "react";
import bgimg from "/gradient.jpg";
import "../animation.css";

const Navigation = ({ setShowModal }) => {
  return (
    <nav className="w-[97%] mx-auto flex h-[70px] items-center gap-x-2.5 justify-between">
      <div className="flex gap-x-2.5 ">
        <img src="/task.png" className="w-[40px] h-[40px] " />
        <h3
          className="font-[620] text-[1.5rem] text-transparent bg-clip-text bg-cover pb-2.5"
          style={{
            backgroundImage: `url(${bgimg})`,
            animation: "mover 11s linear infinite", // 🔥 smoother
          }}
        >
          Task Manager
        </h3>
      </div>

      <div>
        <button
          className="bg-blue-500 text-white rounded-md px-2.5 py-[7px] font-normal text-[15px] hover:bg-white outline-2 outline-transparent hover:outline-blue-500 hover:text-blue-500  transition cursor-pointer hover:font-semibold font-500"
          style={{ fontFamily: "Ubuntu, sans-serif" }}
          onClick={() => setShowModal(true)}
        >
          Add Task
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
