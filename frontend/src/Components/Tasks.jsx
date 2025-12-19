const Tasks = ({
  filteredTasks,
  setMoreInfo,
  toggleComplete,
  deleteitem,
  editTask,setEditModal
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-[15px] mt-[20px]">
      {filteredTasks.map((item) => (
        <div
          key={item._id}
          className="w-[48%] bg-white rounded-lg shadow-lg p-4 flex flex-col justify-between hover:shadow-xl transition hover:scale-102 transition duration-550 cursor-pointer"
        >
          <div onClick={() => setMoreInfo(item)}>
            <h3 className="text-md font-semibold mb-2 text-black/85">
              {item.task.charAt(0).toUpperCase() + item.task.slice(1)}
            </h3>
            <p
              className="text-gray-600 text-[0.79rem]"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {item.description}
            </p>

            <p className="text-sm font-[500] mt-[7px]">
              Due Date :{" "}
              <span className="text-black/85 font-[400]">{item.date}</span>
            </p>
          </div>

          <div className="flex justify-end gap-x-[6px] mt-4">
            <button
              className="px-2 py-1 rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition"
              onClick={() => setEditModal(item)}
            >
              Edit
            </button>

            <button
              onClick={() => toggleComplete(item)}
              className={`px-2 py-1 rounded-md text-sm font-medium transition ${
                item.completed
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {item.completed ? "Completed" : "Complete"}
            </button>

            <button
              onClick={() => deleteitem(item)}
              className="px-2 py-1 rounded-md text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tasks;
