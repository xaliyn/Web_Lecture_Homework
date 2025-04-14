const { useState } = React;

function Calculator() {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const clear = () => setInput("");

  const calculate = () => {
    try {
      setInput(eval(input).toString());
    } catch {
      setInput("Error");
    }
  };

  return (
    <div style={styles.container}>
      <h3>Simple Calculator</h3>
      <input type="text" value={input} readOnly style={styles.display} />
      <div style={styles.buttons}>
        {["7", "8", "9", "+", "4", "5", "6", "-", "1", "2", "3", "*", "0", ".", "=", "/"].map((val) => (
          <button
            key={val}
            onClick={() => (val === "=" ? calculate() : handleClick(val))}
            style={styles.button}
          >
            {val}
          </button>
        ))}
        <button onClick={clear} style={{ ...styles.button, backgroundColor: "#ff69b4" }}>C</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    border: "2px solid #ffb6c1",
    borderRadius: "10px",
    maxWidth: "300px",
    margin: "20px auto",
    backgroundColor: "#fffafd",
    boxShadow: "0 4px 10px rgba(255, 182, 193, 0.3)"
  },
  display: {
    width: "100%",
    padding: "10px",
    fontSize: "1.2em",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  buttons: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "10px"
  },
  button: {
    padding: "10px",
    fontSize: "1.1em",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#ffe0ec",
    color: "#d63384",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

ReactDOM.createRoot(document.getElementById("calculator-root")).render(<Calculator />);
