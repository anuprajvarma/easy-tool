export default function HomePage() {
  return (
    <div className="w-screen h-screen bg-background flex justify-center">
      <div className="w-[30rem] bg-background flex justify-center items-center">
        <div className="w-[15rem] h-[40rem] flex flex-col gap-4">
          <div className="flex flex-col gap-2 text-center items-center">
            <h1 className="text-4xl">Todo List</h1>
            <div className="flex gap-2 w-full">
              <input
                type="text"
                id="task"
                name="task"
                className="border border-amber-100"
              />
              <input type="submit" value="Submit" className="cursor-pointer" />
            </div>
          </div>
          <div>
            <div>alfjlasfjs</div>
            <div>alfjlasfjs</div>
            <div>alfjlasfjs</div>
            <div>alfjlasfjs</div>
          </div>
        </div>
      </div>
    </div>
  );
}
