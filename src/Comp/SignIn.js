import { useRef, useState, useEffect } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import "./Login.css";
const SignIn = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, user, pwd);
      console.log(userCredential.user);
      setSuccess(true);
      setUser("");
      setPwd("");
    } catch (err) {
      if (err.code === "auth/wrong-password") {
        setErrMsg("Incorrect password");
      } else if (err.code === "auth/user-not-found") {
        setErrMsg("No user found with this email");
      } else {
        setErrMsg("Sign In Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Welcome Back!</h1>
          <p>
            <Link to="/">Go to Dashboard</Link>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive">
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              Username:
              <FaCheck className={user ? "valid" : "hide"} />
              <FaTimes className={user ? "hide" : "invalid"} />
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              aria-invalid={user ? "false" : "true"}
              aria-describedby="uidnote"
            />

            <label htmlFor="password">
              Password:
              <FaCheck className={pwd ? "valid" : "hide"} />
              <FaTimes className={pwd ? "hide" : "invalid"} />
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={pwd ? "false" : "true"}
              aria-describedby="pwdnote"
            />

            <button disabled={!user || !pwd ? true : false}>Sign In</button>
          </form>
          <p>
            Need an account?
            <br />
            <span className="line">
              <Link to="/signup" href="#">
                Sign Up
              </Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default SignIn;
