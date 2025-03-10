import "./LoadingScreen.css";
import SiteLogo from "../../assets/storinab-logo.png";

const LoadingScreen: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  if (!isVisible) return;
  return (
    <div className="loading-screen">
      <img
        src={SiteLogo}
        alt=""
        className="loading-image anim-infinite-scale"
      />
    </div>
  );
};

export default LoadingScreen;
