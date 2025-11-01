const diceRoll = (upperLimit : number) => {
    return Math.floor(Math.random() * upperLimit) + 1;
}



export default diceRoll;