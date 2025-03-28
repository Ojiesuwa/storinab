import "./Button.css";
import Loading from "../../assets/loading.gif";
const Button: React.FC<{
  type: any;
  isLoading: any;
  text: any;
  loadingText: any;
  onClick: any;
  className: any;
  disabled: any;
}> = ({ type, isLoading, text, loadingText, onClick, className, disabled }) => {
  if (!isLoading)
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`Button ${className}`}
      >
        {text}
      </button>
    );
  else
    return (
      <button className={`loading-btn ${className}`}>
        <img src={Loading} alt="" />
        {loadingText}
      </button>
    );
};

export default Button;
