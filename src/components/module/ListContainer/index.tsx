import { Checkbox, IconButton } from "@mui/joy";
import React, { useState } from "react";
import styles from "@/components/module/ListContainer/styles.module.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import Typo from "@/components/core/Typo";
import { deleteTodoList, getTodoList } from "@/logics/api";

interface Props {
  data: any;
  deleteItem: any;
}

export default function ListContainer(props: Props) {
  const { data, deleteItem } = props;

  return (
    <div className={styles.todoListContainer}>
      {data?.map((item: any) => (
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
      {data?.length === 0 && (
        <div className={styles.noList}>
          <Typo fontSize={20} bold>
            {" "}
            No List
          </Typo>
        </div>
      )}
    </div>
  );
}
