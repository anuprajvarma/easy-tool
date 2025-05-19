"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import EditModal from "@/components/ui/dialog";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";

interface Todo {
  _id: string;
  email: string;
  title: string;
}

interface ApiResponse {
  success: boolean;
  redirectTo?: string;
  todo: Todo[];
  loginUser: {
    email: string;
    name: string;
  };
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [_id, setId] = useState<string>();
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [dialogTitle, setDialogTitle] = useState<string>("");
  const [todoChange, setTodoChange] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const session = useSession();

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  useEffect(() => {
    const fetchTodoList = async () => {
      console.log("run useEffect");
      try {
        const res = await fetch("http://localhost:5001/api/todo", {
          credentials: "include",
        });
        const data: ApiResponse = await res.json();
        console.log(`data ${data.loginUser}`);

        if (data.success) {
          router.push("/login");
        } else {
          setTodos(data.todo);
          setEmail(data.loginUser.email);
          setName(data.loginUser.name);
          console.log(`login user email ${data.loginUser.email}`);
          console.log(`login user name ${data.loginUser.name}`);
        }
      } catch (err) {
        console.error("Failed to fetch todo list:", err);
      }
    };

    fetchTodoList();
  }, [todoChange, router]);

  useEffect(() => {
    // console.log("Updated todos:", todos);
  }, [todoChange, todos]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(todoTitle);
    console.log(`email ${email}`);
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

  const deleteHandler = async (_id: string) => {
    const res = await fetch("http://localhost:5001/api/todo", {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ _id }).toString(),
    });
    const data = await res.json();
    // console.log(data);
    if (data) {
      setTodoChange(!todoChange);
    }
  };

  const editHandler = async () => {
    if (!_id) {
      console.error("ID is undefined");
      return;
    }

    close();
    const res = await fetch("http://localhost:5001/api/todo", {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        _id: _id,
        dialogTitle: dialogTitle,
      }).toString(),
    });
    const data = await res.json();
    // console.log(data);
    if (data) {
      setTodoChange(!todoChange);
    }
  };

  const dialogHandler = (title: string, _id: string) => {
    setDialogTitle(title);
    setId(_id);
    open();
  };

  const handleSignout = async () => {
    await signOut();
    console.log("sing out");
    const res = await fetch("http://localhost:5001/api/auth/signout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const data = await res.json();
    // console.log(data);
    if (data.success) {
      router.push(data.redirectTo);
    }
  };

  // console.log(email);
  // console.log(session.status);

  // if (session.status === "unauthenticated" && email === "loading") {
  //   router.push("/login");
  // }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[40rem] h-screen flex flex-col gap-2 justify-center items-center">
        <div className="w-[30rem] h-[40rem] flex flex-col justify-center items-center">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <h1 className="text-center">
                {name}
                Todo-List
              </h1>
              {session.status === "authenticated" ? (
                <button onClick={handleSignout}>sign out</button>
              ) : (
                <button onClick={handleSignout}>sign out</button>
              )}
            </div>
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
                    <p>{item.title}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="cursor-pointer"
                      onClick={() => dialogHandler(item.title, item._id)}
                    >
                      Edit
                    </button>
                    <Dialog
                      open={isOpen}
                      as="div"
                      className="relative z-10 focus:outline-none"
                      onClose={close}
                      __demoMode
                    >
                      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                          <DialogPanel
                            transition
                            className="w-[60rem] rounded-xl bg-amber-800 p-6 duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                          >
                            <DialogTitle
                              as="h3"
                              className="text-base/7 font-medium text-black"
                            >
                              Edit Title
                            </DialogTitle>
                            <div className="mt-4 flex gap-4">
                              <input
                                value={dialogTitle}
                                onChange={(e) => setDialogTitle(e.target.value)}
                                className="mt-3 block w-[30rem] rounded-lg border border-black px-3 py-1.5 text-sm/6 text-black"
                              />
                              <button onClick={() => editHandler()}>
                                Edit
                              </button>
                            </div>
                          </DialogPanel>
                        </div>
                      </div>
                    </Dialog>
                    <button
                      className="cursor-pointer"
                      onClick={() => deleteHandler(item._id)}
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
