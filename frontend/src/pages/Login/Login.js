import { useState } from "react";
import "./Login.css"
import { Backdrop, Button, CircularProgress, Paper } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";


function Login() {
  const { setLogin } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [register, setRegister] = useState(false)
  const [show, setShow] = useState(false)
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleLogin = async () => {
    setLoading(true)
    try {
      const response = await fetch("https://takeuforward-tdne.onrender.com/login", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      })
      const result = await response.json()
      if (response.status != 201) {
        enqueueSnackbar(result.message, { variant: "error" })
      }
      else {
        localStorage.setItem("coderToken", result.token)
        localStorage.setItem("coderDetail", JSON.stringify(result.user))
        setLogin(true)
        navigate('/')
        enqueueSnackbar("Logged in successfully!", { variant: "success" })
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" })
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async () => {
    setLoading(true)
    try {
      const response = await fetch("https://takeuforward-tdne.onrender.com/register", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      })
      const result = await response.json()
      if (response.status != 201) {
        enqueueSnackbar(result.message, { variant: "error" })
      }
      else {
        localStorage.setItem("coderToken", result.token)
        localStorage.setItem("coderDetail", JSON.stringify(result.user))
        setLogin(true)
        navigate('/')
        enqueueSnackbar("Registered successfully!", { variant: "success" })
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" })
    } finally {
      setLoading(false)
    }
  }

  if (register) {
    return (
      <>
        <Backdrop
          sx={{ color: "#fff", zIndex: 5 }}
          open={loading}
        >
          <CircularProgress color="secondary" />
        </Backdrop>
        <div className="login">
          <Paper elevation={4} className="register-card">
            <label>Name:</label>
            <input type="text" placeholder="Name" name="name" value={data.name} onChange={handleChange} />
            <label>Email:</label>
            <input type="text" placeholder="Email" name="email" value={data.email} onChange={handleChange} />
            <label>Password:</label>
            <div className="password-box">
              <input className="password" type={show ? "text" : "password"} placeholder="Password" name="password" value={data.password} onChange={handleChange} />
              {show ? <VisibilityOffIcon onClick={() => setShow(false)} /> : <VisibilityIcon onClick={() => setShow(true)} />}
            </div>
            <Button onClick={handleRegister} className="register-btn">Register</Button>
            <p className="navigate-text">Already have an account? <span className="navigate-link" onClick={() => setRegister(false)}>Login here</span></p>
          </Paper>
        </div>
      </>
    )
  }
  else {
    return (
      <>
        <Backdrop
          sx={{ color: "#fff", zIndex: 5 }}
          open={loading}
        >
          <CircularProgress color="secondary" />
        </Backdrop>
        <div className="login">
          <Paper elevation={4} className="login-card">
            <label>Email:</label>
            <input type="text" placeholder="Email" name="email" value={data.email} onChange={handleChange} />
            <label>Password:</label>
            <div className="password-box">
              <input className="password" type={show ? "text" : "password"} placeholder="Password" name="password" value={data.password} onChange={handleChange} />
              {show ? <VisibilityOffIcon onClick={() => setShow(false)} /> : <VisibilityIcon onClick={() => setShow(true)} />}
            </div>
            <Button onClick={handleLogin} className="login-btn">Login</Button>
            <p className="navigate-text">Don't have an account? <span className="navigate-link" onClick={() => setRegister(true)}>Register here</span></p>
          </Paper>
        </div>
      </>
    )
  }
}

export default Login;
