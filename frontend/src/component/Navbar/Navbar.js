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
        navigate('/')
    }

    return (
        <nav>
            <span className="navbar-links logo" onClick={()=>navigate('/')}>takeUforward</span>
            <ul>
                {login && <li className="navbar-links" onClick={() => navigate('/create')}>Create</li>}
                {!login && <li className="navbar-links" onClick={() => navigate('/login')}>Login</li>}
                {login && <li className="navbar-links" onClick={logout}>Logout</li>}
            </ul>
        </nav>
    );
}

export default Navbar;
