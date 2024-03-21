import { useNavigate } from "react-router-dom";
import "./Table.css"
import { CircularProgress } from "@mui/material";

const ListingTable = ({ data, user, loading }) => {
    const navigate = useNavigate()

    function getTimeStamp(timestamp) {
        const date = new Date(timestamp);
        const currentIST = date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
        console.log(currentIST)
        return `${currentIST.split(" ")[1]} ${currentIST.split(" ")[2]}, ${currentIST.split(" ")[0].slice(0, -1)}`
    }

    const handleClick = (item) => {
        if (!user) return
        navigate()
    }

    return (
        <table className="listing-page-table">
            <thead>
                <tr>
                    <th>{!user ? "Name" : "Id"}</th>
                    <th>Language</th>
                    <th>Stdin</th>
                    <th>Source Code</th>
                    <th>Stdout</th>
                    <th className="last-cell">Timestamp</th>
                </tr>
            </thead>
            {loading ?
                <div style={{ width: "100%", textAlign: "center", marginTop:"10px" }}>
                    <CircularProgress />
                </div>
                :
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <td onClick={() => handleClick(item)} className={user && "link"}>{!user ? item.name.split(" ")[0] : item.id}</td>
                                <td>{item.language}</td>
                                <td>{item.stdin}</td>
                                <td>{item.code.slice(0, 100)}</td>
                                <td>{item.stdout ? item.stdout : "NULL"}</td>
                                <td className="last-cell">{getTimeStamp(item.timestamp)}</td>
                            </tr>
                        )
                    })}
                </tbody>}
        </table>
    )
}

export default ListingTable