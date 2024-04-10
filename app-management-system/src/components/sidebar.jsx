import styled from "styled-components"
import logo from "../assets/logo.png"
import { v } from "../styles/variables";
import { AiOutlineLeft,AiOutlineApartment } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { FaPeopleCarryBox } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { NavLink,useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../App";

export function Sidebar({sidebarOpen,setSidebarOpen}) {
    
    const ModSidebarOpen=()=>{
        setSidebarOpen(!sidebarOpen)
    };
    const {setTheme,theme} = useContext(ThemeContext)
    const cambiarTheme = () =>{
        setTheme((theme)=>(theme===
        "light" ? "dark" : "light"));
    };

    const salir = () => {
        // Aquí cambias el estado de inicio de sesión a false
        // Suponiendo que tienes acceso a la función setIsLoggedIn en tu componente padre
        setIsLoggedIn(false);
    };
    return (
        <Container isopen = {sidebarOpen} themeuse={theme}>
            <button className="sidebarButton" onClick={ModSidebarOpen}>
                <AiOutlineLeft />
            </button>
            <div className="LogoContent">
                <div className="imgContent">
                    <img src={logo} alt="Logo de la aplicación"/>
                </div>
                <h2>
                    Logo
                </h2>
            </div>
            {linksArray.map(({icon,label,to})=>(
                <div className="LinkContainer" key={label} >
                    <NavLink to={to}  className={({isActive})=>`Links${isActive?` active`:``}`}>
                        <div className="LinkIcon">
                            {icon}
                        </div>
                        {sidebarOpen && (
                            <span>{label}</span>
                        )}
                    </NavLink>
                </div>
            ))}
            <Divider/>

            <div className="ThemeContent">
                {sidebarOpen && 
                <span className="titleTheme">Dark Mode</span>
                }
                <div className="toggleContent">
                    <div className="grid theme-container">
                        <div className="content">
                            <div className="demo">
                                <label className="switch">
                                    <input type="checkbox" className="theme-swither"
                                    onClick={cambiarTheme}></input>
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {secundaryLinksArray.map(({icon,label,to})=>(
                <div className="LinkContainer salirbutton" key={label}>
                    <NavLink to={to} onClick={salir} className={({isActive})=>`Links${isActive?` active`:``}`}>
                        <div className="LinkIcon">
                            {icon}
                        </div>
                        {sidebarOpen && (
                            <span>{label}</span>
                        )}
                    </NavLink>
                </div>
            ))}
        </Container>
    );
}
// #REGION DATA LINKS
    const linksArray = [
    {
        label: "Productos",
        icon: <AiOutlineApartment />,
        to: "/"
    },
    {
        label: "Categoria",
        icon: <BiCategory />,
        to: "/categoria"
    },
    {
        label: "Proveedores",
        icon: <FaPeopleCarryBox />,
        to: "/proveedores"
    },
    {
        label: "Usuarios",
        icon: <FaRegUser />,
        to: "/usuarios"
    }
]
// #ENDREGION

// #REGION DATA LINKS SECUNDARY
const secundaryLinksArray = [
    {
        label: "Salir",
        icon: <ImExit />,
        to: "/login"
    }
]
// #ENDREGION

// #REGION STYLED CONTAINER
    const Container = styled.div`
        color: ${(props)=>props.theme.text};
        background: ${(props)=>props.theme.bg};
        position: sticky;
        padding-top: ${({ isopen }) => (isopen ? `30%` : `100px`)};
        .sidebarButton{
            position: absolute;
            top: 10px;
            right: 17px;
            width: 50px;
            height: 50px;
            border: none;
            letter-spacing: inherit;
            color: inherit;
            font-size: inherit;
            padding: 0;
            font-family: inherit;
            outline: none;
            background: transparent;
            /* box-shadow: 0 0 4px ${(props)=>props.
            theme.bg3},0 0 7px ${(props)=>props.theme.bg}; */
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s;
            transform: ${({ isopen }) => (isopen ? `initial` : `rotate(180deg)`)};
                svg{
                    font-size: 30px
                }
        }

        .LogoContent{
            display: flex;
            justify-content: center;
            align-items: center;
            padding-bottom: 90px;
            gap:20px;
            .imgContent{
                display: flex;
                img {
                    max-width: 100%;
                    width: 40px;
                    height: auto;
                }
                cursor: pointer;
                transition: all 0.3s;
                transform: ${({ isopen }) => (isopen ? `scale(1.9)` : `scale(1.9)`)};
                
            }
            h2 {
                display: ${({ isopen }) => (isopen ? `block` : `none`)};
            }
        }

        .LinkContainer{
            margin: 30px 0;
            padding: 0 15%;
                
                :hover{
                    background: ${(props)=>props.theme.bg3};
                }
                span{
                    font-weight: 600;
                }
                .Links{
                    display: flex;
                    align-items: center;
                    text-decoration: none;
                    padding: calc(${v.smSpacing} - 2px) 0;
                    color: ${(props)=>props.theme.text};
                    .LinkIcon{
                        padding: ${v.smSpacing} ${v.mdSpacing};
                        display: flex;
                        svg{
                            font-size: 30px;
                        }
                    }
                    &.active{
                        transition: all 0.3s;
                        background: ${(props)=>props.theme.bg3};
                        
                        span{
                            color: ${(props)=>props.theme.bg4};
                        }
                        .LinkIcon{
                            
                            svg{
                                color: ${(props)=>props.theme.bg4};
                            }
                            
                        }
                    }
                }
                
        }
        .salirbutton{
            position: relative;
            top: 20px;
            left: 1px;
        }
        .ThemeContent{
            padding: ${({ isopen }) => (isopen ? `10% 10%` : `60px 0px 40px`)};
            display: flex;
            align-items: center;
            justify-content: space-between;
                .titleTheme{
                    display: block;
                    padding: 10px;
                    font-weight: 700;
                    opacity: ${({isopen})=>(isopen?`1`:`0`)};
                    transition: all 0.3s;
                    white-space: nowrap;
                    overflow:hidden;
                }
                .toggleContent{
                    margin: ${({isopen})=>(isopen?`auto 40px`:`auto 15px`)};
                    width: 36px;
                    height: 20px;
                    border-radius: 10px;
                    transition:all 0.1s;
                    position: relative;
                }
                .theme-container{
                    background-blend-mode: multiply, multiply;
                    transition: 0.4s;
                    .grid{
                        display: grid;
                        justify-items: center;
                        align-content:center;
                        height: 100vh;
                        width: 100vw;
                        font-family:"Lato", sans-serif;
                    } 
                    .demo{
                        font-size: 32px;
                        .switch{
                            position: relative;
                            display: inline-block;
                            width: 60px;
                            height: 34px;
                            .theme-swither{
                                width: 0;
                                height: 0;
                                opacity: 0;
                                &:checked+.slider:before{
                                    left: -8px;
                                    content: "⚫";
                                    font-size: 33px;
                                    transform: translateX(26px);
                                }
                            }
                            .slider{
                                position: absolute;
                                cursor: pointer;
                                border:1px solid;
                                top: -5.4px;
                                left: 0;
                                right: 0;
                                bottom: 5px;
                                background: ${({themeuse})=>(themeuse==="light" ? v.lightbackground : v.checkbox)};
                                transition: 0.3s;
                                &::before{
                                    position: absolute;
                                    content: "⚪";
                                    font-size: 33px;
                                    height: 0px;
                                    width: 0px;
                                    left: -10px;
                                    top: 14px;
                                    line-height: 0;
                                    transition: 0.4s;
                                }
                                &.round{
                                    border-radius: 34px;
                                    &::before{
                                        border-radius: 50%;
                                    }
                                }
                            }
                        }
                    }
                    
               }
        }
        @media (max-width: 1300px) {
            padding-top: ${({ isopen }) => (isopen ? `30%` : `100px`)};
        }
    `;
// #ENDREGION

// #REGION STYLED COMPONENTS DIVISOR
const Divider = styled.div`
    height: 1px;
    width: 100%;
    background: ${(props)=>props.theme.bg3};
    margin-bottom: 40px;

`;
// #ENDREGION