import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css"

function Navbar() {
    const navigate = useNavigate()
    const {login, setLogin} = useAuth()

    const logout = () => {
        localStorage.removeItem("coderToken")
        localStorage.removeItem("coderDetails")
        setLogin(false)
        navigate('/login')
    }

    return (
        <nav style={{ height: "40px", width: "calc(100% - 250px)", background: "#D9D9D9", padding: "10px 125px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "fixed" }}>
            <span className="navbar-links" onClick={()=>navigate('/')}>takeUforward</span>
            <ul style={{ display: "flex", gap: "15px", listStyle: "none" }}>
                {login && <li className="navbar-links" onClick={() => navigate('/create')}>Create</li>}
                {!login && <li className="navbar-links" onClick={() => navigate('/login')}>Login</li>}
                {login && <li className="navbar-links" onClick={logout}>Logout</li>}
            </ul>
        </nav>
    );
}

export default Navbar;
