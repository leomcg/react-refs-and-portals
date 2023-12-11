import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

const TimerChallenge = ({ title, targetTime }) => {
  const timer = useRef();
  const dialog = useRef();
  const [timerIsActive, setTimerIsActive] = useState(false);
  const [timerIsExpired, setTimerIsExpired] = useState(false);

  function handleStart() {
    console.log(`${targetTime}s handleStart: `, timer);

    setTimerIsActive(true);
    timer.current = setTimeout(() => {
      setTimerIsExpired(true);
      dialog.current.showModal();
    }, targetTime * 1000);
  }

  function handleStop() {
    console.log(`${targetTime}s handleStop: `, timer);
    clearTimeout(timer.current);
    setTimerIsActive(false);
    setTimerIsExpired(false);
  }

  return (
    <>
      <ResultModal ref={dialog} result={"lost"} targetTime={targetTime} />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
};

export default TimerChallenge;
