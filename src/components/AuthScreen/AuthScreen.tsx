import "./AuthScreen.css";
import siteLogo from "../../assets/storinab-logo.png";
import ContinueWithGoogle from "../ContinueWithGoogle/ContinueWithGoogle";
import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
const AuthScreen: React.FC<{ isVisible: boolean; hideVisibility: any }> = ({
  isVisible,
  hideVisibility,
}) => {
  const [authType, setAuthType] = useState(true);

  if (!isVisible) return;
  return (
    <div className={"auth-screen " + (authType ? "items-center" : "")}>
      <div className="auth-main">
        <div className="auth-control-cont">
          <i className="fa-light fa-xmark" onClick={hideVisibility}></i>
        </div>
        <div className="auth-logo-wrapper">
          <img src={siteLogo} alt="/logo" className="auth-logo" />
        </div>

        {authType ? (
          <LoginComponent setAuthType={() => setAuthType(false)} />
        ) : (
          <SignupComponent setAuthType={() => setAuthType(true)} />
        )}
      </div>
    </div>
  );
};

export default AuthScreen;

const LoginComponent: React.FC<{ setAuthType: any }> = ({ setAuthType }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login(formData);
  };
  return (
    <div className="w-full login-component auth-component fade">
      <h3 className="mb-2">Sign in</h3>
      <ContinueWithGoogle />
      <div className="flex items-center w-full gap-3 sep">
        <div className="line"></div>
        <p className="small-text shrink-0">or</p>
        <div className="line"></div>
      </div>
      <form
        className="auth-form"
        onSubmit={handleFormSubmit}
        onChange={handleChange}
      >
        <div className="form-item">
          <p>Email</p>
          <input type="text" placeholder="Enter email here" name="email" />
        </div>
        <div className="form-item">
          <p>Password</p>
          <input
            type="password"
            placeholder="Enter email here"
            name="password"
          />
        </div>
        <button type="submit" className="button-blue">
          Login
        </button>
        <p
          className="small-text text-center w-full alt-auth"
          onClick={setAuthType}
        >
          Create an account
        </p>
      </form>
    </div>
  );
};

const SignupComponent: React.FC<{ setAuthType: any }> = ({ setAuthType }) => {
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signup(formData);

    console.log(e);
  };
  return (
    <div className="w-full login-component auth-component fade">
      <h3 className="mb-2">Sign up</h3>
      <ContinueWithGoogle />
      <div className="flex items-center w-full gap-3 sep">
        <div className="line"></div>
        <p className="small-text shrink-0">or</p>
        <div className="line"></div>
      </div>
      <form
        className="auth-form"
        onSubmit={handleFormSubmit}
        onChange={handleChange}
      >
        <div className="form-item">
          <p>Full name</p>
          <input
            type="text"
            placeholder="E.g John Doe"
            name="fullname"
            required
          />
        </div>

        <div className="form-item">
          <p>Email</p>
          <input
            type="email"
            placeholder="Enter email here"
            name="email"
            required
          />
        </div>
        <div className="form-item">
          <p>Password</p>
          <input
            type="password"
            placeholder="Enter email here"
            name="password"
            required
          />
        </div>
        <button type="submit" className="button-blue">
          Signup
        </button>
        <p
          className="small-text text-center w-full alt-auth"
          onClick={setAuthType}
        >
          Login to account
        </p>
      </form>
    </div>
  );
};
