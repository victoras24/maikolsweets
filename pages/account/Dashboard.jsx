import { useAuth } from "../../components/AuthProvider";
import useLogout from "../../hooks/useLogout";

export default function Dashboard() {

    const { user } = useAuth();
    const { handleLogout } = useLogout();

    return (
        <div>
            <h1>Hello, {user?.fullName || "Guest"}</h1>
            <button onClick={() => handleLogout()}>
                logout
            </button>
        </div>
    );
}
