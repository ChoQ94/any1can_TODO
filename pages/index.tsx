import React from "react";
import Home from "@/screen/home/home";
import { getTodoList } from "@/logics/api";

export default function HomePage(props: any) {
  return <Home {...props} />;
}

export const getServerSideProps = async () => {
  const { data: todoList } = await getTodoList();

  return {
    props: {
      todoList,
    },
  };
};
