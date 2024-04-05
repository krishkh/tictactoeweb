let cellList = document.querySelectorAll(".cell");
let isTie = 0;
let boardState = {
  cell_0: null,
  cell_1: null,
  cell_2: null, // Row 0
  cell_3: null,
  cell_4: null,
  cell_5: null, // Row 1
  cell_6: null,
  cell_7: null,
  cell_8: null, // Row 2
};
let player = 0; // there will be two players, player0 and player1 X and O respectively
const arr = ["X", "O"]; // player1 will always be O and player 2 will always be X
const boardUpdate = (cell) => {
  if (boardState[cell.id] == null) {
    if (player === 0) {
      cell.innerText = "X";
      boardState[cell.id] = "X";
      player = 1;
      isTie += 1;
    } else {
      cell.innerText = "O";
      player = 0;
      boardState[cell.id] = "O";
      isTie += 1;
    }
  }
  console.log(boardState);
};
const msg = () => {
  if (player === 0) {
    return "X";
  } else {
    return "O";
  }
};
const checkWInner = () => {
  condition =
    (boardState["cell_0"] === boardState["cell_1"] &&
      boardState["cell_0"] === boardState["cell_2"] &&
      boardState["cell_0"] != null) ||
    (boardState["cell_3"] === boardState["cell_4"] &&
      boardState["cell_3"] === boardState["cell_5"] &&
      boardState["cell_3"] != null) ||
    (boardState["cell_6"] === boardState["cell_7"] &&
      boardState["cell_6"] === boardState["cell_8"] &&
      boardState["cell_6"] != null) ||
    (boardState["cell_0"] === boardState["cell_3"] &&
      boardState["cell_0"] === boardState["cell_6"] &&
      boardState["cell_0"] != null) ||
    (boardState["cell_1"] === boardState["cell_4"] &&
      boardState["cell_1"] === boardState["cell_7"] &&
      boardState["cell_1"] != null) ||
    (boardState["cell_2"] === boardState["cell_5"] &&
      boardState["cell_2"] === boardState["cell_8"] &&
      boardState["cell_2"] != null) ||
    (boardState["cell_0"] === boardState["cell_4"] &&
      boardState["cell_0"] === boardState["cell_8"] &&
      boardState["cell_0"] != null) ||
    (boardState["cell_2"] === boardState["cell_4"] &&
      boardState["cell_2"] === boardState["cell_6"] &&
      boardState["cell_2"] != null);
  if (condition) {
    document.querySelector("#status").innerText = `The winner is ${
      arr[Number(!player)]
    }`;
    boardState = {
      cell_0: false,
      cell_1: false,
      cell_2: false, // Row 0
      cell_3: false,
      cell_4: false,
      cell_5: false, // Row 1
      cell_6: false,
      cell_7: false,
      cell_8: false, // Row 2
    };
  } else if (isTie === 9) {
    document.querySelector("#status").innerText = "It is a tie";
  } else {
    console.log("Good Move.");
  }
  console.log(isTie);
};
// this is the main function which is handling most of the stuff
const playerChoice = (cell) => {
  boardUpdate(cell);
  document.querySelector("#status").innerText = `Player ${msg()}'s turn`;
  checkWInner();
};
// THIS IS WHERE THE EVENTS START AT
cellList.forEach((cell) => {
  cell.addEventListener("click", () => {
    playerChoice(cell); //passing the id of cell which is clicked and the player which clicked it
  });
});
// this function is used to reset the board either after a game or in middle of a game
const resetBoard = () => {
  boardState = {
    cell_0: null,
    cell_1: null,
    cell_2: null, // Row 0
    cell_3: null,
    cell_4: null,
    cell_5: null, // Row 1
    cell_6: null,
    cell_7: null,
    cell_8: null, // Row 2
  };
  cellList.forEach((cell) => {
    cell.innerText = boardState[cell.id];
  });
  document.querySelector("#status").innerText = `Player  ${arr[player]}'s turn`;
  isTie = 0;
};
// calling the reset button
resetButton = document.querySelector("#restart"); //making a restart button
resetButton.addEventListener("click", () => {
  resetBoard();
});
