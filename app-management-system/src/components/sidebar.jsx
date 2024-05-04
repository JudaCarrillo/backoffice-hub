import { useContext, useEffect, useMemo, useState } from "react";
import { AiOutlineApartment, AiOutlineLeft } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { FaPeopleCarry, FaRegUser } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { NavLink } from "react-router-dom";
import styled, { StyleSheetManager } from "styled-components";
import { ThemeContext } from "../App";
import logo from "../assets/logo.webp";
import { v } from "../styles/variables";

export function Sidebar({ sidebarOpen, setSidebarOpen, setIsLoggedIn }) {
  const [userPrivileges, setUserPrivileges] = useState([]);
  const [userState, setUserState] = useState({
    photo: "",
    name: "",
  });

  const ModSidebarOpen = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const { setTheme, theme } = useContext(ThemeContext);
  const cambiarTheme = () => {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const item = localStorage.getItem("user");
    if (item) {
      const { privileges, user } = JSON.parse(item);
      setUserPrivileges(privileges);
      setUserState(user);
    }
  }, []);

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case "AiOutlineApartment":
        return <AiOutlineApartment />;
      case "BiCategory":
        return <BiCategory />;
      case "FaPeopleCarry":
        return <FaPeopleCarry />;
      case "FaRegUser":
        return <FaRegUser />;
      default:
        return null;
    }
  };
  const linksArray = useMemo(() => {
    if (userPrivileges === null) {
      return [];
    }
    const filteredPrivileges = userPrivileges.filter(
      (privilege) => privilege.route !== null
    );
    return filteredPrivileges.map((privilege) => ({
      label: privilege.title,
      icon: getIconComponent(privilege.icon),
      to: `/${privilege.route}`,
    }));
  }, [userPrivileges]);

  const salir = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    window.location.href = "/";
  };
  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== "isopen"}>
      <Container isopen={sidebarOpen} themeuse={theme}>
        <button className="sidebarButton" onClick={ModSidebarOpen}>
          <AiOutlineLeft />
        </button>
        <div className="LogoContent">
          <div className="imgContent">
            <img src={logo} alt="Logo de la aplicación" />
          </div>
          <h2 className="text-2xl font-bold">ROMER</h2>
        </div>
        {linksArray.map(({ icon, label, to }) => (
          <div className="LinkContainer" key={label}>
            <NavLink
              to={to}
              className={({ isActive }) => `Links${isActive ? " active" : ""}`}
            >
              <div className="LinkIcon">{icon}</div>
              {sidebarOpen && <span>{label}</span>}
            </NavLink>
          </div>
        ))}
        <Divider />

        <div className="ThemeContent">
          {sidebarOpen && <span className="titleTheme">Dark Mode</span>}
          <div className="toggleContent">
            <div className="grid theme-container">
              <div className="content">
                <div className="demo">
                  <label className="switch">
                    <input
                      type="checkbox"
                      className="theme-swither"
                      onClick={cambiarTheme}
                    />
                    <span className="slider round" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        {secundaryLinksArray.map(({ icon, label, to }) => (
          <div className="LinkContainer salirbutton" key={label}>
            <NavLink
              to={to}
              onClick={salir}
              className={({ isActive }) => `Links${isActive ? " active" : ""}`}
            >
              <div className="LinkIcon">{icon}</div>
              {sidebarOpen && <span>{label}</span>}
            </NavLink>
          </div>
        ))}
        <Divider />
        <div className="relative -ml-10 w-full h-10">
          <div className="flex items-center justify-center gap-4 w-full h-full">
            {sidebarOpen && (
              <>
                <img
                  className={`w-14 h-14 rounded-full ${
                    sidebarOpen ? "" : "ml-20"
                  }`}
                  src={userState.photo}
                  alt={userState.name}
                />
                <span className="font-semibold text-xl text-neutral-800">
                  {userState.name}
                </span>
              </>
            )}
            {!sidebarOpen && (
              <img
                className="ml-20 w-14 h-14 rounded-full"
                src={userState.photo}
                alt={userState.name}
              />
            )}
          </div>
        </div>
      </Container>
    </StyleSheetManager>
  );
}
// #REGION DATA LINKS

