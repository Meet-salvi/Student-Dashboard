import { useState } from "react";
import "../css/Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/login', {email, password});
      if(res.status === 200){
        navigate('/dashboard');
        return;
      }
      return window.alert(res.response.data?.message)
    } catch (err) {
      console.log("While Login Error", err);
      if ( err.response ) {
        return window.alert(err.response.data?.message)
      }
      return window.alert('Server Error');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
          <p className="footer-text">
            Create An account? <NavLink to="/">Sign up</NavLink>
          </p>
        </form>
        <p className="footer-text">
          © {new Date().getFullYear()} Attendance System
        </p>
      </div>
    </div>
  );
}
