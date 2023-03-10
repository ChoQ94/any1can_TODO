import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "src/screen/home/styles.module.scss";
import back from "public/assets/image/background.png";
import { Alert, Snackbar, Typography } from "@mui/material";
import Input from "@mui/joy/Input";
import { Checkbox, IconButton } from "@mui/joy";
import MenuIcon from "@mui/icons-material/Menu";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@/components/Button/button";
import Typo from "@/components/Typo";
import { MONTH_WORDS } from "@/constants/common";

interface DateProps {
  year: number | string;
  month: number | string;
  day: number | string;
}

export default function Home() {
  const [text, setText] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [dialogText, setDialogText] = useState<string>("");
  const [todoList, setTodoList] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<DateProps>({
    year: "",
    month: "",
    day: "",
  });
  const today = new Date();

  const clear = () => {
    if (todoList.length >= 7) {
      setDialogText("7개 이상은 불가해요");
      setOpenDialog(true);
      setText("");
      return;
    }

    if (todoList.includes(text)) {
      setDialogText("동일한 항목이 이미 있어요");
      setOpenDialog(true);
      setText("");
      return;
    }
    setTodoList([...todoList, text]);
    setText("");
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

  const deleteItem = (e: any) => {
    setTodoList(todoList.filter((item) => e !== item));
  };

  useEffect(() => {
    const today = new Date();
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
          {todoList?.map((item) => (
            <div className={styles.todoItem} key={item}>
              <Checkbox variant="outlined" />
              <div className={styles.itemContainer}>{item}</div>

              <IconButton sx={{ marginTop: "-7px" }} onClick={() => {}}>
                <EditIcon />
              </IconButton>
              <IconButton
                sx={{ marginTop: "-7px" }}
                onClick={() => {
                  deleteItem(item);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          {todoList.length === 0 && (
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
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openDialog}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert severity="error">{dialogText}</Alert>
      </Snackbar>
    </div>
  );
}