// #ENDREGION

// #REGION DATA LINKS SECUNDARY
const secundaryLinksArray = [
  {
    label: "Salir",
    icon: <ImExit />,
    to: "/login",
  },
];
// #ENDREGION

// #REGION STYLED CONTAINER
const Container = styled.div`
  color: ${(props) => props.theme.text};
  background: ${(props) => props.theme.bg};
  position: sticky;
  padding-top: ${({ isopen }) => (isopen ? "30%" : "100px")};
  .sidebarButton {
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
    /* box-shadow: 0 0 4px ${(props) => props.theme.bg3},0 0 7px ${(props) =>
      props.theme.bg}; */
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    transform: ${({ isopen }) => (isopen ? "initial" : "rotate(180deg)")};
    svg {
      font-size: 30px;
    }
  }

  .LogoContent {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 30px;
    gap: 20px;
    .imgContent {
      display: flex;
      img {
        max-width: 100%;
        width: 40px;
        height: auto;
      }
      cursor: pointer;
      transition: all 0.3s;
      transform: ${({ isopen }) => (isopen ? "scale(1.9)" : "scale(1.9)")};
    }
    h2 {
      display: ${({ isopen }) => (isopen ? "block" : "none")};
    }
  }

  .LinkContainer {
    margin: 30px 0;
    padding: 0 15%;

    :hover {
      background: ${(props) => props.theme.bg3};
    }
    span {
      font-weight: 600;
    }
    .Links {
      display: flex;
      align-items: center;
      text-decoration: none;
      padding: calc(${v.smSpacing} - 2px) 0;
      color: ${(props) => props.theme.text};
      .LinkIcon {
        padding: ${v.smSpacing} ${v.mdSpacing};
        display: flex;
        svg {
          font-size: 30px;
        }
      }
      &.active {
        transition: all 0.3s;
        background: ${(props) => props.theme.bg3};

        span {
          color: ${(props) => props.theme.bg4};
        }
        .LinkIcon {
          svg {
            color: ${(props) => props.theme.bg4};
          }
        }
      }
    }
  }
  .salirbutton {
    position: relative;
    left: 1px;
  }
  .ThemeContent {
    padding: ${({ isopen }) => (isopen ? "1% 15%" : "")};
    display: flex;
    align-items: center;
    justify-content: space-between;
    .titleTheme {
      display: block;
      padding: 10px;
      font-weight: 700;
      opacity: ${({ isopen }) => (isopen ? "1" : "0")};
      transition: all 0.3s;
      white-space: nowrap;
      overflow: hidden;
    }
    .toggleContent {
      margin: ${({ isopen }) => (isopen ? "auto 40px" : "auto 15px")};
      width: 36px;
      height: 20px;
      border-radius: 10px;
      transition: all 0.1s;
      position: relative;
    }
    .theme-container {
      background-blend-mode: multiply, multiply;
      transition: 0.4s;
      .grid {
        display: grid;
        justify-items: center;
        align-content: center;
        height: 100vh;
        width: 100vw;
        font-family: "Lato", sans-serif;
      }
      .demo {
        font-size: 32px;
        .switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
          .theme-swither {
            width: 0;
            height: 0;
            opacity: 0;
            &:checked + .slider:before {
              left: -8px;
              content: "⚫";
              font-size: 33px;
              transform: translateX(26px);
            }
          }
          .slider {
            position: absolute;
            cursor: pointer;
            border: 1px solid;
            top: -5.4px;
            left: 0;
            right: 0;
            bottom: 5px;
            background: ${({ themeuse }) =>
              themeuse === "light" ? v.lightbackground : v.checkbox};
            transition: 0.3s;
            &::before {
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
            &.round {
              border-radius: 34px;
              &::before {
                border-radius: 50%;
              }
            }
          }
        }
      }
    }
  }
  @media (max-width: 1300px) {
    padding-top: ${({ isopen }) => (isopen ? "30%" : "100px")};
  }
`;
// #ENDREGION

// #REGION STYLED COMPONENTS DIVISOR
const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: ${(props) => props.theme.bg3};
  margin-bottom: 40px;
`;
// #ENDREGION
