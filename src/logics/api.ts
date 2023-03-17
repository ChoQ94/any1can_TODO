export const getTodoList = async () => {
  const response = await fetch("http://localhost:8000/api/tasks").then((res) =>
    res.json()
  );
  return response;
};

export const addTodoList = async (todoItem: string) => {
  const response = await fetch("http://localhost:8000/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: todoItem }),
  });

  return response;
};

export const deleteTodoList = async (todoID: string | number) => {
  const response = await fetch(`http://localhost:8000/api/tasks/${todoID}`, {
    method: "DELETE",
  });

  return response;
};
