import "./Account.css";
import UnknownImage from "../../assets/unknown.jpg";

const Account = () => {
  return (
    <div className="account">
      <div className="account-main">
        <div className="left-wrapper fade-right">
          <img src={UnknownImage} alt="" />
        </div>
        <div className="right-wrapper fade-left">
          <div className="header-wrapper">
            <p>Edit profile</p>
            <i className="fa-light fa-pen"></i>
          </div>
          <div className="form-item">
            <h5>Full name</h5>
            <input
              type="text"
              placeholder="Enter value here"
              value={"Oluwarotimi Temidire"}
            />
          </div>
          <div className="form-item">
            <h5>Email</h5>
            <input
              type="text"
              placeholder="Enter value here"
              value={"oluwarotimiadeola@gmail.com"}
            />
          </div>
          <div className="form-item">
            <h5>Phone</h5>
            <input
              type="text"
              placeholder="Enter value here"
              value={"0808 323 1987"}
            />
          </div>
          <div className="form-item">
            <h5>Address</h5>
            <input
              type="text"
              placeholder="Enter value here"
              value={"13 Bobajiro Street Magbon Lagos"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
