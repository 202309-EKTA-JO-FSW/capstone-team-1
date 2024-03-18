"use client";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "./redux/hooks";

export default function Home() {
  const isLogin = useAppSelector((state) => state.authReducer.value);
  const dispatch = useAppDispatch();
  console.log(isLogin);
  return <main></main>;
}
