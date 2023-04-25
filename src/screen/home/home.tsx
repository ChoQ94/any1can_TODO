import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "src/screen/home/styles.module.scss";
import back from "public/assets/image/background.png";
import { IconButton } from "@mui/joy";
import Button from "@/components/core/Button/button";
import Typo from "@/components/core/Typo";
import { KEYBOARD_ENTER, MAIN_TITLE, MONTH_WORDS } from "@/constants/common";
import { addTodoList, deleteTodoList, getTodoList } from "@/logics/api";
import Snackbar from "@/components/core/Snackbar/snackbar";
import Textfield from "@/components/core/Textfield";
import ListContainer from "@/components/module/ListContainer";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { DateProps } from "@/types/common";

interface Props {
  todoList: any;
}

const CLICK_FORWARD_BUTTON = "forward";

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
    date: "",
  });
  const [dateChangeStack, setDateChangeStack] = useState(0);

  const clear = async () => {
    if (text.length === 0) return;
    // if (todoList && todoList?.length >= 7) {
    //   setDialogText("7개 이상은 불가해요");
    //   setOpenDialog(true);
    //   setText("");
    //   return;
    // }

    // if (todoList && todoList?.includes(text)) {
    //   setDialogText("동일한 항목이 이미 있어요");
    //   setOpenDialog(true);
    //   setText("");
    //   return;
    // }
    const today = new Date();
    const newDate = new Date(today.setDate(today.getDate() + dateChangeStack));
    const dateFormat =
      newDate.getFullYear() +
      "-" +
      (today.getMonth() + 1 < 9
        ? "0" + (today.getMonth() + 1)
        : today.getMonth() + 1) +
      "-" +
      (today.getDate() < 9 ? "0" + today.getDate() : today.getDate());
    await addTodoList(text);
    console.log(dateFormat);
    const res = await getTodoList(dateFormat);
    setList(res);
    setText("");
  };

  const clearByEnter = (e: any) => {
    if (e.keyCode === KEYBOARD_ENTER) {
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

  const changeDate = async (move: string) => {
    if (move === CLICK_FORWARD_BUTTON) {
      setDateChangeStack(dateChangeStack + 1);
    } else {
      setDateChangeStack(dateChangeStack - 1);
    }
  };

  const getNew = async (dateFormat: any) => {
    const res = await getTodoList(dateFormat);
    setList(res);
  };

  useEffect(() => {
    const today = new Date();
    const newDate = new Date(today.setDate(today.getDate() + dateChangeStack));
    const dateFormat =
      newDate.getFullYear() +
      "-" +
      (today.getMonth() + 1 < 9
        ? "0" + (today.getMonth() + 1)
        : today.getMonth() + 1) +
      "-" +
      (today.getDate() < 9 ? "0" + today.getDate() : today.getDate());
    console.log(dateFormat);
    // getTodoList(dateFormat);
    getNew(dateFormat);
    setSelectedDate({
      year: newDate.getFullYear(),
      month: MONTH_WORDS[newDate.getMonth()],
      day: newDate.getDate(),
      date: newDate,
    });
  }, [dateChangeStack]);

  useEffect(() => {
    const today = new Date();
    setSelectedDate({
      year: today.getFullYear(),
      month: MONTH_WORDS[today.getMonth()],
      day: today.getDate(),
      date: today,
    });
  }, []);

  return (
    <div className={styles.background}>
      <Image src={back} fill alt="메인 배경 이미지" style={{ zIndex: -99 }} />
      <div className={styles.mainTable}>
        <div className={styles.title}>
          <Typo bold>{MAIN_TITLE}</Typo>
        </div>
        <div className={styles.dayPicker}>
          <IconButton onClick={() => changeDate("backward")}>
            <ArrowBackIosIcon />
          </IconButton>
          <div className={styles.date}>
            <Typo fontSize={50} bold>
              {selectedDate.month} {selectedDate.day}, {selectedDate.year}
            </Typo>
            <Typo fontSize={30} bold>
              {selectedDate.date?.toString().split(" ")[0]}
            </Typo>
          </div>
          <IconButton onClick={() => changeDate("forward")}>
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
        <div className={styles.input}>
          <Textfield
            value={text}
            onChange={(e: any) => setText(e.target.value)}
            placeholder="오늘 나는.."
            variant="outlined"
            onKeyDown={(e: any) => clearByEnter(e)}
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
        <ListContainer data={list} deleteItem={deleteItem} />
      </div>
      <Snackbar
        open={openDialog}
        onClose={handleClose}
        dialogText={dialogText}
      />
    </div>
  );
}
