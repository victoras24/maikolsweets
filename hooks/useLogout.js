import { auth } from "../data/firebase"
import { useSignOut } from "react-firebase-hooks/auth"
import { toast } from "sonner"

const useLogout = () => {

    const [signOut, isLoggingOut, error] = useSignOut(auth)
    const handleLogout = async () => {
        try {
            await signOut()
            localStorage.removeItem("user-info")
            toast.success("User logged out")
        } catch (error) {
            console.log(error.message)
        }
    }

    return { handleLogout, isLoggingOut, error }
}

export default useLogout