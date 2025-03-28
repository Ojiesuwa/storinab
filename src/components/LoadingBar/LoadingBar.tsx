import "./LoadingBar.css";

const LoadingBar: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  if (!isVisible) return;
  return (
    <div className="loading-container fade">
      <div className="loading-bar"></div>
    </div>
  );
};

export default LoadingBar;
