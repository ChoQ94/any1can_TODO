import { IconButton } from "@mui/joy";
import styles from "src/components/module/DateContainer/styles.module.scss";

import React, { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Typo from "@/components/core/Typo";
import { MONTH_WORDS } from "@/constants/common";

interface DateProps {
  year: number | string;
  month: number | string;
  day: number | string;
}

export default function DateContainer() {
  const [selectedDate, setSelectedDate] = useState<DateProps>({
    year: "",
    month: "",
    day: "",
  });

  const today = new Date();

  useEffect(() => {
    const today = new Date();
    // getTodoList();
    setSelectedDate({
      year: today.getFullYear(),
      month: MONTH_WORDS[today.getMonth()],
      day: today.getDate(),
    });
  }, []);

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
