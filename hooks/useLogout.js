import { auth } from "../data/firebase"
import { useSignOut } from "react-firebase-hooks/auth"
import { useState } from "react"
import { toast } from "sonner"

const useLogout = () => {

    const [logoutError, setLogoutError] = useState(null)
    const [signOut, isLoggingOut, error] = useSignOut(auth)
    const handleLogout = async () => {
        try {
            await signOut()
            localStorage.removeItem('user-info')
            toast.success("User logged out")
        } catch (error) {
            setLogoutError(error.message)
        }
    }

    return { handleLogout, isLoggingOut, error, logoutError }
}

export default useLogout