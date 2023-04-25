import React from "react";
import Home from "@/screen/home/home";
import { getTodoList } from "@/logics/api";

export default function HomePage(props: any) {
  return <Home {...props} />;
}

export const getServerSideProps = async () => {
  let todoList = null;
  const today = new Date();
  const dateFormat =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1 < 9
      ? "0" + (today.getMonth() + 1)
      : today.getMonth() + 1) +
    "-" +
    (today.getDate() < 9 ? "0" + today.getDate() : today.getDate());
  try {
    const data = await getTodoList(dateFormat);

    if (data) {
      todoList = data;
    } else {
      todoList = [];
    }
  } catch (err) {
    console.log(err);
    todoList = [];
  }

  return {
    props: {
      todoList,
    },
  };
};
