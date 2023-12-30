import { useAuth } from "../../components/AuthProvider";
import useLogout from "../../hooks/useLogout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom";

export default function Dashboard() {

    const { user } = useAuth();
    const { handleLogout } = useLogout();

    return (
        <div className="account-profile-container">
            <Link
                to="/"
                relative="path"
                className="back-button"
            >
                <FontAwesomeIcon className="back-button-icon" icon={faAngleLeft} />
                <p>Home</p>
            </Link>
            <h3>Account details</h3>
            <ul className="account-profile-list">
                <li>Name: {user?.fullName || "Guest"}</li>
                <li>Email: {user?.email || "Email"} </li>
                <li>Address:</li>
                <li>Country:</li>
                <li>Zip:</li>
                <li>Phone:</li>
            </ul>
            <div>
                <h3>Order History</h3>
                {user?.orderHistory.length === 0 ? (
                    <div>
                        <p>You haven't placed any orders yet.</p>
                    </div>
                ) : (
                    //change
                    user?.orderHistory.map((order, index) => (
                        <li
                            key={index}
                        >
                            <div>
                                <img src={order.image} />
                                <div>
                                    <p>{order.name}</p>
                                    <p>€{order.price}</p>
                                </div>
                            </div>
                        </li>
                    ))
                )}
            </div>
            <button className="logout-button" onClick={() => handleLogout()}>
                Logout
            </button>
        </div>
    )
}
