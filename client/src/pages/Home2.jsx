import React, { useState } from "react";

const Home = () => {
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [storedData, setStoredData] = useState([]);

  const generatePassword = () => {
    const length = 12;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      generatedPassword += charset.charAt(
        Math.floor(Math.random() * charset.length)
      );
    }
    setPassword(generatedPassword);
  };

  const storeData = () => {
    if (url && username && password) {
      const newData = { url, username, password };
      setStoredData([...storedData, newData]);
      setUrl("");
      setUsername("");
      setPassword("");
    } else {
      alert("Please fill out all fields before storing data.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Password Manager</h1>
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <button onClick={generatePassword} style={styles.button}>
          Generate Random Password
        </button>
        <input
          type="text"
          placeholder="Generated Password"
          value={password}
          readOnly
          style={styles.input}
        />
        <button onClick={storeData} style={styles.button}>
          Store Information
        </button>
        <div style={styles.storedList}>
          {storedData.map((item, index) => (
            <div key={index} style={styles.storedItem}>
              <p>
                <strong>URL:</strong> {item.url}
              </p>
              <p>
                <strong>Username:</strong> {item.username}
              </p>
              <p>
                <strong>Password:</strong> {item.password}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f3f4f6",
    margin: 0,
    padding: 0,
  },
  card: {
    width: "90%",
    maxWidth: "400px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "1.5em",
    textAlign: "center",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "1em",
  },
  button: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    border: "none",
    borderRadius: "5px",
    fontSize: "1em",
    backgroundColor: "#4caf50",
    color: "#fff",
    cursor: "pointer",
  },
  storedList: {
    marginTop: "20px",
  },
  storedItem: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginTop: "5px",
  },
};

export default Home;
