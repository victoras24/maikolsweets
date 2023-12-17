import { auth } from "../data/firebase"
import { useSignOut } from "react-firebase-hooks/auth"
import { useState } from "react"

const useLogout = () => {

    const [logoutError, setLogoutError] = useState(null)
    const [signOut, isLoggingOut, error] = useSignOut(auth)
    const handleLogout = async () => {
        try {
            await signOut()
            localStorage.removeItem('user-info')
            console.log("Logged out")
        } catch (error) {
            setLogoutError(error.message)
        }
    }

    return { handleLogout, isLoggingOut, error, logoutError }
}

export default useLogout