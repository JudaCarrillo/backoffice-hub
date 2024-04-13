import { BrowserRouter } from "react-router-dom"
import { MyRoutes } from "./routers/routes"
import styled from "styled-components"
import { Sidebar } from "./components/sidebar"
import React, { useEffect, useMemo, useState } from "react"
import { Dark, Light } from "./styles/theme"
import {ThemeProvider} from 'styled-components'
import { Login } from "./pages/login"
import { BiCategory } from "react-icons/bi";
import { FaPeopleCarryBox } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineApartment } from "react-icons/ai";

export const ThemeContext = React.createContext(null);

function App() {

  const [theme, setTheme] = useState("light");
  const themeStyle = theme === "light" ? Light : Dark;

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPrivileges, setUserPrivileges] = useState([]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1300px)");

    const handleMediaChange = (e) => {
      setSidebarOpen(!e.matches); 
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  useEffect(() => {
    const loggedInState = localStorage.getItem('isLoggedIn');
    if (loggedInState === 'true') {
      const Privileges = localStorage.getItem('user');
      const privilegesObject = JSON.parse(Privileges);
      console.log(privilegesObject)
      setUserPrivileges(privilegesObject); // Almacena los privilegios en el estado del componente
      setIsLoggedIn(true);
      
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // redirecciona
    // Almacenar el estado de inicio de sesión en localStorage
    localStorage.setItem('isLoggedIn', 'true');
    window.location.reload('/product');
  };
  const getIconComponent = (iconName) => {
    switch (iconName) {
      case "AiOutlineApartment":
        return <AiOutlineApartment />;
      case "BiCategory":
        return <BiCategory />;
      case "FaPeopleCarryBox":
        return <FaPeopleCarryBox />;
      case "FaRegUser":
        return <FaRegUser />;
      default:
        return null; // Devuelve null si no se encuentra el icono
    }
  };
  const linksArray = useMemo(() => {
    if (userPrivileges === null) {
      return [];
    }
    const filteredPrivileges = userPrivileges.filter(privilege => privilege.route !== null);
    return filteredPrivileges.map(privilege => ({
      label: privilege.title,
      icon: getIconComponent(privilege.icon),
      to: `/${privilege.route}`
    }));
  }, [userPrivileges]);

  

  return (
    <>
    <ThemeContext.Provider value={{setTheme,theme}}>
      <ThemeProvider theme={themeStyle}>
        <BrowserRouter>
          {isLoggedIn ? (
                <Container className={sidebarOpen ? "sidebarState active" : ""}>
                  <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setIsLoggedIn={setIsLoggedIn} linksArray={linksArray} />
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
  grid-template-columns:90px 1fr;
  background:${({theme})=>theme.bgtotal};
  transition: 0.2s;
  &.active{
    grid-template-columns:300px auto;
  }
  // para cambiar el fondo a elección
  // color: ${({theme})=>theme.text}
`;
export default App
