export const getTodoList = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/tasks").then(
      (res) => res.json()
    );
    return response;
  } catch (err) {
    return {};
  }
};

export const addTodoList = async (todoItem: string) => {
  try {
    const response = await fetch("http://localhost:8000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: todoItem }),
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodoList = async (todoID: string | number) => {
  try {
    const response = await fetch(`http://localhost:8000/api/tasks/${todoID}`, {
      method: "DELETE",
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};
