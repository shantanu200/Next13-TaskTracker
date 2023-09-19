"use client";
import { AddCircle } from "@mui/icons-material";
import TaskChip from "./common/TaskChip";
import { useState, ChangeEvent } from "react";
import axios from "axios";

interface PropsHeader {
  completed: number;
  tasks: number;
  due: number;
}

const Header: React.FC<PropsHeader> = (props) => {
  const { completed, tasks, due } = props;
  const [text, setText] = useState<string>("");

  const handleAdd = async () => {
    if (!text) {
      alert("Please enter title for todo");
      return;
    }

    try {
      const { data, status } = await axios.post(`http://localhost:3000/api`, {
        title: text,
      });

      if (status === 200) {
        window.location.reload();
      } else {
        console.error(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="h-2/5 bg-slate-800 w-full p-8">
      <div>
        <h1 className="text-white text-6xl">Create Task</h1>
      </div>
      <div className="my-8 flex flex-col items-center lg:flex-row">
        <input
          placeholder="Add task"
          className="bg-white p-4 border-black b-2 my-4 w-full lg:w-1/2"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value)
          }
        />
        <button
          className="bg-gray-600 p-4 w-full text-white  lg:mx-3 items-center lg:w-1/12"
          onClick={handleAdd}
        >
          <AddCircle sx={{ mr: 1 }} />
          Add
        </button>
      </div>

      <TaskChip tasks={tasks} completed={completed} due={due} />
    </div>
  );
};

export default Header;
