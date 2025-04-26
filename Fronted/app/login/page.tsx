export default function LogIn() {
  return (
    <div className="w-screen h-screen bg-background flex justify-center">
      <div className="w-[30rem] bg-background flex items-center justify-center">
        <div className="w-[25rem] h-[30rem] bg-CardBackground flex justify-center items-center">
          <div className="h-[15rem] w-[15rem] flex flex-col gap-8">
            <h1 className="text-4xl text-center">Login</h1>
            <div className="flex flex-col gap-2">
              <label>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="border border-amber-100"
              />
              <label>Password</label>
              <input
                type="password"
                id="pwd"
                name="pwd"
                className="border border-amber-100"
              />
              <input type="submit" value="Submit" className="cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
