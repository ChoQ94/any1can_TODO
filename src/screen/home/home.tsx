import React, { useState } from 'react';
import Image from 'next/image';
import styles from 'src/screen/home/styles.module.scss';
import back from 'public/assets/image/background.png';
import { Alert, Snackbar, Typography } from '@mui/material';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { Checkbox } from '@mui/joy';
import MenuIcon from '@mui/icons-material/Menu';

export default function Home() {
  const [text, setText] = useState<string>('');
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [todoList, setTodoList] = useState<string[]>([]);

  const clear = () => {
    if (todoList.length > 3) {
      setOpenDialog(true);
      setText('');
      return;
    }
    setTodoList([text, ...todoList]);
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

  return (
    <div className={styles.back}>
      <Image src={back} fill alt='메인 배경 이미지' style={{ zIndex: -99 }} />
      <div className={styles.mainTable}>
        <div className={styles.title}>
          <Typography fontWeight={700}>TODO LIST ANYONE CAN DO</Typography>
        </div>
        <div className={styles.date}>
          <Typography fontSize={50} fontWeight={700}>
            Feb 6, 2023
          </Typography>
          <Typography fontSize={30} fontWeight={700}>
            Wed
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
              <MenuIcon />
            </div>
          ))}
          {todoList.length === 0 && <div>새로운 리스트를 추가해보세용</div>}
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openDialog}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert severity='error'>N개 이상은 안되지롱~</Alert>
      </Snackbar>
    </div>
  );
}
