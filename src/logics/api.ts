export const getTodoList = async () => {
  const response = await fetch("http://localhost:8000/api/tasks")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
};
