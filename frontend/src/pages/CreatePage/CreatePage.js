import { Backdrop, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import "./CreatePage.css"
import { useNavigate } from "react-router-dom";

function CreatePage() {
  const navigate = useNavigate()
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
    try {
      await fetch('http://localhost:5000/history', {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      })
      navigate("/")
    } catch (error) {
      console.error(error)
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
      <div className="create-page">
        <div className="create-form-container">
          <label>Email:</label>
          <input type="text" placeholder="Email" name="email" value={data.email} onChange={(e) => handleChange(e)} />
          <label>Preferred Code Language:</label>
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
    </>
  );
}

export default CreatePage;
