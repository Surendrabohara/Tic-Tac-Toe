// variable setup
const players = ['O','X'];
// fill in the square on the bords when the player is playing
const gameBoard = ['','','','','','','','',''];
// variable which keeps track the current player
let currentPlayer;
// variable which is used to reset when the game is finished
let gameBoardElem;
const createTitle = title =>{
    const titleElem = document.createElement('h1');
    titleElem.textContent = title;
    document.body.appendChild(titleElem);
};
// function to create div
const makeGameBoardElem = () =>{
    const gameBoardElem = document.createElement('div');
    // adding class name inside div
    gameBoardElem.classList.add('game-board');
    // instead adding directly inside the body we are actually returning the actual element that we are creating from this function
    return gameBoardElem;
};
 // function to consist the grid that are inside the game board
 const makeSquareElem = (squareNumber) => {
    const squareElement = document.createElement('div');
    squareElement.classList.add('game-square');
    squareElement.addEventListener('click', (event)=>{
        // destructing in js
        const {target} = event;
        target.textContent = currentPlayer;
        gameBoard[squareNumber] = currentPlayer;
        // CheckBoard
        CheckBoard();
        // switchPlayers
        switchPlayer();
    }, {once: true})
    return squareElement;
 };

 // function to switch players
 const switchPlayer = () => {
    if(currentPlayer === players[0]){
        currentPlayer = players[1];
    }
    else{
        currentPlayer = players[0];
    }
 };
// function to check the condition of winning state
const CheckBoard = () => 
{
    // gameBoard
    //['0', '1', '2']
    //['3', '4', '5']
    //['6', '7', '8']

    const winningState = [
        ['0', '1', '2'],
        ['3', '4', '5'],
        ['6', '7', '8'],
        ['0', '3', '6'],
        ['1', '4', '7'],
        ['2', '5', '8'],
        ['0', '4', '8'],
        ['2', '4', '6']
    ];

       for(let winState of winningState){
            const[position1, position2, position3] = winState;
            if (
            gameBoard[position1] !== '' &&
            gameBoard[position1] === gameBoard[position2] &&
            gameBoard[position3] === gameBoard[position1]
            ) 
            {
             completeGame(`${gameBoard[position1]}'s wins!`);
            }
       }
    const allSquaresUsed = gameBoard.every(square => square !== '');
     if(allSquaresUsed){
        completeGame(`It is draw`);
     }
}
// finction to create the overlay to display the message in fancy way
const completeGame = message => {
    const overlayElem = document.createElement('div');
    overlayElem.style.position = 'fixed';
    overlayElem.style.top = '0';
    overlayElem.style.right = '0';
    overlayElem.style.bottom = '0';
    overlayElem.style.left = '0';
    overlayElem.style.backgroundColor = 'rgba(0,0,0,0.8)';
    overlayElem.style.display= 'flex';
    overlayElem.style.flexDirection = 'column';
    overlayElem.style.justifyContent = 'center';
    overlayElem.style.alignItems = 'center';
    overlayElem.style.textAlign = 'center';

    // creating h2 tag to display the message and styling the message
    const messageElem = document.createElement('h2');
    messageElem.textContent = message;
    messageElem.style.color = 'white';
    messageElem.style.fontSize = '100px';
   
   
    overlayElem.appendChild(messageElem);

    // Button to restart the game
    const restartButtonElem = document.createElement('button');
    restartButtonElem.textContent = 'Restart';
    restartButtonElem.style.backgroundColor = 'transparent';
    restartButtonElem.style.color= 'white';
    restartButtonElem.style.border = '1px sold Black';
    restartButtonElem.style.padding = '10px 30px';
    restartButtonElem.style.fontSize = '30px';
    // EventHnadeler for Rstart Button
    restartButtonElem.addEventListener('click', () => {
        // resetGame is called because after finishing game ,Again we need new interface 
        resetGame();
        document.body.removeChild(overlayElem);
    });
    // restartButtonElem.style.border = '5px';
    overlayElem.appendChild(restartButtonElem);
    document.body.appendChild(overlayElem);
}


// function to reset the game after complete
 const resetGame = () => {
     // if the old game bord still exists after finishing game , it will remove it and show new board after clearing old data
    if(gameBoardElem){
        document.body.removeChild(gameBoardElem);
    }
    gameBoardElem = makeGameBoardElem();
    for(let square = 0; square< 9; square++){
        gameBoardElem.appendChild(makeSquareElem(square)); 
    }
    currentPlayer = players[0];
    gameBoard.fill('');
    document.body.appendChild(gameBoardElem);
 };
createTitle('Tic-tac-toe');
resetGame();
