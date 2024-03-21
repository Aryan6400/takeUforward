import { useState } from "react";
import "./Login.css"
import { Button, Paper } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


function Login() {
  const [register, setRegister] = useState(false)
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const { setLogin } = useAuth()

  const handleChange = (e) => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleLogin = async () => {
    try {
      const response = await fetch("https://takeuforward-tdne.onrender.com/login", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      })
      const result = await response.json()
      localStorage.setItem("coderToken", result.token)
      localStorage.setItem("coderDetail", JSON.stringify(result.user))
      setLogin(true)
      navigate('/')
    } catch (error) {
      console.error(error);
    }
  }

  const handleRegister = async() => {
    try {
      const response = await fetch("https://takeuforward-tdne.onrender.com/register", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      })
      const result = await response.json()
      localStorage.setItem("coderToken", result.token)
      localStorage.setItem("coderDetail", JSON.stringify(result.user))
      setLogin(true)
      navigate('/')
    } catch (error) {
      console.error(error);
    }
  }

  if (register) {
    return (
      <div className="login">
        <Paper elevation={4} className="register-card">
          <label>Name:</label>
          <input type="text" placeholder="Name" name="name" value={data.name} onChange={(e) => handleChange(e)} />
          <label>Email:</label>
          <input type="text" placeholder="Email" name="email" value={data.email} onChange={(e) => handleChange(e)} />
          <label>Password:</label>
          <div style={{ border: "1px solid rgb(133, 133, 133)", display: "flex", alignItems: "center", paddingRight: "5px" }}>
            <input className="password" type={show ? "text" : "password"} placeholder="Password" name="password" value={data.password} onChange={(e) => handleChange(e)} />
            {show ? <VisibilityOffIcon onClick={() => setShow(false)} /> : <VisibilityIcon onClick={() => setShow(true)} />}
          </div>
          <Button onClick={handleRegister} className="register-btn">Register</Button>
          <p className="navigate-text">Already have an account? <span className="navigate-link" onClick={() => setRegister(false)}>Login here</span></p>
        </Paper>
      </div>
    )
  }
  else {
    return (
      <div className="login">
        <Paper elevation={4} className="login-card">
          <label>Email:</label>
          <input type="text" placeholder="Email" name="email" value={data.email} onChange={(e) => handleChange(e)} />
          <label>Password:</label>
          <div style={{ border: "1px solid rgb(133, 133, 133)", display: "flex", alignItems: "center", paddingRight: "5px" }}>
            <input className="password" type={show ? "text" : "password"} placeholder="Password" name="password" value={data.password} onChange={(e) => handleChange(e)} />
            {show ? <VisibilityOffIcon onClick={() => setShow(false)} /> : <VisibilityIcon onClick={() => setShow(true)} />}
          </div>
          <Button onClick={handleLogin} className="login-btn">Login</Button>
          <p className="navigate-text">Don't have an account? <span className="navigate-link" onClick={() => setRegister(true)}>Register here</span></p>
        </Paper>
      </div>
    )
  }
}

export default Login;
