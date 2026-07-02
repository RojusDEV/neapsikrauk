import { NavLink } from "react-router";
import { Button } from "../ui/button";
import './Header.scss';

const Header = () => {
  return (
    <header className="landing-page__header">
      <div className="header-wrapper">
        <NavLink to="/" className="header-logo">
          neapsikrauk
        </NavLink>
        <div className="header-auth-buttons">
          <Button
            variant="ghost"
            className="auth-button"
            aria-label="sigin button"
          >
            <NavLink to="/auth/signin">Prisijungti</NavLink>
          </Button>
          <Button
            variant="default"
            id="signup-btn"
            className="auth-button"
            aria-label="signup button"
          >
            <NavLink to="/auth/signup">Registruotis</NavLink>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
