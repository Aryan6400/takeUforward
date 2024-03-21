import { useEffect, useState } from "react";
import "./ListingPage.css"
import ListingTable from "../../component/Table/Table";
import { useAuth } from "../../context/AuthContext";


function ListingPage() {
  const [history, setHistory] = useState([])
  const [userHistory, setUserHistory] = useState([])
  const [user, setUser] = useState(false)
  const { login, setLogin } = useAuth()

  const fetchAllHistory = async () => {
    try {
      const response = await fetch("https://takeuforward-tdne.onrender.com/all-history")
      const result = await response.json()
      setHistory(result)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchUserHistory = async () => {
    const user = JSON.parse(localStorage.getItem("coderDetail"))
    try {
      const response = await fetch(`https://takeuforward-tdne.onrender.com/user-history/${user.email}`)
      const result = await response.json()
      setUserHistory(result)
    } catch (error) {
      console.error(error)
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
      {!user && <ListingTable data={history} user={user} />}
      {login && user && <ListingTable data={userHistory} user={user} />}
    </div>
  );
}

export default ListingPage;
