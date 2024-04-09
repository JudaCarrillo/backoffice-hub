import { BrowserRouter } from "react-router-dom"
import { MyRoutes } from "./routers/routes"
import styled from "styled-components"
import { Sidebar } from "./components/sidebar"
import React, { useState } from "react"
import { Dark, Light } from "./styles/theme"
import {ThemeProvider} from 'styled-components'

export const ThemeContext = React.createContext(null);
function App() {
  const [theme, setTheme] = useState("light");
  const themeStyle=theme==="light" ? Light:Dark;
  
  const [sidebarOpen,setSidebarOpen] = useState(true);
  return (
    <>
    <ThemeContext.Provider value={{setTheme,theme}}>
      <ThemeProvider theme={themeStyle}>
        <BrowserRouter>
          <Container className={sidebarOpen?"sidebarState active" : ""}>
              <Sidebar sidebarOpen=
              {sidebarOpen}
              setSidebarOpen=
              {setSidebarOpen}/>
              <MyRoutes />
          </Container>
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
