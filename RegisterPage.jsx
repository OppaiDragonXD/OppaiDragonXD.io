import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  async function register(ev) {
    ev.preventDefault();
    if (password.length < 8) {
      setPasswordError("Password must be 8 characters long");
      return;
    }
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      alert("Registration successful");
    } else {
      alert("Registration failed");
    }
  }

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(ev) => {
          setPassword(ev.target.value);
          if (ev.target.value.length < 8) {
            setPasswordError("Password must be 8 characters long");
          } else {
            setPasswordError("");
          }
        }}
      />
      {passwordError && <p className="error">{passwordError}</p>}
      <button>Register</button>
    </form>
  );
}
