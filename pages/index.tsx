import React from "react";
import Home from "@/screen/home/home";
import { getTodoList } from "@/logics/api";

export default function HomePage(props: any) {
  return <Home {...props} />;
}

export const getServerSideProps = async () => {
  let todoList = [];
  try {
    const { data } = await getTodoList();
    todoList = data;
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      todoList,
    },
  };
};
