import "./ContinueWithGoogle.css";
import GoogleImage from "../../assets/google.png";
import useAuth from "../../hooks/useAuth";

const ContinueWithGoogle = () => {
  const { continueWithGoogle } = useAuth();
  const handleClick = () => {
    try {
      continueWithGoogle();
    } catch (error) {}
  };
  return (
    <button className="continue-with-google" onClick={handleClick}>
      Continue with google
      <img src={GoogleImage} alt="" />
    </button>
  );
};

export default ContinueWithGoogle;
