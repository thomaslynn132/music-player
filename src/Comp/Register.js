import { useRef, useState, useEffect } from "react";
import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import "./Login.css";
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(pwd);

    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        pwd
      );
      console.log(userCredential.user);
      setSuccess(true);
      setEmail("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      console.error(err); // Log the full error
      if (err.code === "auth/email-already-in-use") {
        setErrMsg("Email already in use");
      } else if (err.code === "auth/invalid-email") {
        setErrMsg("Invalid email");
      } else if (err.code === "auth/weak-password") {
        setErrMsg("Weak password");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <h2>Welcome</h2>
          <p>
            <Link to="/">The Dashboard</Link>
          </p>
        </section>
      ) : (
        <div className="container">
          <section>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive">
              {errMsg}
            </p>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">
                Email:
                <FaCheck className={validEmail ? "valid" : "hide"} />
                <FaTimes
                  className={validEmail || !email ? "hide" : "invalid"}
                />
              </label>
              <input
                type="email"
                id="email"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="emailnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <p
                id="emailnote"
                className={
                  emailFocus && email && !validEmail
                    ? "instructions"
                    : "offscreen"
                }>
                <FaInfoCircle />
                Must be a valid email address.
              </p>

              <label htmlFor="password">
                Password:
                <FaCheck className={validPwd ? "valid" : "hide"} />
                <FaTimes className={validPwd || !pwd ? "hide" : "invalid"} />
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <p
                id="pwdnote"
                className={
                  pwdFocus && !validPwd ? "instructions" : "offscreen"
                }>
                <FaInfoCircle />
                8 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number, and a
                special character.
                <br />
                Allowed special characters: ! @ # $ %
              </p>

              <label htmlFor="confirm_pwd">
                Confirm Password:
                <FaCheck
                  className={validMatch && matchPwd ? "valid" : "hide"}
                />
                <FaTimes
                  className={validMatch || !matchPwd ? "hide" : "invalid"}
                />
              </label>
              <input
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch ? "instructions" : "offscreen"
                }>
                <FaInfoCircle />
                Must match the first password input field.
              </p>

              <button
                disabled={
                  !validEmail || !validPwd || !validMatch ? true : false
                }>
                Sign Up
              </button>
            </form>
            <p>
              Already registered?
              <br />
              <span className="line">
                <Link to="/login">Sign In</Link>
              </span>
            </p>
          </section>
        </div>
      )}
    </>
  );
};

export default Register;
