import { useEffect, useState } from "react";
import "./ListingPage.css"
import ListingTable from "../../component/Table/Table";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";


function ListingPage() {
  const { login, setLogin } = useAuth()
  const [history, setHistory] = useState([])
  const [userHistory, setUserHistory] = useState([])
  const [user, setUser] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchAllHistory = async () => {
    setLoading(true)
    try {
      const response = await fetch("https://takeuforward-tdne.onrender.com/all-history")
      const result = await response.json()
      setHistory(result)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchUserHistory = async () => {
    setLoading(true)
    const user = JSON.parse(localStorage.getItem("coderDetail"))
    const token = localStorage.getItem("coderToken")
    try {
      const response = await fetch(`https://takeuforward-tdne.onrender.com/user-history/${user.email}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "authorization": `Bearer ${token}`
        }
      })
      const result = await response.json()
      setUserHistory(result)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const auth = localStorage.getItem("coderDetail")
    if (!auth) setLogin(false)
    if (user) {
      fetchUserHistory()
    }
    else {
      fetchAllHistory()
    }
  }, [user])

  return (
    <div className="listing-page">
      <div className="tabs-group-container">
        <div className="tabs-group">
          <span className={`toggle-tabs ${user ? "toggle-tabs-selected" : ""}`} onClick={() => setUser(true)}>Show your history</span>
          <span className={`toggle-tabs ${user ? "" : "toggle-tabs-selected"}`} onClick={() => setUser(false)}>Show all history</span>
        </div>
      </div>
      {!user && history.length>0 && <ListingTable data={history} user={user} loading={loading} />}
      {login && user && userHistory.length>0 && <ListingTable data={userHistory} user={user} loading={loading} />}
      {!login && user &&
        <div className="login-message">
          <Link to='/login'>Login to see your history</Link>
        </div>
      }
    </div>
  );
}

export default ListingPage;
