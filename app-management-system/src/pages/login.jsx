import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styled from "styled-components";
import { login } from "../services/auth";

const LoginContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(#888888, #000000);
`;

const LoginFormContainer = styled.div`
  position: absolute;
  width: 400px;
  height: 80vh;
  min-width: 400px;
  max-width: 400px;
  min-height: 75vh;
  max-height: 80vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(to bottom right, #b0b0b0 50%, #3d3d3d 100%);
  padding: 50px;
  border-radius: 1rem;
  padding-top: 100px; /* Ajustamos el espacio superior del contenedor del formulario */
  padding-bottom: 200px; /* Ajustamos el espacio inferior del contenedor del formulario */
  h1 {
    margin-bottom: 50px;
    fontsize: 25px;
    textalign: center;
    fontfamily: "Inter";
    fontweight: 700;
  }
`;

const Logocontent = styled.div`
  display: flex;
  margin-bottom: 20px;
  margin-top: -60px;
  width: 200px;
  height: 200px;
  justify-content: center;
  align-items: center;
  img {
    width: 90%;
    height: 90%;
  }
`;

const LoginForm = styled.form`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .notification {
    position: relative;
    color: #000;
    bottom: 80px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  line-height: 30px;
  margin-bottom: 20px;
  align-items: center;
  position: relative;
  width: 100%;
`;

const LoginInput = styled.input`
  width: 100%;
  height: 45px;
  line-height: 30px;
  font-size: 16px;
  padding: 0 1rem;
  border: 2px solid transparent;
  border-radius: 10px;
  outline: none;
  background-color: #f8fafc;
  color: #0d0c22;
  transition: 0.5s ease;
  &::placeholder {
    color: #94a3b8;
  }
  &:focus,
  &:hover {
    outline: none;
    border-color: rgb(85 79 79);
    background-color: #fff;
    box-shadow: 0 0 0 5px rgb(85 79 79 / 30%);
  }
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
  border: none;
  border-radius: 8px; /* Aumentamos el border-radius */
  background-color: #000;
  color: #fff;
  font-size: 18px; /* Aumentamos el tamaño del texto */
  font-weight: bold; /* Hacemos el texto en negrita */
  cursor: pointer;
  &:hover {
    background-color: #fff;
    color: #000;
    transition: 0.5s ease;
  }
`;

export function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const enviarPeticion = async () => {
    const data = {
      email: username,
      password: password,
    };

    try {
      const response = await login(data);

      const {
        success,
        data: { user, privileges },
      } = response.data;

      if (!success) {
        throw new Error("Credenciales incorrectas");
      }

      const items = JSON.stringify({ privileges: [...privileges], user });
      onLoginSuccess();
      localStorage.setItem("user", items);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "An unexpected error occurred. Please try again later.";

      toast.error(message);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    enviarPeticion();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <LoginContainer>
      <LoginFormContainer>
        <LoginForm onSubmit={handleLogin}>
          <Logocontent>
            <img src="./src/assets/logo.webp" alt="Logo" />
          </Logocontent>
          <h1>Inicio de Sesión</h1>
          <Toaster
            toastOptions={{
              className: "notification",
              position: "bottom-center",
              duration: 3000,
              iconTheme: {
                primary: "#000",
              },
              style: {
                fontSize: "1rem",
                fontWeight: 500,
                borderRadius: "1rem",
              },
            }}
          />
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
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <ToggleButton type="button" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </ToggleButton>
          </InputContainer>
          <button type="button" onClick={() => setIsForgotPassword()}>
            Recuperar contraseña
          </button>
          <LoginButton type="submit">Iniciar sesión</LoginButton>
        </LoginForm>
      </LoginFormContainer>
    </LoginContainer>
  );
}
