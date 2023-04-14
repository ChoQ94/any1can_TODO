import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "src/screen/home/styles.module.scss";
import back from "public/assets/image/background.png";
import { Checkbox, IconButton } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@/components/core/Button/button";
import Typo from "@/components/core/Typo";
import { KEYBOARD_ENTER, MAIN_TITLE } from "@/constants/common";
import { addTodoList, deleteTodoList, getTodoList } from "@/logics/api";
import Snackbar from "@/components/core/Snackbar/snackbar";
import DateContainer from "@/components/module/DateContainer";
import Textfield from "@/components/core/Textfield";
import ListContainer from "@/components/module/ListContainer";

interface Props {
  todoList: any;
}

export default function Home(props: Props) {
  const { todoList } = props;
  const [text, setText] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [dialogText, setDialogText] = useState<string>("");
  const [list, setList] = useState(todoList);

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

  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <div className={styles.background}>
      <Image src={back} fill alt="메인 배경 이미지" style={{ zIndex: -99 }} />
      <div className={styles.mainTable}>
        <div className={styles.title}>
          <Typo bold>{MAIN_TITLE}</Typo>
        </div>
        <DateContainer />
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
