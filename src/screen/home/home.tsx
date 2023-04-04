import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "src/screen/home/styles.module.scss";
import back from "public/assets/image/background.png";
import Input from "@mui/joy/Input";
import { Checkbox, IconButton } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@/components/Button/button";
import Typo from "@/components/Typo";
import { MONTH_WORDS } from "@/constants/common";
import { addTodoList, deleteTodoList, getTodoList } from "@/logics/api";
import Snackbar from "@/components/Snackbar/snackbar";

interface DateProps {
  year: number | string;
  month: number | string;
  day: number | string;
}

interface Props {
  todoList: any;
}

export default function Home(props: Props) {
  const { todoList } = props;
  const [text, setText] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [dialogText, setDialogText] = useState<string>("");
  const [list, setList] = useState(todoList);
  const [selectedDate, setSelectedDate] = useState<DateProps>({
    year: "",
    month: "",
    day: "",
  });
  const today = new Date();

  const clear = async () => {
    if (text.length === 0) return;
    if (todoList?.length >= 7) {
      setDialogText("7개 이상은 불가해요");
      setOpenDialog(true);
      setText("");
      return;
    }

    if (todoList?.includes(text)) {
      setDialogText("동일한 항목이 이미 있어요");
      setOpenDialog(true);
      setText("");
      return;
    }
    await addTodoList(text);
    const res = await getTodoList();
    setList(res);
    setText("");
  };

  const clearByEnter = (e: any) => {
    if (e.keyCode == 13) {
      clear();
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenDialog(false);
  };

  const deleteItem = async (item: string | number) => {
    await deleteTodoList(item);

    const data = await getTodoList();
    setList(data);
  };

  useEffect(() => {
    const today = new Date();
    getTodoList();
    setSelectedDate({
      year: today.getFullYear(),
      month: MONTH_WORDS[today.getMonth()],
      day: today.getDate(),
    });
  }, []);

  return (
    <div className={styles.back}>
      <Image src={back} fill alt="메인 배경 이미지" style={{ zIndex: -99 }} />
      <div className={styles.mainTable}>
        <div className={styles.title}>
          <Typo bold>TODO LIST ANYONE CAN DO</Typo>
        </div>
        <div className={styles.date}>
          <Typo fontSize={50} bold>
            {selectedDate.month} {selectedDate.day}, {selectedDate.year}
          </Typo>
          <Typo fontSize={30} bold>
            {today.toDateString().split(" ")[0]}
          </Typo>
        </div>
        <div className={styles.input}>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="오늘 나는.."
            variant="outlined"
            onKeyDown={(e) => clearByEnter(e)}
            endDecorator={
              <Button
                sx={{ border: "1px solid white" }}
                variant="solid"
                color="primary"
                onClick={clear}
              >
                +
              </Button>
            }
          />
        </div>
        <div className={styles.divider} />
        <div className={styles.todoListContainer}>
          {list?.map((item: any) => (
            <div className={styles.todoItem} key={item._id}>
              <Checkbox variant="outlined" />
              <div className={styles.itemContainer}>{item.title}</div>

              <IconButton
                sx={{ marginTop: "-7px" }}
                onClick={() => {
                  deleteItem(item._id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          {list?.length === 0 && (
            <div className={styles.noList}>
              <Typo fontSize={20} bold>
                {" "}
                No List
              </Typo>
            </div>
          )}
        </div>
      </div>
      <Snackbar
        open={openDialog}
        onClose={handleClose}
        dialogText={dialogText}
      />
    </div>
  );
}
