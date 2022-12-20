import React, {
    useEffect, 
    useState, 
    useRef
} from "react";
import Container from "../../components/Container";
import Box from '../../components/Box';
import Input from "../../components/Input";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import { randomUniqueNumbers } from "../../utils/utils";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import Result from "../../components/Result";
import "./style.css";

// ==================================
// Changable 
const BOXES_NUMBER = 49;        // Boxes number
const COLUMNS = 7;              // Columns number
const ROWS = 7;                 // Rows number
const SECONDS = 10;             // How much time it takes to open boxes
const BOXES_ITERATION = 7;      // How many boxes open after some time takes over
const BOX_WIDTH = 100;          // Boxes width
const BOX_HEIGHT = 100;         // Boxes height
const PASSCODE = "test123";     // Passcode which user has to guess it
// ==================================
let timer;

const style = {
    grid:{
        width: '100%',
        display:'grid',
        gridTemplateColumns: `repeat(${COLUMNS}, ${BOX_WIDTH}px)`,
        gridTemplateRows: `repeat(${ROWS}, ${BOX_HEIGHT}px)`,
    },
    startButton: {
        width: "200px",
        textTransform: "uppercase"
    }
}

const Main = () => {
    const [inputState, setInputState] = useState("");
    const [counter, setCounter] = useState(0);
    const [boxesArray, setBoxesArray] = useState([]);
    const [isStarted, setIsStarted] = useState(false);
    const [isFinished, setIsFinished] = useState({
        status: false,
        result: "",
    });
    const [date, setDate] = useState({
        isChanged: false,
        date: new Date()
    });
    const countRef = useRef(null);
    countRef.current = counter;

    useEffect(() => {
        if(isStarted){
            const numbers = randomUniqueNumbers(BOXES_NUMBER, BOXES_NUMBER);
            const boxes = [];
            numbers.forEach((el, i) => {
                boxes.push({
                    id: el,
                    isOpen: i < BOXES_ITERATION ? true : false,
                    image: `${el}.png`
                });
            });
            setCounter(BOXES_ITERATION)
            setBoxesArray(boxes);
            if(localStorage.getItem('key')) {
                localStorage.removeItem('key');
            }
            localStorage.setItem('key', PASSCODE);
        }
    }, [isStarted]);

    const onStartGameClick = () => {
        setIsStarted(true)
    }

    useEffect(() => {
        if(isStarted) {
            var timerID = setInterval(() => {
                if (countRef.current > BOXES_NUMBER) {  
                    clearInterval(timerID);
                  } else {
                    openUpBoxes(countRef.current);
                    setCounter((prevCount) => prevCount + BOXES_ITERATION);
                  }
            }, SECONDS * 1000);
        }
    }, [boxesArray]);

    useEffect(() => {
        if (date.isChanged) {
            clearInterval(timer);
            timer = setInterval(() => {
                if (date.date.toISOString() <= new Date().toISOString()) {
                    setIsStarted(true)
                }
            }, 1 * 1000)
        }
    }, [date]);


    const Boxes = () => {
        const boxes = [];
        for (let i = 1; i <= BOXES_NUMBER; i++) {
            const index = boxesArray.findIndex(el => el.id === i);
            boxes.push(
                <Box 
                    key={`box-${i}`} 
                    id={i}
                    image={boxesArray[index]?.image}
                    isOpen={boxesArray[index]?.isOpen}
                    height={`${BOX_HEIGHT}px`}
                    width={`${BOX_WIDTH}px`}
                />
            );
        };
        return boxes
    }

    const UserResult = () => {
        if(isFinished.result === "win") {
            return <Result
                link="#"
                actionName="Claim rewards"
                resultText="Congratulations! You are winner!"
            />
        } else if (isFinished.result === "lose") {
            return <Result
                link="#"
                actionName="Try next game"
                resultText="Game over. Thank you for playing"
            />
        }
    }

    const openUpBoxes = (startIndex) => {
        let endIndex = startIndex + BOXES_ITERATION;
        let boxes = []
        if (endIndex <= BOXES_NUMBER) {
            if (boxesArray) {
                boxes = [...boxesArray];
                if (boxes) {
                    for (let i = startIndex; i < endIndex; i++) {
                        boxes[i].isOpen = true
                    }
                }
            }
        }
        return;
    }

    const userInputCheck = () => {
        if (inputState === PASSCODE) {
            setIsFinished({
                status: true,
                result: "win"
            })
        } else {
            setIsFinished({
                status: true,
                result: "lose"
            })
        }
    }

    return (
        <Container width={`${ROWS * BOX_WIDTH}px`} height={`${COLUMNS * BOX_HEIGHT}px`}>
            {
                isStarted && !isFinished.status ? (
                    <>
                        <div className="wrapper" style={style.grid}>
                            { boxesArray ? <Boxes /> : <Loader /> }
                        </div>
                        <div className="actions">
                            <Input
                                placeholder=""
                                value={inputState}
                                type="text"
                                onChange={setInputState}
                            />
                            <Button 
                                title="Enter"
                                color="green"
                                onClick={() => {
                                    userInputCheck()
                                }}
                                right
                            />
                        </div>
                    </>
                ) : 
                isStarted && isFinished.status ? (<UserResult />) 
                : (
                    <div className="wrapper flex center">
                        <div className="text-center">
                            <div className="text">
                                Start Game
                            </div>
                            <div className="text">
                                Set Date / Time
                            </div>
                            <div className="time">
                            <DatePicker
                                selected={date.date}
                                onChange={(date) => setDate({
                                    isChanged: true,
                                    date
                                })}
                                showTimeSelect
                                dateFormat="MMMM d, yyyy h:mm aa"
                                />
                            </div>
                            <div className="text">
                               Manual Start
                            </div>
                            <Button
                                title="Start game"
                                basic
                                color="black"
                                className="start-btn"
                                style={style.startButton}
                                onClick={() => onStartGameClick()}
                            />
                        </div>
                    </div>
                )
            }
        </Container>
    )
};

export default Main;