import React, { useState } from 'react';
import Image from "next/image";
import styles from "src/screen/home/styles.module.scss"
import back from "public/assets/image/background.png"
import { Typography } from '@mui/material';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
// import Button as Qwe from '@mui/material';

export default function Home() {
    const [text, setText] = useState('');
    const clear = () => {
        setText('');
    }

    return(
        <div className={styles.back}>
           <Image
                src={back}
                fill
                alt="메인 배경 이미지"
                style={{zIndex: -99}}
            />
            <div className={styles.mainTable}>
                <div className={styles.title}>
                        <Typography fontWeight={700}>
                            TODO LIST ANYONE CAN DO
                        </Typography>
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
                        onChange={(e)=>setText(e.target.value)}
                        placeholder='오늘 나는..'
                        variant="outlined"
                        endDecorator={<Button sx={{border: '1px solid white'}} variant='solid' color="primary" onClick={clear}>+</Button>}
                    ></Input>
                </div>
            </div>
        </div>
    )
}