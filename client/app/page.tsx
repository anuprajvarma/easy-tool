"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Todo {
  id: string;
  email: string;
  title: string;
}

interface ApiResponse {
  success: boolean;
  redirectTo?: string;
  todo: Todo[];
  user: {
    email: string;
    name: string;
  };
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [todoChange, setTodoChange] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTodoList = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/todo", {
          credentials: "include",
        });
        const data: ApiResponse = await res.json();
        // console.log(`data ${data}`);

        if (data.success) {
          router.push(data.redirectTo);
        } else {
          setTodos(data.todo);
          setEmail(data.user.email);
          setName(data.user.name);
        }
      } catch (err) {
        console.error("Failed to fetch todo list:", err);
      }
    };

    fetchTodoList();
  }, [todoChange]);

  useEffect(() => {
    console.log("Updated todos:", todos);
  }, [todoChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(todoTitle);
    setTodoChange(!todoChange);
    const res = await fetch("http://localhost:5001/api/todo", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ todoTitle, email }).toString(),
    });
    const data = await res.json();
    // console.log(data.todo);
    setTodoTitle("");
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[40rem] h-screen flex flex-col gap-2 justify-center items-center">
        <div className="w-[30rem] h-[40rem] flex flex-col justify-center items-center">
          <div>
            <h1 className="text-center">{name} Todo-List</h1>
            <form className="flex justify-between" onSubmit={handleSubmit}>
              <input
                className="w-[14rem] bg-white text-black border border-gray-300"
                type="text"
                name="title"
                required
                value={todoTitle}
                onChange={handleChange}
              />
              <button className="cursor-pointer" type="submit">
                Add
              </button>
            </form>
            {todos.map((item, index) => {
              return <div key={index}>{item.title}</div>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
