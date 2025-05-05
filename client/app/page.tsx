"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  useEffect(() => {
    fetch("http://localhost:5001/api/todolist")
      .then((res) => res.json())
      .then((data) => setName(data.message));
  }, []);
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[40rem] h-screen flex flex-col gap-2 justify-center items-center">
        <div className="w-[30rem] h-[40rem] flex flex-col justify-center items-center">
          <div>
            <h1 className="text-center">{name} Todo-List</h1>
            <form className="flex justify-between">
              <input
                className="w-[14rem] bg-gray-700 text-white"
                type="search"
                name="search"
                required
              />
              <button>Add</button>
            </form>
            <div className="p-2 flex gap-2">
              <input type="checkbox" name="checkbox" />
              <p>complete learning nextjs 15</p>
              <button>edit</button>
            </div>
            <hr />
            <div className="p-2 flex gap-2">
              <input type="checkbox" name="checkbox" />
              <p>deleted todos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
