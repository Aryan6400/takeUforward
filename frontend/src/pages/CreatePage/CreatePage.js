import { Backdrop, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import "./CreatePage.css"
import { Link, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { useAuth } from "../../context/AuthContext";

function CreatePage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [data, setData] = useState({
    email: "",
    language: "",
    stdin: "",
    code: ""
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async () => {
    if (data.email == "" || data.language == "" || data.code == "" || data.stdin == "") return
    setLoading(true)
    const token = localStorage.getItem("coderToken")
    try {
      await fetch('https://takeuforward-tdne.onrender.com/history', {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      })
      navigate("/")
      enqueueSnackbar("Successfully created!", { variant: "success" })
    } catch (error) {
      enqueueSnackbar("Unable to create! Please try after some time!", { variant: "error" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: 5 }}
        open={loading}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
      {login ?
        <div className="create-page">
          <div className="create-form-container">
            <label>Email:</label>
            <input type="text" placeholder="Email" name="email" value={data.email} onChange={(e) => handleChange(e)} />
            <label>Language:</label>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select a language</InputLabel>
              <Select
                value={data.language}
                onChange={(e) => handleChange(e)}
                name='language'
              >
                <MenuItem value="C++">C++</MenuItem>
                <MenuItem value="Java">Java</MenuItem>
                <MenuItem value="Python">Python</MenuItem>
                <MenuItem value="Javascript">Javascript</MenuItem>
              </Select>
            </FormControl>
            <label>Standard Input:</label>
            <textarea rows={5} type="text" placeholder="stdin" name="stdin" value={data.stdin} onChange={(e) => handleChange(e)} />
            <label>Source Code:</label>
            <textarea rows={5} type="text" placeholder="Code" name="code" value={data.code} onChange={(e) => handleChange(e)} />
            <Button onClick={handleSubmit} className="create-btn">Submit</Button>
          </div>
        </div>
        :
        <div className="blank-create-page">
          <Link to='/login'>Login to create submissions</Link>
        </div>
      }
    </>
  );
}

export default CreatePage;
