import { IconButton } from "@mui/joy";
import styles from "@components/module/DateContainer/styles.module.scss";

import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Typo from "@components/core/Typo";

interface Props {
  selectedDate: any;
  today: any;
}

export default function DateContainer(props: Props) {
  const { selectedDate, today } = props;

  return (
    <div className={styles.dayPicker}>
      <IconButton>
        <ArrowBackIosIcon />
      </IconButton>
      <div className={styles.date}>
        <Typo fontSize={50} bold>
          {selectedDate.month} {selectedDate.day}, {selectedDate.year}
        </Typo>
        <Typo fontSize={30} bold>
          {today.toDateString().split(" ")[0]}
        </Typo>
      </div>
      <IconButton>
        <ArrowForwardIosIcon />
      </IconButton>
    </div>
  );
}
