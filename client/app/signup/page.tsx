const SignUp = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[60rem] h-screen flex flex-col gap-2  items-center">
        <div className="w-[40rem] h-[40rem] flex flex-col">
          <h1>Signup Page</h1>
          <form className="flex flex-col" method="POST" action="/user/signup">
            <label>name</label>
            <input
              type="text"
              required
              name="name"
              placeholder="enter your name"
            />
            <label>email</label>
            <input
              type="text"
              required
              name="email"
              placeholder="enter your email"
            />
            <label>password</label>
            <input
              type="text"
              required
              name="password"
              placeholder="enter your password"
            />
            <button className="cursor-pointer" type="submit">
              submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
