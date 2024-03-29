"use client";
import { useState } from "react";
import Btn from "../../Btn";
import { fetchLogin } from "@/app/lib/data";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/redux/hooks";
import { actionMsg } from "@/app/redux/features/message/MessageSlice";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const formData = {
    email: "",
    password: "",
  };
  const router = useRouter();
  const [form, setForm] = useState(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // verify the user account
    const loginRef = await fetchLogin(form);

    // send the login messages to parent component
    dispatch(actionMsg(loginRef.message));

    // if it loged in succeccfully refresh the form and redirect to home page
    if (loginRef.user) {
      localStorage.setItem("user", JSON.stringify(loginRef.user));
      setForm(formData);
      window.dispatchEvent(new Event("storage"));
      router.push("/");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col justify-center items-center w-full sm:w-[500px] p-10">
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
          className="w-full field"
          value={form.email}
          onChange={handleChange}
        />

        {/* password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full field"
          value={form.password}
          onChange={handleChange}
        />
        <Btn type="submit" text={"Log In"} />
      </form>
    </div>
  );
};

export default LoginForm;
