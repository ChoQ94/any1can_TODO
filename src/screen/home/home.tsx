import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from 'src/screen/home/styles.module.scss';
import back from 'public/assets/image/background.png';
import { Alert, Snackbar, Typography } from '@mui/material';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { Checkbox, IconButton } from '@mui/joy';
import MenuIcon from '@mui/icons-material/Menu';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const MONTH_WORDS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dev',
];

interface DateProps {
  year: number | string;
  month: number | string;
  day: number | string;
}

export default function Home() {
  const [text, setText] = useState<string>('');
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [todoList, setTodoList] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<DateProps>({
    year: '',
    month: '',
    day: '',
  });
  const today = new Date();

  const clear = () => {
    if (todoList.length >= 7) {
      setOpenDialog(true);
      setText('');
      return;
    }
    setTodoList([...todoList, text]);
    setText('');
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
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
      <Image src={back} fill alt='메인 배경 이미지' style={{ zIndex: -99 }} />
      <div className={styles.mainTable}>
        <div className={styles.title}>
          <Typography fontWeight={700}>TODO LIST ANYONE CAN DO</Typography>
        </div>
        <div className={styles.date}>
          <Typography fontSize={50} fontWeight={700}>
            {selectedDate.month} {selectedDate.day}, {selectedDate.year}
          </Typography>
          <Typography fontSize={30} fontWeight={700}>
            {today.toDateString().split(' ')[0]}
          </Typography>
        </div>
        <div className={styles.input}>
          <Input
            // startDecorator={'ㅋㅋ'}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='오늘 나는..'
            variant='outlined'
            endDecorator={
              <Button
                sx={{ border: '1px solid white' }}
                variant='solid'
                color='primary'
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
              <Checkbox variant='outlined' />
              <div className={styles.itemContainer}>{item}</div>
              <IconButton
                sx={{ marginTop: '-7px' }}
                onClick={() => {
                  deleteItem(item);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton sx={{ marginTop: '-7px' }} onClick={() => {}}>
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          {todoList.length === 0 && (
            <div className={styles.noList}>
              <Typography fontWeight={700} fontSize={20}>
                {' '}
                No List
              </Typography>
            </div>
          )}
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openDialog}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert severity='error'>8개 이상 등록은 불가해요</Alert>
      </Snackbar>
    </div>
  );
}
