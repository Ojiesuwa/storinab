import "./Logo.css";
import LogoImage from "../../assets/logo-white.png";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div className="logo" onClick={() => navigate(routes.home.base)}>
      <img src={LogoImage} alt=".logo" className="logo-image" />
      <h3 className="logo-text">Storinab</h3>
    </div>
  );
};

export default Logo;
