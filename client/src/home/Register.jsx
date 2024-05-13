import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const subTitle = "Save The Day";
const title = (
  <h2 className="title">
    Join on Day Long Free WorkShop for{" "}
    <b>
      Advance <span>Mastering</span>
    </b>
    on Sales
  </h2>
);

const desc = "Limited Time Offer! Hurry Up!";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [errorMessage, setErrorMessage] = useState("");
  const { registerUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handleSignup = async (e) => {
    e.preventDefault();
    const form = e.target;
    const username = form.name.value;
    const phone_number = form.phone_number.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      setErrorMessage("Password does not match");
      return;
    } else {
      setErrorMessage("");
      registerUser(username, email, password, phone_number)
        .then((userCredentical) => {
          const user = userCredentical.user;
          enqueueSnackbar("Register successfully", { variant: "success" });
          navigate(from, { replace: true });
        })
        .catch((error) => {
          console.log(error.message);
          alert(`${error.message}`);
        });
    }
  };

  return (
    <section className="register-section padding-tb pb-0">
      <div className="container">
        <div className="row g-4 row-cols-lg-2 row-cols-1 align-items-center">
          <div className="col">
            <div className="section-header">
              <span className="subtitle">{subTitle}</span>
              {title}
              <p>{desc}</p>
            </div>
          </div>
          <div className="col">
            <div className="section-wrapper">
              <h4>Register Now</h4>
              <form action="" className="register-form" onSubmit={handleSignup}>
                <input
                  type="text"
                  name="name"
                  placeholder="Username"
                  className="reg-input"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="reg-input"
                  required
                />
                <input
                  type="number"
                  name="phone_number"
                  placeholder="Phone"
                  className="reg-input"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="reg-input"
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="reg-input"
                  required
                />
                <div>
                  {errorMessage && (
                    <div className="error-message text-danger mb-1">
                      {errorMessage}
                    </div>
                  )}
                </div>
                <button type="submit" className="lab-btn">
                  Register Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
