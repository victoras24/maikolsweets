import { signOut } from "firebase/auth";
import { auth } from "../../data/firebase";


export default function AccountSignOut() {
    const signOutButton = async () => {
        try {
            await signOut(auth)
            console.log("User signed out")
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
