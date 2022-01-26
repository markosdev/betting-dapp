import Head from "next/head";
import { useState } from "react";

export default function Home() {
  //? State Management for Team A
  const [amount1, setAmount1] = useState(0);
  const [val1, setVal1] = useState("");
  const [buttonAvailable1, setButtonAvailable1] = useState(false);

  //? State Management for Team B
  const [amount2, setAmount2] = useState(0);
  const [val2, setVal2] = useState("");
  const [buttonAvailable2, setButtonAvailable2] = useState(false);

  //? Winner State Management
  const [won, setWon] = useState(-1);
  const [teamWon, setTeamWon] = useState(false);

  //? Input text-box value change handler
  function onVal1Change(e) {
    let value = e.target.value;

    if (value < 0) {
      value = Math.abs(value);
    }

    setVal1(value != 0 ? Number(value) : "Place Your Bet");
    setButtonAvailable1(value > 0);
  }
  function onVal2Change(e) {
    let value = e.target.value;
    if (value < 0) {
      value = Math.abs(value);
    }

    setVal2(value != 0 ? Number(value) : "Place Your Bet");
    setButtonAvailable2(value > 0);
  }

  //? BET button onClick event handling
  function handleInput1() {
    setAmount1(amount1 + val1);
    setVal1("");
    setButtonAvailable1(false);
  }
  function handleInput2() {
    setAmount2(amount2 + val2);
    setVal2("");
    setButtonAvailable2(false);
  }

  //? Add value on press of enter
  function handleKeypress1(e) {
    if (e.key === "Enter" && buttonAvailable1) {
      handleInput1();
    }
  }
  function handleKeypress2(e) {
    if (e.key === "Enter" && buttonAvailable2) {
      handleInput2();
    }
  }

  //? Winner state management
  const setWonState = (num) => {
    setTeamWon(num !== -1);
    setWon(num);
  };

  return (
    <div>
      <Head>
        <title>Betting Application</title>
        <meta name="description" content="Betting Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="main">
        <div className={`bet-container ${won === 0 ? "won" : ""}`}>
          <h1>Team A {won === 0 && "Won"}</h1>
          <h2>
            Total Amount:{" "}
            <span className={`amount ${won === 0 ? "white" : ""}`}>
              {amount1}
            </span>
          </h2>
          <div className="inputContainer">
            <input
              name="amount"
              placeholder="Place Your Bet"
              type="number"
              autoComplete="off"
              value={val1}
              onChange={onVal1Change}
              onKeyPress={handleKeypress1}
              disabled={teamWon}
            />
            <button disabled={!buttonAvailable1} onClick={handleInput1}>
              BET
            </button>
          </div>
          {won === 0 ? (
            <button className="mt-3" onClick={() => setWonState(-1)}>
              Revert Win
            </button>
          ) : (
            <button className="mt-3" onClick={() => setWonState(0)}>
              Make This Team Win
            </button>
          )}
        </div>
        <div className={`bet-container ${won === 1 ? "won" : ""}`}>
          <h1>Team B {won === 1 && "Won"}</h1>
          <h2>
            Total Amount:{" "}
            <span className={`amount ${won === 1 ? "white" : ""}`}>
              {amount2}
            </span>
          </h2>
          {/* <h2 className="heading">Place Your Bet</h2> */}
          <div className="inputContainer">
            <input
              name="amount"
              placeholder="Place Your Bet"
              type="number"
              autoComplete="off"
              value={val2}
              onChange={onVal2Change}
              onKeyPress={handleKeypress2}
              disabled={teamWon}
            />
            <button disabled={!buttonAvailable2} onClick={handleInput2}>
              BET
            </button>
          </div>
          {won === 1 ? (
            <button className="mt-3" onClick={() => setWonState(-1)}>
              Revert Win
            </button>
          ) : (
            <button className="mt-3" onClick={() => setWonState(1)}>
              Make This Team Win
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
