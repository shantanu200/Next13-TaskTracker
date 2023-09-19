import { Chip } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Verified, EditNote } from "@mui/icons-material";

export interface ITodo {
  _id: string;
  title: string;
  createdAt: string;
  isCompleted: boolean;
}

const TodoList: React.FC<ITodo> = (props) => {
  const { _id, title, createdAt, isCompleted } = props;
  const [updateID, setUpdateID] = useState<string>("");
  const [updatedText, setUpdatedText] = useState<string>("");

  const apiCall = async (id: string, isCompleted: boolean) => {
    try {
      const { data, status } = await axios.put(`http://localhost:3000/api`, {
        id: id,
        title: updatedText,
        isCompleted,
      });

      if (status === 200) {
        window.location.reload();
      } else {
        alert("Error occurred on runtime");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateTodo = async (
    id: string,
    isCompleted: boolean,
    isComplete: boolean
  ) => {
    if ((updateID && updateID.length > 0) || isComplete) {
      await apiCall(id, isCompleted);
      setUpdateID("");
      setUpdatedText("");
    } else {
      setUpdateID(id);
      setUpdatedText(title);
    }
  };

  return (
    <div className="border-2 p-4 my-2 flex justify-between items-center">
      {_id === updateID ? (
        <input
          className="border-2 p-4 focus:outline-none flex flex-1 mr-4"
          value={updatedText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUpdatedText(e.target.value)
          }
        />
      ) : (
        <div>
          <h3 className="text-xl my-1 font-bold capitalize">{title}</h3>
          <Chip
            label={`${new Date(createdAt).toLocaleString()}`}
            className="my-1 bg-slate-600 text-white"
          />
        </div>
      )}
      <div>
        <button
          className={`border-2 p-4 ${
            _id === updateID
              ? "bg-white text-slate-800 border-slate-800"
              : "bg-slate-800 text-white border-slate-800"
          }`}
          onClick={() => updateTodo(_id, isCompleted, false)}
        >
          <EditNote />
          Update
        </button>
        <button
          className={`border-2 p-4  ${
            isCompleted
              ? "bg-slate-800 text-white"
              : "bg-white text-slate-800 border-slate-800 mx-2 hover:bg-slate-800 hover:text-white duration-300 ease-in-out"
          }`}
          onClick={() => updateTodo(_id, true, true)}
        >
          <Verified className="mx-2" />
          {isCompleted ? "Completed Task" : "Mark as Complete"}
        </button>
      </div>
    </div>
  );
};

export default TodoList;
