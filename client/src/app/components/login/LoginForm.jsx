"use client";

import Btn from "../Btn";

const LoginForm = () => {
  const handleSubmit = () => {};
  const handleChange = () => {};
  return (
    <div className="flex flex-col justify-center items-center w-full sm:w-[600px] p-10">
      <h1 className="text-4xl font-bold my-10">Welcome back!</h1>
      <form
        className="flex flex-col justify-center items-center w-full"
        onSubmit={handleSubmit}
      >
        {/* email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 field"
          //   value={form.email}
          onChange={handleChange}
        />

        {/* password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 field"
          //   value={form.password}
          onChange={handleChange}
        />
        <Btn type="submit" text={"Log In"} />
      </form>
    </div>
  );
};

export default LoginForm;
