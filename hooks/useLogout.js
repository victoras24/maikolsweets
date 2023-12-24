import { auth } from "../data/firebase"
import { useSignOut } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useAuth } from "../components/AuthProvider"

const useLogout = () => {
    const { userLogout } = useAuth()
    const navigate = useNavigate()
    const [signOut, isLoggingOut, error] = useSignOut(auth)
    const handleLogout = async () => {
        try {
            await signOut()
            localStorage.removeItem("user-info")
            userLogout()
            navigate("/")
            toast.success("User logged out")
        } catch (error) {
            console.log(error.message)
        }
    }

    return { handleLogout, isLoggingOut, error }
}

export default useLogout