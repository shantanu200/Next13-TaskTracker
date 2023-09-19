"use client";
import Header from "./components/Header";
import { connectDatabase } from "./config/mongo";
import TodoList, { ITodo } from "./components/TodoList";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@mui/material";

const LoadingSkeleton = () => {
  return (
    <div className="p-8">
      <Skeleton variant={"rectangular"} height={90} className="my-2" />
      <Skeleton variant={"rectangular"} height={90} className="my-2" />
      <Skeleton variant={"rectangular"} height={90} className="my-2" />
    </div>
  );
};

export default function Home() {
  const [completedTodos, setCompletedTodos] = useState<ITodo[]>([]);
  const [notCompletedTodos, setNotCompletedTodos] = useState<ITodo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchTodos() {
      try {
        setLoading(true);
        const { data, status } = await axios.get(`http://localhost:3000/api/`);

        if (status == 200) {
          console.log(data.todos);
          setCompletedTodos(data.todos[0].completed);
          setNotCompletedTodos(data.todos[1].notCompleted);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    }
    fetchTodos();
  }, []);

  return (
    <main className="w-full h-screen flex flex-col">
      <Header
        completed={completedTodos.length}
        due={0}
        tasks={completedTodos.length}
      />
      {loading ||
      completedTodos.length < 0 ||
      notCompletedTodos.length < 0 ? (
        <LoadingSkeleton />
      ) : (
        <section className="p-8">
          <div>
            <h1 className="text-2xl font-bold">Completed Todos</h1>
            {completedTodos.map((todo, index) => (
              <TodoList
                key={index}
                _id={todo._id}
                title={todo.title}
                createdAt={todo.createdAt}
                isCompleted={todo.isCompleted}
              />
            ))}
          </div>
          <div className="my-16">
            <h1 className="text-2xl font-bold">InCompleted Todos</h1>
            {notCompletedTodos.map((todo, index) => (
              <TodoList
                key={index}
                _id={todo._id}
                title={todo.title}
                createdAt={todo.createdAt}
                isCompleted={todo.isCompleted}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
