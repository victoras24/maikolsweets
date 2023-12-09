import { signOut } from "firebase/auth";
import { auth } from "../../data/firebase";
import { useLogin } from "./LoginProvider";


export default function AccountSignOut() {
    const { logout } = useLogin()
    const signOutButton = async () => {
        try {
            await signOut(auth)
            logout()
            console.log("User signed out", auth.currentUser)
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <button onClick={signOutButton}>
            Sign Out
        </button>
    )
}
