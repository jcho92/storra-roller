import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import diceRoll from "./roller";
function App() {
  const [bugsDmg, setBugsDmg] = useState(0);
  const [bowDmg, setBowDmg] = useState(0);
  const [bugsBowDmg, setBugsBowDmg] = useState(0);
  const [totalDmg, setTotalDmg] = useState(0);
  const [favouredFoe, setFavouredFoe] = useState(0);
  const [hunterMarkDmg, setHunterMarkDmg] = useState(0);
  const [sharpShooter, setSharpShooter] = useState(true);
  const [bugsActive, setBugsActive] = useState(true);
  const [hunterMark, setHunterMark] = useState(true);
  const [guardianOfNature, setGuardianOfNature] = useState(true);
  const sharpShooterDmg = sharpShooter ? 10 : 0;
  const [attackDice, setAttackDice] = useState(0);
  const [storraDmgModifier, setStorraDmgModifier] = useState(8);
  const [storraModifier, setStorraAttackModifier] = useState(15);

  const handleDmgDice = () => {
    setBowDmg(diceRoll(8));
    if (bugsActive) {
      setBugsDmg(diceRoll(8));
      setBugsBowDmg(diceRoll(8));
    } else {
      setBugsDmg(0);
      setBugsBowDmg(0);
    }
    setFavouredFoe(diceRoll(8));
    if (hunterMark) {
      setHunterMarkDmg(diceRoll(6));
    } else {
      setHunterMarkDmg(0);
    }
  };

  const handleAttackDice = () => {
    if (incompetenceMode) {
      return setAttackDice(Math.min(diceRoll(20), diceRoll(20)) - 5);
    }
    setAttackDice(
      guardianOfNature ? Math.max(diceRoll(20), diceRoll(20)) : diceRoll(20)
    );
  };
  const toggleSharpShooter = () => {
    setSharpShooter((prev) => !prev);
  };

  const toggleHuntersMark = () => {
    setHunterMark((prev) => !prev);
  };
  const toggleGuardianOfNature = () => {
    setGuardianOfNature((prev) => !prev);
  };
  const togggleBugs = () => {
    setBugsActive((prev) => !prev);
  };

  useEffect(() => {
    calculateTotalDmg();
  }, [bugsDmg, bowDmg, bugsBowDmg, sharpShooter, favouredFoe, bugsActive]);

  const calculateTotalDmg = () => {
    let dmg = 0;
    dmg += bugsDmg + bugsBowDmg;
    dmg += bowDmg;
    dmg += storraDmgModifier;
    dmg += sharpShooterDmg;
    dmg += hunterMarkDmg;
    setTotalDmg(dmg);
  };

  const reRollSwarmsovereign = () => {
    if (!bugsActive) return;
    setBugsBowDmg(diceRoll(8));
  };

  const reRollBugs = () => {
    if (!bugsActive) return;
    setBugsDmg(diceRoll(8));
  };

  const reRollBows = () => {
    setBowDmg(diceRoll(8));
  };

  const handleStorraDamageModifierChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStorraDmgModifier(Number(event.target.value));
  };

  const handleStorraAttackModifierChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStorraAttackModifier(Number(event.target.value));
  };

  const [incompetenceMode, setIncompetenceMode] = useState(false);
  const toggleIncompetenceMode = () => {
    setIncompetenceMode((prev) => !prev);
  };
  return (
    <div className="App">
      <div>
        if piercing reroll one of the available damage types once per turn
      </div>
      <div>
        Bow Damage Result: {bowDmg}
        <button onClick={reRollBows} style={{ marginLeft: "2px" }}>reroll</button>
      </div>

      <div>
        Bugs damage Result: {bugsDmg}
        <button onClick={reRollBugs} style={{ marginLeft: "2px" }}>reroll</button>
      </div>
      <div>
        Swarmsovereign damage Result: {bugsBowDmg}
        <button onClick={reRollSwarmsovereign} style={{ marginLeft: "2px" }}>reroll</button>
      </div>

      <div>Storra damage modifier: {storraDmgModifier}</div>
      <div>SharpShooter Damage: {sharpShooterDmg}</div>
      <div>hunterMark Damage: {hunterMarkDmg} </div>
      <button
        onClick={toggleSharpShooter}
        style={{
          backgroundColor: sharpShooter ? "green" : "red",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Toggle Sharp Shooter ({sharpShooter ? "ON" : "OFF"})
      </button>

      <button
        onClick={togggleBugs}
        style={{
          backgroundColor: bugsActive ? "green" : "red",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Toggle bugs ({bugsActive ? "ON" : "OFF"})
      </button>

      <button
        onClick={toggleHuntersMark}
        style={{
          backgroundColor: hunterMark ? "green" : "red",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Toggle hunters Mark ({hunterMark ? "ON" : "OFF"})
      </button>

      <button
        onClick={toggleGuardianOfNature}
        style={{
          backgroundColor: guardianOfNature ? "green" : "red",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Toggle guardian of nature ({guardianOfNature ? "ON" : "OFF"})
      </button>

      <button
        onClick={toggleIncompetenceMode}
        style={{
          backgroundColor: incompetenceMode ? "green" : "red",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >Toggle Hard Mode ({incompetenceMode ? "ON" : "OFF"})</button>

      <div> total DMG : {totalDmg} </div>
      <button onClick={handleDmgDice}>Roll Damage Dice</button>

      <div>Attack Roll</div>
      <button onClick={handleAttackDice}>Roll Attack Dice</button>
      {attackDice === 20
        ? "NAT 20 BABY"
        : attackDice === 1
        ? "NAT 1 FAIL"
        : `${attackDice} + ${storraModifier} = ${attackDice + storraModifier}`}

      <div>
        <label htmlFor="defaultInput">Storra Damage Modifier: </label>
        <input
          id="defaultInput"
          type="number"
          value={storraDmgModifier} // Bind the input value to the state
          onChange={handleStorraDamageModifierChange} // Update the state on input change
        />
        <label htmlFor="defaultInput">Storra Attack Modifier: </label>
        <input
          id="defaultInput"
          type="number"
          value={storraModifier} 
          onChange={handleStorraAttackModifierChange}
        />
      </div>
    </div>
  );
}

export default App;
