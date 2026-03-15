import { useState, useEffect } from 'react';

const BOARD_SIZE = 10;
const TOTAL_SHIPS = 20;

const createEmptyBoard = () => Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(0));

const placeShipsRandomly = () => {
  const board = createEmptyBoard();
  let shipsPlaced = 0;
  while (shipsPlaced < TOTAL_SHIPS) {
    const x = Math.floor(Math.random() * BOARD_SIZE);
    const y = Math.floor(Math.random() * BOARD_SIZE);
    if (board[y][x] === 0) {
      board[y][x] = 1;
      shipsPlaced++;
    }
  }
  return board;
};

const checkWin = (board) => {
  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      if (board[y][x] === 1) return false;
    }
  }
  return true; 
};

export default function BattleshipGame() {
  const [playerBoard, setPlayerBoard] = useState(createEmptyBoard());
  const [computerBoard, setComputerBoard] = useState(createEmptyBoard());
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [turn, setTurn] = useState('player'); 
  const [message, setMessage] = useState('Click "Start Game" to deploy your fleet!');

  const startGame = () => {
    setPlayerBoard(placeShipsRandomly());
    setComputerBoard(placeShipsRandomly());
    setIsPlaying(true);
    setIsGameOver(false);
    setTurn('player');
    setMessage('Your move! Attack the opponent radar.');
  };

  useEffect(() => {
    if (isPlaying && !isGameOver && turn === 'computer') {
      const timer = setTimeout(() => {
        let x, y;
        do {
          x = Math.floor(Math.random() * BOARD_SIZE);
          y = Math.floor(Math.random() * BOARD_SIZE);
        } while (playerBoard[y][x] === 2 || playerBoard[y][x] === 3);

        const newBoard = playerBoard.map(row => [...row]);
        
        if (newBoard[y][x] === 1) {
          newBoard[y][x] = 3;
          if (checkWin(newBoard)) {
            setMessage('Defeat');
            setIsGameOver(true);
          } else {
            setMessage('The opponent has hit! His turn again.');
          }
        } else {
          newBoard[y][x] = 2;
          setMessage('The opponent has missed! Your turn!');
          setTurn('player');
        }
        setPlayerBoard(newBoard);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [turn, isPlaying, isGameOver, playerBoard]);

  const handleCellClick = (x, y) => {
    if (!isPlaying || isGameOver || turn !== 'player') return;
    if (computerBoard[y][x] === 2 || computerBoard[y][x] === 3) return;

    const newBoard = computerBoard.map(row => [...row]);
    
    if (newBoard[y][x] === 1) {
      newBoard[y][x] = 3;
      if (checkWin(newBoard)) {
        setMessage('Victory!');
        setIsGameOver(true);
      } else {
        setMessage('You have hit! Your turn again.');
      }
    } else {
      newBoard[y][x] = 2;
      setMessage('You have missed. The opponents turn');
      setTurn('computer');
    }
    setComputerBoard(newBoard);
  };

  const renderCell = (value, isPlayerBoard, x, y) => {
    let bgColor = 'bg-blue-300 hover:bg-blue-400'; 
    if (value === 1) {
      bgColor = isPlayerBoard ? 'bg-slate-700' : 'bg-blue-300 hover:bg-blue-400';
    } else if (value === 2) {
      bgColor = 'bg-slate-300'; 
    } else if (value === 3) {
      bgColor = 'bg-red-500'; 
    }

    return (
      <div 
        key={`${x}-${y}`} 
        onClick={() => !isPlayerBoard && handleCellClick(x, y)}
        className={`w-8 h-8 border border-white/50 cursor-pointer transition-colors duration-200 ${bgColor}`}
      />
    );
  };

  return (
    <div className="max-w-5xl mx-auto text-center mt-6">
      <h2 className="text-3xl font-bold mb-2 text-indigo-800">Battleship</h2>
      
      <div className={`p-4 mb-6 rounded-lg text-lg font-bold shadow-sm transition-colors duration-300 ${
        isGameOver ? (message.includes('Victory') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800') 
        : turn === 'player' ? 'bg-indigo-100 text-indigo-800' : 'bg-orange-100 text-orange-800'
      }`}>
        {message}
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-12 mb-8">
        <div>
          <h3 className="text-xl font-bold mb-3 text-slate-700">Your fleet</h3>
          <div className="grid grid-cols-10 gap-0 border-4 border-slate-800 bg-blue-500 p-1 rounded shadow-lg">
            {playerBoard.map((row, y) => row.map((cell, x) => renderCell(cell, true, x, y)))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-3 text-red-700">Opponent's fleet</h3>
          <div className={`grid grid-cols-10 gap-0 border-4 border-red-800 bg-blue-500 p-1 rounded shadow-lg ${
            (turn === 'computer' || isGameOver) && isPlaying ? 'opacity-70 pointer-events-none' : ''
          }`}>
            {computerBoard.map((row, y) => row.map((cell, x) => renderCell(cell, false, x, y)))}
          </div>
        </div>
      </div>

      <button 
        onClick={startGame}
        className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-indigo-700 transition shadow-md"
      >
        {isPlaying ? 'Resign and try again' : 'Start'}
      </button>
    </div>
  );
}