import React from "react";
import Home from "@/screen/home/home";
import { getTodoList } from "@/logics/api";

export default function HomePage(props: any) {
  return <Home {...props} />;
}

export const getServerSideProps = async () => {
  let todoList = null;
  try {
    const data = await getTodoList();

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
