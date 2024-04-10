import React, { useState } from "react";
import styled from "styled-components";

function Login({ onLoginSuccess  }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Aquí podrías realizar la validación de las credenciales
    // Por ejemplo, puedes comparar las credenciales con credenciales predefinidas o hacer una solicitud a un servidor.
    // Si las credenciales son válidas, puedes llamar a la función onLogin para iniciar sesión.
    // Esto es solo un ejemplo de simulación de autenticación:
    if (username === "aea" && password === "123") {
        onLoginSuccess ();
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <Container>
      <h1>Login</h1>
      <form>
        <div>
          <label htmlFor="username">Nombre de usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleLogin}>
          Iniciar sesión
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
`;

export { Login };