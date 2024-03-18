"use client";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "./redux/hooks";

export default function Home() {
  const user = useAppSelector((state) => state.authReducer.value);
  const dispatch = useAppDispatch();
  console.log(user);
  return <main></main>;
}
