export const getTodoList = async () => {
  const response = await fetch("http://localhost:8000/api/tasks").then((res) =>
    res.json()
  );
  return response;
};
