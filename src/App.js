import React from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import { useStopwatch } from 'react-timer-hook';

import Die from './components/Die';
import './style.css';
import Timer from './components/Timer';
import Rolls from './components/rolls';

function App() {
  const { seconds, minutes, hours, start, pause, reset } = useStopwatch({
    autoStart: false,
  });

  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  const [time, setTime] = React.useState({});
  const [hasStarted, setHasStarted] = React.useState(() => false);
  const [bestTime, setBestTime] = React.useState(() =>
    localStorage.getItem('best-time')
      ? JSON.parse(localStorage.getItem('best-time'))
      : ''
  );

  const [rolls, setRolls] = React.useState(0);
  const [bestRolls, setBestRolls] = React.useState(() =>
    localStorage.getItem('best-rolls')
      ? JSON.parse(localStorage.getItem('best-rolls'))
      : '0'
  );

  const [styles, setStyles] = React.useState({ display: 'block' });
  const [secondClick, setSecondClick] = React.useState(0);

  React.useEffect(() => {
    setTime({ seconds: seconds, minutes: minutes, hours: hours });
  }, [seconds, minutes, hours]);

  React.useEffect(() => {
    const firstValue = dice[0].value;
    const allHeld = dice.every((die) => die.isHeld === true);
    const allEqual = dice.every((die) => die.value === firstValue);
    if (allEqual && allHeld) {
      setTenzies(true);
      setHasStarted(false);
      pause();
      if (time < bestTime || !bestTime) {
        setBestTime(time);
        localStorage.setItem('best-time', JSON.stringify(time));
      }
      reset();
      if (rolls < bestRolls || bestRolls === '0') {
        setBestRolls(rolls);
        localStorage.setItem('best-rolls', JSON.stringify(bestRolls));
      }
    }
  }, [dice, bestTime, time, pause, reset, rolls, bestRolls]);

  function generateNewDie() {
    return { value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid() };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    setStyles({ display: 'none' });
    setSecondClick((prevState) => prevState + 1);
    // Handle Stopwatch
    if (!hasStarted) {
      start();
      setHasStarted(true);
    }

    // Handle the winnig state and number of rolls
    if (!tenzies) {
      if (secondClick >= 1) {
        setRolls((prevRolls) => prevRolls + 1);
      }
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld === true ? die : generateNewDie();
        })
      );
    } else {
      setRolls(0);
      setTenzies(false);
      setStyles({ display: 'block' });
      setDice(allNewDice());
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="overlay" style={styles}></div>
      <div className="dice-container">{diceElements}</div>
      <div className="row">
        <div className="total-timer">
          <Timer best={true} timer={bestTime} />
          <Timer timer={time} />
        </div>
        <button type="button" className="roll-dice" onClick={rollDice}>
          {tenzies ? 'New Game' : 'Roll'}
        </button>
        <div className="total-rolls">
          <Rolls best={true} bestRolls={bestRolls} />
          <Rolls rolls={rolls} />
        </div>
      </div>
    </main>
  );
}

export default App;
