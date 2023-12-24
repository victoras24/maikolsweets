import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from "../data/firebase";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore"
import { firestore } from '../data/firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../components/AuthProvider';

const useSignUpWithEmailAndPassword = () => {
    const [createUserWithEmailAndPassword, , loading, error] = useCreateUserWithEmailAndPassword(auth)
    const navigate = useNavigate()
    const { login, logout } = useAuth()

    const signup = async (inputs) => {
        const usersRef = collection(firestore, "users")
        const q = query(usersRef, where("username", "==", inputs.username))
        const querySnapshot = await getDocs(q)

        if (!querySnapshot.empty) {
            toast.error("Username already exists.")
            return
        }

        try {
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password)
            if (!newUser && error) {
                toast.error(firebaseError(error.message.replace("Firebase:", "")))
                return
            }
            if (newUser) {
                const userDoc = {
                    uid: newUser.user.uid,
                    email: inputs.email,
                    username: inputs.username,
                    fullName: inputs.fullName,
                    profilePicURL: "",
                    orderHistory: [],
                    savedProducts: [],
                    createdAt: Date.now(),
                }
                await setDoc(doc(firestore, "users", newUser.user.uid), userDoc)
                localStorage.setItem("user-info", JSON.stringify(userDoc))
                login(userDoc)
                navigate("/")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return { loading, error, signup }
}

export default useSignUpWithEmailAndPassword;
