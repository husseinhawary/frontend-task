import { useContext } from "react";

import { Link, useHistory } from "react-router-dom";
import { Button, Icon, Menu } from "semantic-ui-react";

import logo from "../../../assets/logo.jpeg";
import AuthContext from "../../../store/auth-context";

import { en } from "./locale/en";

import "./header.css";

const Header = () => {
  const authCtx = useContext(AuthContext);

  const history = useHistory()

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
    history.replace("/")
  }
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="there isn't logo" />
      </div>
      <nav className="nav-links">
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/login"><Button>{en.nav.login}</Button></Link>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <Link to="/categories"><Button>{en.nav.menuData}</Button></Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Menu compact color="grey">
                <Menu.Item>
                  <Icon name="user outline" /> {en.nav.welcomeMessage}
                </Menu.Item>
              </Menu>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <Button onClick={logoutHandler}>{en.nav.logout}</Button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
