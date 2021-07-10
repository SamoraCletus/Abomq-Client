import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Icon, Loader } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import play from "../images/undraw_press_play_bx2d.svg";
import rocket from "../images/undraw_maker_launch_crhe.svg";
import "../components/Login.css";
import { useForm } from "../utils/hooks";
import { LOGIN_USER, REGISTER_USER } from "../queries/Quieries";
import { AuthContext } from "../context/auth";
import { useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Login(props) {
  const pathname = window.location.pathname;
  const [errors, setErrors] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [active, setActive] = useState(false);
  const [next, setNext] = useState(false);
  useEffect(() => {
    if (pathname === "/register") {
      setActive(true);
      setErrors({});
    } else {
      setActive(false);
      setErrors({});
    }
  }, [pathname]);
  const context = useContext(AuthContext);
  const { onChange, onSubmit, values } = useForm(
    active ? registerUser : loginUserCallback,
    {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      age: "",
    }
  );
  if (startDate) {
    let age = startDate.getFullYear();
    values.age = age.toString();
  }
  const [loginUser] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });
  function loginUserCallback() {
    loginUser();
  }
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      setNext(false);
    },
    variables: values,
  });
  function registerUser() {
    addUser();
  }

  return (
    <div className={`container ${active && `signMode`}`}>
      <div className="form-container">
        {Object.keys(errors).length > 0 && (
          <div className="ui error message">
            <ul className="list">
              {Object.values(errors).map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        )}
        {loading ? (
          <Loader />
        ) : (
          <div className="signin-signup">
            <Form onSubmit={onSubmit} className="sign-form sign-in-form ">
              <h2 className="form-title">Sign in</h2>
              <div className="input-field">
                <Icon name="user" />
                <input
                  type="text"
                  name="username"
                  value={values.username}
                  onChange={onChange}
                  placeholder="Username"
                />
              </div>
              <div className="input-field">
                <Icon name="lock" />
                <input
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={onChange}
                  placeholder="Password"
                />
              </div>
              <Button type="submit" className="sign-up-button">
                LOGIN
              </Button>
            </Form>
            <Form
              className={`${
                loading ? "loading" : next && `nextForm`
              } sign-form sign-up-form one `}
            >
              <h2 className="form-title">Sign Up</h2>
              <div className="input-field">
                <Icon name="user" />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={values.username}
                  onChange={onChange}
                />
              </div>
              <div className="input-field">
                <Icon name="envelope" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={onChange}
                />
              </div>

              <div className="input-field">
                <Icon name="calendar alternate outline" />
                <DatePicker
                  name="age"
                  onChange={(date) => setStartDate(date)}
                  placeholderText="Date of birth"
                  popperPlacement="top"
                  selected={startDate}
                  showYearDropdown
                />
              </div>
              <h6>your date of birth is private and no one can see your age</h6>
              <Button className="sign-up-button" onClick={() => setNext(true)}>
                NEXT
              </Button>
            </Form>

            <Form
              onSubmit={onSubmit}
              className={` ${
                loading ? "loading" : next && `nextForm`
              } sign-form sign-up-form two `}
            >
              <h2 className="form-title">Continue</h2>
              <div className="input-field">
                <Icon name="lock" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={onChange}
                />
              </div>
              <div className="input-field">
                <Icon name="lock" />
                <input
                  type="Password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={onChange}
                  value={values.confirmPassword}
                />
              </div>
              <h6>by signing up you have agreed to our terms and conditions</h6>
              <Button className="sign-up-button" type="submit" type="submit">
                FINISH
              </Button>
            </Form>
          </div>
        )}
      </div>
      <div className="panel-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>
              Let's get you started with a new account to join the community
            </p>
            <Link to="/register">
              <Button className="transparent" onClick={() => setActive(true)}>
                SIGN UP
              </Button>
            </Link>
          </div>
          <img src={rocket} className="image" alt="rocket" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of Us?</h3>
            <p>Continue from where you left off</p>
            <Link to="/login">
              <Button className="transparent" onClick={() => setActive(false)}>
                SIGN IN
              </Button>
            </Link>
          </div>
          <img src={play} className="image" alt="rocket" />
        </div>
      </div>
    </div>
  );
}

export default Login;
