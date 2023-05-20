export const dateConverter = (changeStack: number) => {
  const today = new Date();
  const date = new Date(today.setDate(today.getDate() + changeStack));
  const dateFormat =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1 < 9
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    "-" +
    (date.getDate() < 9 ? "0" + date.getDate() : date.getDate());

  return dateFormat;
};
