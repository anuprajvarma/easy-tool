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
  }, [todoChange, router]);

  useEffect(() => {
    console.log("Updated todos:", todos);
  }, [todoChange, todos]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(todoTitle);
    const res = await fetch("http://localhost:5001/api/todo", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ todoTitle, email }).toString(),
    });
    const data = await res.json();
    setTodoTitle("");
    if (data) {
      setTodoChange(!todoChange);
    }
  };

  const deleteHandler = async (title) => {
    const res = await fetch("http://localhost:5001/api/todo", {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ title, email }).toString(),
    });
    const data = await res.json();
    if (data.todo.acknowledged) {
      setTodoChange(!todoChange);
    }
  };

  const editHandler = () => {
    console.log("edit");
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
              return (
                <div key={index} className="flex justify-between gap-2">
                  <div className="flex gap-2">
                    <input type="checkbox" />
                    <p>{item.title}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="cursor-pointer" onClick={editHandler}>
                      Edit
                    </button>
                    <button
                      className="cursor-pointer"
                      onClick={() => deleteHandler(item.title)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
