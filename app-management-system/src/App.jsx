import { BrowserRouter,Route  } from "react-router-dom"
import { MyRoutes } from "./routers/routes"
import styled from "styled-components"
import { Sidebar } from "./components/sidebar"
import React, { useEffect, useState } from "react"
import { Dark, Light } from "./styles/theme"
import {ThemeProvider} from 'styled-components'
import { Login } from "./pages/login"

export const ThemeContext = React.createContext(null);

function App() {

  const [theme, setTheme] = useState("light");
  const themeStyle = theme === "light" ? Light : Dark;

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1300px)");

    const handleMediaChange = (e) => {
      setSidebarOpen(!e.matches); 
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);
  useEffect(() => {
    // Verificar el estado de inicio de sesión almacenado en localStorage
    const loggedInState = localStorage.getItem('isLoggedIn');
    if (loggedInState === 'true') {
      setIsLoggedIn(true);
    }
  }, []);
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    // Almacenar el estado de inicio de sesión en localStorage
    localStorage.setItem('isLoggedIn', 'true');
  };

  
  return (
    <>
    <ThemeContext.Provider value={{setTheme,theme}}>
      <ThemeProvider theme={themeStyle}>
        <BrowserRouter>
          {isLoggedIn ? (
                <Container className={sidebarOpen ? "sidebarState active" : ""}>
                  <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setIsLoggedIn={setIsLoggedIn} />
                  <MyRoutes />
                </Container>
              ) : (<Login setIsLoggedIn={setIsLoggedIn} onLoginSuccess={handleLoginSuccess} />)
          }
        </BrowserRouter>
      </ThemeProvider>
    </ThemeContext.Provider>
    </>
  )
}
const Container = styled.div`
  display:grid;
  grid-template-columns:90px auto;
  background:${({theme})=>theme.bgtotal};
  transition: 0.2s;
  &.active{
    grid-template-columns:300px auto;
  }
  // para cambiar el fondo a elección
  // color: ${({theme})=>theme.text}
`;
export default App
