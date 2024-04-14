import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styled from "styled-components";
import { Opulento } from "uvcanvas";
import { login } from "../api/auth";

const LoginContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
`;

const OpulentoBackground = styled(Opulento)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const LoginFormContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 50px;
  border-radius: 5%;
  padding-top: 100px; /* Ajustamos el espacio superior del contenedor del formulario */
  padding-bottom: 200px; /* Ajustamos el espacio inferior del contenedor del formulario */
`;

const LoginForm = styled.form`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  margin-bottom: 20px; /* Aumentamos el espacio entre los contenedores de entrada */
  width: 100%;
  position: relative;
`;

const LoginInput = styled.input`
  width: calc(
    100% - 40px
  ); /* Ajustamos el ancho del input para dejar espacio para el botón */
  padding: 15px; /* Aumentamos el padding */
  border: 1px solid #ccc;
  border-radius: 8px; /* Aumentamos el border-radius */
  font-size: 16px; /* Aumentamos el tamaño del texto */
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const LoginButton = styled.button`
  width: 100%;
  margin-top: 50px; /* Aumentamos el espacio entre el último contenedor de entrada y el botón */
  padding: 15px; /* Aumentamos el padding */
  border: 1px solid #000;
  border-radius: 8px; /* Aumentamos el border-radius */
  background-color: #000;
  color: #fff;
  font-size: 18px; /* Aumentamos el tamaño del texto */
  font-weight: bold; /* Hacemos el texto en negrita */
  cursor: pointer;
`;

export function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const enviarPeticion = async () => {
    const data = {
      username: username,
      password: password,
    };

    try {
      const response = await login(data);
      const {
        success,
        data: { privileges },
      } = response.data;
      if (!success) {
        console.log(success);
      }
      onLoginSuccess(); // Si la solicitud es exitosa, llama a la función onLoginSuccess

      const Privileges = [...privileges];
      localStorage.setItem("user", JSON.stringify(Privileges));
    } catch (error) {
      console.error("Error al realizar la petición:", error);
      alert("Credenciales incorrectas"); // Muestra una alerta si hay un error en la solicitud
    }
  };

  const handleLogin = (e) => {
    e.preventDefault(); // Evita que el formulario se envíe al hacer clic en el botón
    enviarPeticion(); // Llama a la función para enviar la petición POST
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <LoginContainer>
      <OpulentoBackground />
      <LoginFormContainer>
        <LoginForm onSubmit={handleLogin}>
          {" "}
          {/* Agregamos el controlador de envío al formulario */}
          <h1
            style={{
              marginBottom: "100px",
              fontSize: "40px",
              textAlign: "center",
              fontFamily: "",
              fontWeight: "700",
              fontStyle: "normal",
            }}
          >
            Inicio de Sesión
          </h1>{" "}
          {/* Ajustamos el espacio alrededor del texto de inicio de sesión */}
          <InputContainer>
            <LoginInput
              type="text"
              autoComplete="username"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <LoginInput
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <ToggleButton type="button" onClick={togglePasswordVisibility}>
              {" "}
              {/* Cambiamos el tipo de botón a "button" */}
              {showPassword ? (
                <FaEyeSlash size={20} />
              ) : (
                <FaEye size={20} />
              )}{" "}
              {/* Usamos íconos de React Icons */}
            </ToggleButton>
          </InputContainer>
          <LoginButton type="submit">Iniciar sesión</LoginButton>{" "}
          {/* Cambiamos el tipo de botón a "submit" para enviar el formulario */}
        </LoginForm>
      </LoginFormContainer>
    </LoginContainer>
  );
}
