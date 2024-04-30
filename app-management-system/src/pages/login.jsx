import { useState } from "react";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios, { AxiosError } from "axios";
import toast, { Toaster } from 'react-hot-toast';

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
    fontSize: 25px;
    textAlign: center;
    fontFamily: "Inter";
    fontWeight: 700;
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
   .notification{
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
  transition: .5s ease;
  &::placeholder {
    color: #94a3b8;
  }
  &:focus,&:hover {
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
  font-size: 18px;
  font-weight: bold;
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
      username: username,
      password: password,
    };

    try {
      const response = await axios.post(url, data);
      const {success, data: {privileges }} = response.data
      if(!success){
        throw new Error('Credenciales incorrectas');
      }
      onLoginSuccess(); // Si la solicitud es exitosa, llama a la función onLoginSuccess
      
      const Privileges = [...privileges]
      localStorage.setItem('user', JSON.stringify(Privileges));
      
    } catch (error) {
      
      if (error instanceof Error) {
        // Handle general errors
        toast.error(error.message);
      } else if (AxiosError.isAxiosError(error)) {
        // Handle Axios errors
        if (error.response.status === 409) {
          toast.error('Error: Invalid username');
        } else {
          toast.error('An unexpected error occurred. Please try again later.');
        }
      }
    }
  };
 
  const handleLogin = (e) => {
    e.preventDefault();
    enviarPeticion();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <LoginContainer>
      <LoginFormContainer>

        <LoginForm onSubmit={handleLogin}> {/* Agregamos el controlador de envío al formulario */}
          <Logocontent>
            <img src="./src/assets/logo.webp" alt="Logo" />
          </Logocontent>
          <h1>Inicio de Sesión</h1> {/* Ajustamos el espacio alrededor del texto de inicio de sesión */}
          <Toaster 
            toastOptions={{
              className: 'notification',
              position: 'bottom-center',
              duration: 3000,
              iconTheme: {
                primary: '#000',
              },
              style: {
                fontSize: '1rem',
                fontWeight: 500,
                borderRadius: '1rem',
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
          <LoginButton type="submit" >
            
            Iniciar sesión</LoginButton>{" "}
          {/* Cambiamos el tipo de botón a "submit" para enviar el formulario */}
        </LoginForm>
      </LoginFormContainer>
    </LoginContainer>
  );
}
