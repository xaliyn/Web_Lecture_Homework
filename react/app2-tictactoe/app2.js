const { useState } = React;

function Square({ value, onClick }) {
  return (
    <button onClick={onClick} style={styles.square}>
      {value}
    </button>
  );
}

function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);

  const handleClick = (index) => {
    if (squares[index] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const status = winner
    ? `Winner: ${winner}`
    : `Next Player: ${xIsNext ? "X" : "O"}`;

  return (
    <div style={styles.container}>
      <h3>Tic-Tac-Toe</h3>
      <p>{status}</p>
      <div style={styles.board}>
        {squares.map((val, i) => (
          <Square key={i} value={val} onClick={() => handleClick(i)} />
        ))}
      </div>
      <button onClick={resetGame} style={styles.reset}>Reset</button>
    </div>
  );
}

function calculateWinner(sq) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
  ];
  for (let [a, b, c] of lines) {
    if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) return sq[a];
  }
  return null;
}

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#fffafd",
    border: "2px solid #ffb6c1",
    borderRadius: "10px",
    maxWidth: "300px",
    margin: "20px auto",
    boxShadow: "0 4px 10px rgba(255, 182, 193, 0.3)"
  },
  board: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
    marginTop: "10px"
  },
  square: {
    width: "80px",
    height: "80px",
    fontSize: "2em",
    fontWeight: "bold",
    color: "#d63384",
    backgroundColor: "#ffe0ec",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer"
  },
  reset: {
    marginTop: "15px",
    padding: "8px 16px",
    backgroundColor: "#ff69b4",
    color: "white",
    border: "none",
    borderRadius: "20px",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

ReactDOM.createRoot(document.getElementById("tictactoe-root")).render(<TicTacToe />);
